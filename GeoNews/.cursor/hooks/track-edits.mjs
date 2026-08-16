import { PROJECT_ROOT, loadState, readStdin, saveState, shouldTrackFile } from "./lib/state.mjs";

const input = readStdin();
const rawPath = String(input.file_path || "");
const filePath = rawPath.replace(/\\/g, "/").replace(PROJECT_ROOT.replace(/\\/g, "/") + "/", "");

if (shouldTrackFile(rawPath)) {
  const state = loadState();
  const files = Array.isArray(state.files) ? state.files : [];
  const existing = files.find((f) => f.path === filePath);
  const editCount = Array.isArray(input.edits) ? input.edits.length : 1;
  if (existing) {
    existing.edits += editCount;
    existing.at = new Date().toISOString();
  } else {
    files.push({ path: filePath, edits: editCount, at: new Date().toISOString() });
  }
  saveState({ ...state, files });
}

console.log(JSON.stringify({}));
