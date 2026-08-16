import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  PROJECT_ROOT,
  PROMPTS_DIR,
  REVIEWS_DIR,
  loadState,
  readStdin,
  saveState,
  stamp,
} from "./lib/state.mjs";

function git(args) {
  try {
    return execSync(`git ${args}`, {
      cwd: PROJECT_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      windowsHide: true,
    }).trim();
  } catch {
    return "";
  }
}

function geonewsRel() {
  const root = git("rev-parse --show-toplevel").replace(/\\/g, "/");
  if (!root) return ".";
  const rel = PROJECT_ROOT.replace(/\\/g, "/").slice(root.length).replace(/^\//, "");
  return rel || ".";
}

function heuristicNotes(diff) {
  const notes = [];
  if (!diff) {
    notes.push("No git diff available (new/untracked files or not a git repo).");
    return notes;
  }
  if (/TODO|FIXME/.test(diff)) notes.push("Diff contains TODO/FIXME.");
  if (/console\.(log|debug)\(/.test(diff)) notes.push("Diff adds console logging.");
  if (/catch\s*\([^)]*\)\s*\{\s*\}/.test(diff)) notes.push("Empty catch block detected.");
  if (/\b(password|api[_-]?key|secret)\b/i.test(diff)) notes.push("Possible secret-like identifier in diff — verify nothing is hardcoded.");
  if (notes.length === 0) notes.push("No automated red flags in the diff snippet.");
  return notes;
}

const input = readStdin();
const state = loadState();
const files = Array.isArray(state.files) ? state.files : [];
const status = input.status || "completed";
const prompt = state.prompt || "";
const hasPromptFile = Boolean(state.prompt_path);

if (status === "aborted" || (!files.length && !prompt && !hasPromptFile)) {
  console.log(JSON.stringify({}));
  process.exit(0);
}

const id = state.prompt_id || stamp();
const fileList = files.map((f) => `- \`${f.path}\` (${f.edits} edit${f.edits === 1 ? "" : "s"})`).join("\n");
const scope = geonewsRel();
const diffStat =
  git(`diff --stat -- "${scope}"`) || git(`status --porcelain -- "${scope}"`);
const diff = git(
  `diff -- "${scope}" ":(exclude)${scope}/prompts" ":(exclude)${scope}/reviews" ":(exclude)${scope}/.cursor/hooks/state"`,
);
const clipped = diff.length > 8000 ? `${diff.slice(0, 8000)}\n\n… truncated …` : diff;
const notes = heuristicNotes(diff);

mkdirSync(PROMPTS_DIR, { recursive: true });
mkdirSync(REVIEWS_DIR, { recursive: true });

const promptPath = state.prompt_path || join(PROMPTS_DIR, `${id}.md`);
const reviewPath = join(REVIEWS_DIR, `${id}.md`);

if (!hasPromptFile) {
  writeFileSync(
    promptPath,
    `# Prompt ${id}

- session: \`${state.session_id || "unknown"}\`
- captured: ${state.prompt_at || "unknown"}
- paired review: \`reviews/${id}.md\`

## User prompt

${prompt || "(prompt was not captured)"}
`,
  );
}

writeFileSync(
  reviewPath,
  `# Review ${id}

- session: \`${state.session_id || "unknown"}\`
- agent status: \`${status}\`
- paired prompt: \`prompts/${id}.md\`

## Prompt

${prompt}

## Files the agent wrote

${fileList || "- (none tracked)"}

## Git summary

\`\`\`
${diffStat || "(no git summary)"}
\`\`\`

## Diff snippet

\`\`\`diff
${clipped || "(no diff)"}
\`\`\`

## Automated notes

${notes.map((n) => `- ${n}`).join("\n")}

## Manual checklist

- [ ] Change matches the prompt
- [ ] No secrets in the diff
- [ ] Tests updated if behavior changed
`,
);

saveState({
  ...state,
  prompt: "",
  prompt_at: null,
  files: [],
  last_artifacts: { prompt: promptPath, review: reviewPath, at: new Date().toISOString() },
});

console.log(JSON.stringify({}));
