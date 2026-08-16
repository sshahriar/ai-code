import { loadState, readStdin, saveState } from "./lib/state.mjs";

const input = readStdin();
const sessionId = input.session_id || `local-${Date.now()}`;
const state = loadState();

saveState({
  ...state,
  session_id: sessionId,
  composer_mode: input.composer_mode || null,
  prompt: "",
  prompt_at: null,
  files: [],
});

console.log(
  JSON.stringify({
    env: { GEONEWS_SESSION_ID: sessionId },
  }),
);
