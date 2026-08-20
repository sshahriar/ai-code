<!-- ai-generated:true -->
<!-- model:x-ai/grok-4.5 -->
# Welcome to the Course: Building a 3D Game with Cursor AI
> Week 1 | Day 1

## Overview
This lesson kicks off the AI Coder course with instant gratification instead of a long preamble. You install Cursor, open a fresh project, and use its coding agent to generate a simple 3D first-person shooter web game. The goal is to feel productive with AI-assisted coding immediately; deeper concepts (agents, curriculum, logistics) come later. Today is intentionally a fun exception—later projects emphasize real business impact.

## You will learn
- How this course approaches learning (build first, theory second)
- How to download, install, and sign in to Cursor on Mac and Windows
- How to open a project folder and orient yourself in the Cursor UI
- How to prompt the agent to generate a playable web game
- What to expect from non-deterministic AI coding sessions

## Topics
### Course philosophy: build before briefing
Most courses open with objectives, instructor bio, curriculum, and logistics. This one does the opposite: you roll up your sleeves and ship something on day one. Instant gratification builds momentum and context so later explanations land harder. Over three weeks you will work with several AI coding products and grow into strong agentic engineering practice. Treat the ride as intense and hands-on; there will be time afterward for structure and framing. A short caution applies: buckle in—the pace and volume of material are high by design.

### Why Cursor for day one
The course will use multiple AI code-generation tools, but day one starts with Cursor: popular, approachable, and available with a free trial. If you have already used the trial and prefer not to continue in-product, you can watch the walkthrough or mirror the same exercise in another tool. The exercise itself stays deliberately simple so you experience “AI writes real code” immediately, then the broader course continues from that shared baseline. Keep an eye on course resources linked on the platform in case install steps or product details change.

### Installing Cursor on Mac and Windows
Open a browser and go to cursor.com. Download the build for your platform (macOS including Apple silicon, Windows, or Linux). On the landing page, the primary button often targets your OS automatically.

On Mac: download, open the artifact, and drag Cursor into Applications.  
On Windows: run the installer, accept the agreement, keep defaults, and leave **Add to PATH** enabled—then install.

Launch Cursor when installation finishes. First launch should prompt sign-in or sign-up. Create a free account if needed (trial coverage is enough for this stretch of the course). If the welcome UI does not appear, use **File → New Window**. Sign-in flows through the browser; complete signup questions, then return to the app. Prefer course resources or instructor questions if anything blocks you.

### Opening a project folder (Mac and PC)
Cursor is based on VS Code. “Open a project” means choosing a directory that will hold all files for this work. A common pattern is a `projects` folder under your home directory; create `projects` if it does not exist, then create a subfolder for this exercise (e.g. `instant`) and open it.

On Mac: open the folder picker, navigate to your projects area, create `instant` if needed, and open it—you should see the project name prominently in the UI.  
On Windows: use **Open project**, navigate similarly, create or select `instant`, and confirm with **Select folder**. The name `instant` in the top-left indicates the workspace is correct. Sign in from the UI if the app still shows a login state.

### Cursor UI orientation
Expect a three-pane layout: left for the project file tree (empty at first), center for editors and code, right for chat with the agent. If panes are missing, use **View → Appearance** and toggle elements until the file tree and agent chat are visible. Familiarity with VS Code transfers directly; the important addition is the agent sidebar where you drive generation and edits.

### Business-first projects—and today’s exception
Course projects are meant to carry real-world and commercial weight: things you might monetize, extend, or use as a springboard. Business relevance is a standing priority—except for this lesson. Day one is deliberately playful so the first agent success feels entertaining and low-stakes. After this, work returns to business-impact builds.

### Prompting the agent and choosing a model
Focus the right-hand agent panel. You send natural-language requests to a coding agent (your “sidekick”); deeper agent theory is scheduled for the next session. Below the input you may pick a model, depending on plan. Some accounts are locked to **Auto** (Cursor chooses); others can pin a strong model. The walkthrough uses a capable GPT-based coding model available at recording time—you may see a different default and still proceed.

Submit a clear build request, for example: build a website for a 3D first-person shooter in an arena against one computer opponent, controlled with arrow keys and space to shoot. Send the same idea in your own words if you prefer, but keep controls and scope explicit.

### Watching the agent work (and variance)
After you send the prompt, the agent plans, explores, and writes files (e.g. `index.html`). It may ask permission for actions—approve when you are comfortable. Defaults often allow it to proceed without interruption. Outputs differ by model, settings, and nondeterminism: classmates will not get identical files or step lists. That uncertainty is normal and will be a recurring theme. Let the agent finish its first pass on the HTML (and any related assets it creates) before you judge the result.

## Walkthrough
1. Visit cursor.com and download Cursor for your OS.  
2. Install (Mac: drag to Applications; Windows: installer defaults, including add to PATH).  
3. Launch Cursor and sign up or sign in (File → New Window if the auth UI is missing).  
4. Create or locate a `projects` directory; create an `instant` folder and open it as the project.  
5. Confirm the three-pane layout (files, editor, agent); fix via View → Appearance if needed.  
6. In the agent panel, select a model if your plan allows (or leave Auto).  
7. Prompt the agent to build a web-based 3D FPS arena vs. one computer opponent, arrow keys + space to shoot.  
8. Approve permissions if asked; watch it create and edit files such as `index.html`.  
9. When it settles, inspect the generated files in the tree and editor—expect your run to differ slightly from others.

## Practical tips
- Use course resource links to catch install or product changes before you improvise.  
- Free trial is enough for this segment; you do not need a paid plan to start.  
- Name the folder clearly (`instant`) so you can find it when later lessons add more workspaces.  
- Keep the agent request concrete: genre, 3D, one AI opponent, and keyboard controls.  
- If the UI looks “wrong,” new window + Appearance toggles fix most layout issues.  
- On Windows, leaving add-to-PATH checked avoids tooling friction later.

## Common pitfalls
- Skipping sign-in and wondering why agent features are locked—complete auth before prompting.  
- Opening a random parent folder instead of a dedicated project directory, which clutters the tree.  
- Fighting missing panes instead of using View → Appearance.  
- Assuming your model and file output must match the instructor’s recording byte-for-byte.  
- Denying every permission prompt, which can stall file creation.  
- Over-scoping the first prompt; day one is a simple arena FPS web page, not a full engine.

## Summary
Day one installs Cursor, opens a clean project, and uses the agent to generate a fun 3D FPS web game with keyboard controls. You learn the product surface and the feel of agentic coding before formal theory. From the next lessons onward, the same workflow supports more serious, business-relevant builds across the wider AI tooling landscape.
