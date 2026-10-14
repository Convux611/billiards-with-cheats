# Billiards with Cheats — Project Guidelines & Rules

## Project Overview
- Single-page web application featuring a billiards game with cheat features.
- Progressive Web App (PWA) with service worker caching (`sw.js`, `manifest.webmanifest`).
- Real-time multiplayer support via MQTT (`mqtt.min.js`).
- Upstream repo: https://github.com/Convux611/billiards-with-cheats

## Key Project Files
- `index.html` — Main game logic, rendering, physics, cheat engine, and UI.
- `account.js` — Account management and user profiles.
- `mqtt.min.js` — Minified MQTT client library for multiplayer networking (vendor bundle, avoid inspecting unless troubleshooting network internals).
- `sw.js` — Service worker for offline capability and caching.
- `manifest.webmanifest` — PWA configuration.

---

## Workflow & Communication Guidelines

### 1. Code-First & Concise Explanations
- **Keep explanations short**: Provide brief, direct explanations without unnecessary fluff, pleasantries, or lengthy recaps.
- **Focus on programming**: Prioritize functional code, robust implementations, and technical solutions over long theoretical text.
- **Actionable output**: Present clean code and targeted diffs directly addressing the task.

### 2. Context & History Flexibility
- **Read code whenever needed**: Code correctness and game stability come first. Feel free to inspect full files or large sections whenever necessary to understand the architecture, game state, or component interactions.
- **Refer back to context when helpful**: Revisit earlier conversation history, previous constraints, and design decisions whenever needed to maintain continuity and prevent regressions.
- **Context pruning**: Suggest the `/compact` command when conversations grow very long to tidy context without sacrificing quality.

### 3. Practical Token Efficiency
- Cut conversational filler and repetitive restatements of previous turns.
- Skip reading large minified vendor bundles (`mqtt.min.js`) or binary assets unless explicitly required.

### 4. Git & GitHub Deployment
- **Repository**: Connected to `https://github.com/Convux611/billiards-with-cheats` on branch `main`.
- **Automated pushes**: When asked to push or save changes to GitHub, execute git directly via terminal (`git add <files>`, `git commit -m "..."`, `git push origin main`). Never ask the user to manually upload files.

