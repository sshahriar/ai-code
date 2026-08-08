import { NextResponse } from "next/server";
import { buildAssistantSystemPrompt } from "@/lib/chat-prompt";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat is not configured. Missing OPENROUTER_API_KEY." },
      { status: 500 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const sanitized = incoming
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, MAX_CONTENT_LENGTH),
    }));

  if (sanitized.length === 0 || sanitized[sanitized.length - 1].role !== "user") {
    return NextResponse.json(
      { error: "Please send at least one user message." },
      { status: 400 }
    );
  }

  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteUrl,
        "X-Title": "Shahriar Newaz Portfolio Chat",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: buildAssistantSystemPrompt() },
          ...sanitized,
        ],
        temperature: 0.6,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message =
        data?.error?.message ||
        data?.error ||
        "OpenRouter request failed.";
      return NextResponse.json(
        { error: typeof message === "string" ? message : "OpenRouter request failed." },
        { status: response.status }
      );
    }

    const content =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I could not generate a reply. Please try again.";

    return NextResponse.json({
      message: { role: "assistant", content },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the chat service. Please try again." },
      { status: 502 }
    );
  }
}
