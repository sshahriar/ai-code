import { BoardState } from '../types/kanban';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  actionTaken?: string;
}

export interface BoardAction {
  type: 'CREATE_CARD' | 'DELETE_CARD' | 'MOVE_CARD' | 'RENAME_COLUMN';
  payload: Record<string, any>;
}

const OPENROUTER_API_KEY =
  process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || '';

export async function processChatMessage(
  userText: string,
  boardState: BoardState
): Promise<{ text: string; action?: BoardAction }> {
  // Build detailed board state representation for the model
  const columnsSummary = boardState.columnOrder
    .map((colId) => {
      const col = boardState.columns[colId];
      const cardDetails = col.cardIds
        .map((id) => {
          const card = boardState.cards[id];
          return card ? `[Card ID: "${card.id}"] Title: "${card.title}"` : null;
        })
        .filter(Boolean)
        .join(', ');
      return `Column "${col.title}" (ID: "${col.id}"): ${cardDetails || 'No cards'}`;
    })
    .join('\n');

  const systemPrompt = `You are an AI Kanban Project Assistant capable of directly modifying the board.

Current Board State:
${columnsSummary}

AVAILABLE ACTIONS:
1. CREATE_CARD: {"title": string, "details": string, "column": string}
   - "title": exact title of the card to create.
   - "column": target Column Title (e.g., "Backlog", "To Do", "In Progress", "In Review", "Done") or Column ID.
2. DELETE_CARD: {"cardId": string}
   - Provide exact Card ID (e.g. "card-1") OR exact Card Title.
3. MOVE_CARD: {"cardId": string, "targetColumn": string}
   - "cardId": exact Card ID (e.g. "card-1") OR Card Title (e.g. "Database Schema Audit").
   - "targetColumn": target Column Title (e.g., "Done", "In Review", "To Do", "In Progress", "Backlog") or Column ID.
4. RENAME_COLUMN: {"columnId": string, "newTitle": string}

CRITICAL RULES:
- If the user asks to move a card (e.g. "move Database Schema Audit to Done" or "move card-1 to In Progress"), identify the card by title or ID and target column, then return action "MOVE_CARD".
- If the user asks to add/create a card (e.g. "Add a card to Backlog titled Design Landing Page"), identify title and target column, then return action "CREATE_CARD".
- Return your decision in JSON inside a \`\`\`json codeblock.
JSON Schema:
{
  "reply": "Clear message explaining the action taken (NO emojis)",
  "action": null OR {
    "type": "CREATE_CARD" | "DELETE_CARD" | "MOVE_CARD" | "RENAME_COLUMN",
    "payload": { ... }
  }
}
- Do NOT use emojis anywhere in the response text or reply.`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Kanban Project Manager',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userText },
        ],
        temperature: 0.1,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';

      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/(\{[\s\S]*\})/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[1]);
          if (parsed.action) {
            return {
              text: parsed.reply || 'Action executed on board.',
              action: parsed.action,
            };
          }
        } catch {
          // Fallback to local parser
        }
      }
    }
  } catch (err) {
    console.error('OpenRouter API call error:', err);
  }

  return fallbackIntentParser(userText, boardState);
}

