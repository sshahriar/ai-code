<!-- ai-generated:true -->
<!-- model:x-ai/grok-4.5 -->
# Building a First-Person Shooter Game with Cursor AI Agent
> Week 1 | Day 1

## Overview
This lesson is a hands-on “instant gratification” intro to building with an AI coding agent in Cursor. You prompt the agent to create a browser-based neon arena FPS, open the generated files locally, play the game, then iterate with short follow-up prompts (richer enemy, HUD, harder difficulty). The same idea is contrasted with a more advanced zero-shot “Ralph Loop” + Claude Code run that produces a fuller game—previewing techniques you’ll use later—before the course shifts to more structured, commercial work.

## You will learn
- How an agent can turn a simple prompt into a multi-file web FPS (HTML/JS/CSS)
- Why outputs vary run-to-run and how to recover when something breaks
- How to iterate in natural language: visuals, HUD, difficulty
- How to test by opening `index.html` from the project folder
- When to reset the folder or switch models/prompts vs. debugging in place
- What a zero-shot Ralph Loop-style run can produce compared to chat iteration

## Topics
### Agent output: files, variance, and the workdir
After the initial build, the agent writes files into a project directory (in the walkthrough, a folder named `instant`). You might get three files—e.g. main HTML, a longer script file, and a stylesheet—or a single `index.html`. That variance is normal: the same kind of request does not always yield the same file split or implementation.

Use the editor to open each file and skim structure, and use the agent panel to review what it planned and changed. On disk, confirm the same files exist in `instant` (or your folder name). Mental model: the agent is a collaborator that materializes a small static web app; your job is to verify artifacts and behavior, not to require a fixed file layout on the first try.

### Running the game locally
Launch by double-clicking `index.html` (or opening it in the browser from the file system). You should see a start surface (e.g. neon arena FPS, controls like arrow keys to move/turn, space to shoot, and a control to start the match).

Play briefly to validate the loop: move, turn, shoot, hit targets, win or lose. This closes the loop from prompt → files → running product with no hand-written code. If controls, shooting, or rendering fail, treat that as expected occasional variance and continue in the agent thread rather than abandoning the idea.

### Recovering from broken or partial runs
Failures (no shooting, keys dead, blank page, etc.) are common across retries. Prefer telling the agent what broke and asking for a fix over manual deep debugging on day one.

If you are stuck in a bad state: delete the whole `instant` directory, recreate it, and run again with a fresh prompt. Try another model option or rephrase the request. This project is experimental—optimize for learning the workflow, not for protecting a perfect codebase.

### Iterating with short, creative prompts
Once a baseline runs, improve it in small chat turns. Example: praise the result, then ask to add detail so the opponent reads as an enemy—and explicitly allow creativity. The agent edits in place; when it reports done, hard-refresh or reopen `index.html` and confirm the foe is more than a plain sphere.

Keep prompts outcome-focused (“more like an enemy,” “be creative”) rather than prescribing meshes or engines unless you intend to. Re-test after each turn so visual and control regressions surface immediately.

### Gameplay systems via language: HUD and difficulty
Next iteration example: add a heads-up display (HUD) and make the game harder. The agent plans, then edits; you verify by starting a match and checking both information on screen and feel (e.g. tougher timing or opponent behavior).

This is the core loop for the course’s early agent work: describe product intent → let the agent plan/apply → you playtest → adjust. You still write no application code; you steer scope and quality in plain language.

### Human–agent collaboration without typing code
End-to-end, the conversation in Cursor yields the file set under `instant`, and follow-ups thicken the design. Success means a playable FPS from a simple initial prompt plus a few refinements—not a particular architecture.

If your run diverges, iterate or reset. The point is reps with agent-driven UI and game logic so later weeks can go deeper on planning, execution, and heavier projects.

### Preview: Ralph Loops, Claude Code, and zero-shot ambition
As a teaser for the next weeks’ techniques, the same kind of FPS was built with a Ralph Loop-style setup in Claude Code, zero-shot: one prompt, no mid-run feedback. The result can be markedly richer—polished entry screen, detailed weapon view, health and kills, minimap-style corner display, pickups to recover health, and stronger presentation overall.

You are not expected to reproduce that stack on day one. It frames the trajectory: from chat-and-files in Cursor to more disciplined agent loops capable of larger apps from a single launch. Full Ralph Loop practice comes later.

### Closing the “instant” segment and what comes next
This exercise is deliberately unbusinesslike: fast fun, low stakes, maximum feel for LLM-as-coder. After it, the course goes “all business”—commercial direction, clearer framing of what the program is about, and progressive techniques for sophisticated agent pair-building over roughly three weeks.

Keep the mindset: experiment, reset freely, vary models and prompts, and treat playable demos as the feedback signal.

## Walkthrough
1. Let the agent finish the initial FPS prompt; note how many files it created and open them in the editor.
2. Confirm the same files on disk under the project folder (e.g. `instant`).
3. Open `index.html` in the browser; start a match; verify move, turn, shoot, and basic win/loss.
4. If nothing playable appears, describe the failure to the agent and retry—or delete the folder and start clean.
5. Prompt to enrich the opponent (creative enemy detail); wait for edits; reopen/refresh and playtest.
6. Prompt for a HUD and higher difficulty; playtest information display and challenge level.
7. Optionally view a zero-shot Ralph Loop / Claude Code-style build of a similar game to see a higher ceiling (entry UI, gun view, health/kills, map, pickups).
8. Treat this as a sandbox; next sessions move into course goals and more serious builds.

## Practical tips
- Always re-open or refresh `index.html` after the agent claims it finished—stale browser tabs hide good fixes.
- Write prompts as product outcomes (enemy readability, HUD, difficulty), and allow creativity when you care about look-and-feel.
- Skim the agent’s plan/diff side panel so you learn how it decomposes tasks, even when you are not editing code.
- If behavior is flaky across runs, change one variable at a time: prompt wording, model choice, or clean directory reset.
- Keep sessions short: baseline → one visual pass → one systems pass (HUD/difficulty) beats a single huge prompt on day one.
- Use playtest notes (“space does nothing,” “enemy is still a sphere”) as the next message—specific observations fix faster than “it doesn’t work.”

## Common pitfalls
- Assuming everyone gets the same file layout or that three files means success and one file means failure—judge by gameplay.
- Hand-editing generated code too early instead of asking the agent to fix or regenerate.
- Skipping a full reset when the project is tangled; deleting `instant` and re-prompting is a valid first-day strategy.
- Stacking many feature requests before any playtest, which makes regressions hard to attribute.
- Treating a failed control scheme as a dead end rather than normal non-determinism to iterate on.
- Comparing your first Cursor chat demo unfairly to a polished zero-shot Ralph Loop result and concluding you “did it wrong.”

## Summary
A Cursor agent can scaffold a playable browser FPS from a simple prompt, drop files into a local folder, and improve enemy design, HUD, and difficulty through short follow-up chats—without you writing the game code. Outputs vary; fix via conversation or a clean retry. A zero-shot Ralph Loop + Claude Code teaser shows how far unattended agent runs can go, setting up deeper techniques in the weeks ahead as the course moves from instant demos to serious product work.
