# Building a First-Person Shooter Game with Cursor AI Agent

## At a glance
Hands-on Day 1 intro: prompt Cursor’s AI agent to generate a browser neon-arena FPS, open the files locally, play, then refine with short natural-language prompts (enemy detail, HUD, difficulty). Failures and file-layout variance are normal—fix in chat or reset the folder. A zero-shot “Ralph Loop” / Claude Code teaser shows a richer ceiling before the course moves to structured, commercial work.

## Key takeaways
- An agent can turn one prompt into a multi-file (or single-file) static web FPS; layout and quality vary run-to-run.
- Your loop is: prompt → verify files on disk → open `index.html` → playtest → describe fixes or features in plain language.
- Prefer outcome-focused prompts and creativity over prescribing implementation; refresh/reopen the browser after every agent pass.
- Recover with “what broke + fix,” model/prompt changes, or delete-and-recreate the project folder—not deep manual debugging on day one.
- Chat iteration builds a playable baseline; disciplined zero-shot agent loops can produce fuller games later.

## You will learn
- How agents materialize HTML/JS/CSS FPS projects and why outputs differ
- Local testing via `index.html` and validating move / turn / shoot / win-loss
- Iterating visuals, HUD, and difficulty in natural language without writing app code
- When to debug in thread vs. reset the workdir or switch models
- How a Ralph Loop–style zero-shot run compares to stepwise Cursor chat

## Bottom line
Treat this as a low-stakes sandbox: steer the agent in product language, playtest as the signal, reset freely, and build reps before the course goes “all business.”