function fallbackIntentParser(userText: string, boardState: BoardState): { text: string; action?: BoardAction } {
  const textLower = userText.toLowerCase().trim();

  // Helper: Find best matching card by ID or title
  const findCard = (query: string): { id: string; title: string } | null => {
    const q = query.toLowerCase().trim();

    // 1. Check exact title or exact ID
    for (const cardId of Object.keys(boardState.cards)) {
      const card = boardState.cards[cardId];
      if (cardId.toLowerCase() === q || card.title.toLowerCase() === q) {
        return { id: cardId, title: card.title };
      }
    }

    // 2. Check if user query contains card title or card ID
    let bestMatch: { id: string; title: string; length: number } | null = null;
    for (const cardId of Object.keys(boardState.cards)) {
      const card = boardState.cards[cardId];
      const titleLower = card.title.toLowerCase();
      const idLower = cardId.toLowerCase();

      if (q.includes(idLower) || q.includes(titleLower) || titleLower.includes(q)) {
        if (!bestMatch || titleLower.length > bestMatch.length) {
          bestMatch = { id: cardId, title: card.title, length: titleLower.length };
        }
      }
    }

    return bestMatch ? { id: bestMatch.id, title: bestMatch.title } : null;
  };

  // Helper: Find column by ID or title
  const findColumn = (query: string): { id: string; title: string } | null => {
    const q = query.toLowerCase().trim();

    // 1. Exact match
    for (const colId of boardState.columnOrder) {
      const col = boardState.columns[colId];
      if (colId.toLowerCase() === q || col.title.toLowerCase() === q) {
        return { id: colId, title: col.title };
      }
    }

    // 2. Substring match
    for (const colId of boardState.columnOrder) {
      const col = boardState.columns[colId];
      const titleLower = col.title.toLowerCase();
      if (q.includes(colId.toLowerCase()) || q.includes(titleLower) || titleLower.includes(q)) {
        return { id: colId, title: col.title };
      }
    }
    return null;
  };

  // 1. Delete Card
  if (textLower.includes('delete') || textLower.includes('remove') || textLower.includes('trash')) {
    const cardMatch = findCard(userText);
    if (cardMatch) {
      return {
        text: `Deleted card "${cardMatch.title}" (${cardMatch.id}).`,
        action: {
          type: 'DELETE_CARD',
          payload: { cardId: cardMatch.id, cardName: cardMatch.title },
        },
      };
    }
  }

  // 2. Move Card
  if (textLower.includes('move') || textLower.includes('shift') || textLower.includes('transfer') || textLower.includes('drag')) {
    const cardMatch = findCard(userText);
    const colMatch = findColumn(userText);

    if (cardMatch && colMatch) {
      return {
        text: `Moved card "${cardMatch.title}" (${cardMatch.id}) to column "${colMatch.title}".`,
        action: {
          type: 'MOVE_CARD',
          payload: { cardId: cardMatch.id, cardName: cardMatch.title, targetColumnId: colMatch.id, targetColumn: colMatch.title },
        },
      };
    }
  }

  // 3. Create Card
  if (textLower.includes('add') || textLower.includes('create') || textLower.includes('new card')) {
    const colMatch = findColumn(userText);
    const targetColId = colMatch ? colMatch.id : 'col-1';
    const targetColTitle = colMatch ? colMatch.title : 'Backlog';

    // Extract title intelligently
    let title = '';
    const quoteMatch = userText.match(/['"]([^'"]+)['"]/);
    if (quoteMatch) {
      title = quoteMatch[1].trim();
    } else {
      let rawText = userText;
      if (colMatch) {
        // remove column title from user text
        const colRegex = new RegExp(colMatch.title, 'gi');
        rawText = rawText.replace(colRegex, '');
      }
      title = rawText
        .replace(/\b(add|create|new|card|in|to|column|titled|title|with|details|please)\b/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    if (!title) title = 'New Task Item';

    return {
      text: `Created new card "${title}" in column "${targetColTitle}".`,
      action: {
        type: 'CREATE_CARD',
        payload: { title, details: 'Created via AI Assistant', columnId: targetColId, targetColumn: targetColTitle },
      },
    };
  }

  // 4. Rename Column
  if (textLower.includes('rename')) {
    const colMatch = findColumn(userText);
    if (colMatch) {
      const parts = userText.split(/\bto\b/i);
      const newTitle = parts.length > 1 ? parts[1].trim().replace(/^['"]|['"]$/g, '') : `${colMatch.title} Updated`;
      return {
        text: `Renamed column "${colMatch.title}" to "${newTitle}".`,
        action: {
          type: 'RENAME_COLUMN',
          payload: { columnId: colMatch.id, newTitle },
        },
      };
    }
  }

  return {
    text: 'I am your AI Kanban Assistant. You can tell me commands like "Delete card-1", "Move Database Schema Audit to Done", "Add card Design Landing Page in To Do", or "Rename Backlog to New Ideas".',
  };
}
