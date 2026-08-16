import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HOOKS_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
export const PROJECT_ROOT = dirname(dirname(HOOKS_DIR));
export const STATE_PATH = join(HOOKS_DIR, "state", "session.json");
export const PROMPTS_DIR = join(PROJECT_ROOT, "prompts");
export const REVIEWS_DIR = join(PROJECT_ROOT, "reviews");

const SKIP_RE = /[\\/](prompts|reviews|\.cursor[\\/]hooks[\\/]state)[\\/]/i;

function parseJson(text) {
  if (!text || !String(text).trim()) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export function readStdin() {
  const argv = process.argv.slice(2).join(" ").trim();
  const fromArgv = parseJson(argv);
  if (fromArgv) return fromArgv;

  try {
    const fromFd = parseJson(readFileSync(0, "utf8"));
    if (fromFd) return fromFd;
  } catch {
    /* Windows hook runners sometimes leave fd 0 empty */
  }

  return {};
}

export function extractPrompt(input) {
  const candidates = [
    input.prompt,
    input.text,
    input.content,
    input.message,
    input.user_prompt,
    input.prompt_text,
    input.input?.prompt,
    input.params?.prompt,
    input.payload?.prompt,
  ];

  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) return value;
    if (value && typeof value === "object") {
      if (typeof value.text === "string" && value.text.trim()) return value.text;
      if (typeof value.content === "string" && value.content.trim()) return value.content;
    }
  }

  if (Array.isArray(input.messages)) {
    const user = [...input.messages].reverse().find((m) => m?.role === "user");
    const content = user?.content;
    if (typeof content === "string" && content.trim()) return content;
  }

  return "";
}

export function writeLastInput(input) {
  mkdirSync(dirname(STATE_PATH), { recursive: true });
  writeFileSync(
    join(dirname(STATE_PATH), "last-input.json"),
    JSON.stringify({ at: new Date().toISOString(), keys: Object.keys(input || {}), input }, null, 2),
  );
}

export function writePromptFile({ id, sessionId, prompt, extra = "" }) {
  mkdirSync(PROMPTS_DIR, { recursive: true });
  const promptPath = join(PROMPTS_DIR, `${id}.md`);
  writeFileSync(
    promptPath,
    `# Prompt ${id}

- session: \`${sessionId || "unknown"}\`
- captured: ${new Date().toISOString()}

## User prompt

${prompt || "(empty — see .cursor/hooks/state/last-input.json for the raw hook payload)"}
${extra}
`,
  );
  return promptPath;
}

export function loadState() {
  try {
    return JSON.parse(readFileSync(STATE_PATH, "utf8"));
  } catch {
    return { session_id: null, prompt: "", prompt_at: null, files: [] };
  }
}

export function saveState(state) {
  mkdirSync(dirname(STATE_PATH), { recursive: true });
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

export function shouldTrackFile(filePath) {
  const normalized = String(filePath || "").replace(/\\/g, "/");
  if (!normalized) return false;
  return !SKIP_RE.test(normalized);
}

export function stamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

export function redact(text) {
  return String(text || "")
    .replace(/\bsk-or-v1-[A-Za-z0-9_-]{10,}\b/g, "[REDACTED_OPENROUTER]")
    .replace(/\bsk-[A-Za-z0-9]{20,}\b/g, "[REDACTED_KEY]")
    .replace(/\bgh[pousr]_[A-Za-z0-9_]{20,}\b/g, "[REDACTED_GITHUB]")
    .replace(/\bAKIA[0-9A-Z]{16}\b/g, "[REDACTED_AWS]")
    .replace(/\b(OPENROUTER_API_KEY|GUARDIAN_API_KEY)\s*[=:]\s*['"]?[^\s'"]+/gi, "$1=[REDACTED]");
}
