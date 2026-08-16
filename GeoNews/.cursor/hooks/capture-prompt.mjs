import {
  extractPrompt,
  loadState,
  readStdin,
  redact,
  saveState,
  stamp,
  writeLastInput,
  writePromptFile,
} from "./lib/state.mjs";

const input = readStdin();
writeLastInput(input);

const prompt = redact(extractPrompt(input));
const state = loadState();
const id = stamp();
const sessionId = state.session_id || input.session_id || process.env.GEONEWS_SESSION_ID || null;
const extra = prompt
  ? ""
  : `\n## Hook payload keys\n\n\`${Object.keys(input).join(", ") || "(none)"}\`\n`;

const promptPath = writePromptFile({ id, sessionId, prompt, extra });

saveState({
  ...state,
  session_id: sessionId,
  prompt,
  prompt_at: new Date().toISOString(),
  prompt_id: id,
  prompt_path: promptPath,
});

console.log(JSON.stringify({ continue: true }));
