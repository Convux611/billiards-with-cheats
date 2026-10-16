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
- **Automated pushes**: ALWAYS push to GitHub automatically after every single update without waiting to be asked (`git add <files>`, `git commit -m "..."`, `git push origin main`). Never ask the user to prompt for a push or manually upload files.
- **Pulling from GitHub**: Whenever the user says "pull from github", "pull", or asks to sync with remote, immediately run `git pull origin main` to pull latest changes from GitHub and update local files.

### 5. Version Bumping
- **Game Version Indicator**: In `index.html`, there is a version display tag near the bottom: `<div id="ver">vX.XX</div>`.
- **Increment on every update**: Whenever making edits, adding features, or fixing bugs, ALWAYS increment this version number (e.g. `v2.04` -> `v2.05` -> `v2.06`) so the user can immediately confirm that the live site is running the latest deployment.
- **Service Worker Cache**: Also bump the cache version name `C` in `sw.js` (e.g. `'sandbox-pool-v3'` -> `'sandbox-pool-v4'`) so browsers immediately purge stale assets and fetch the newly updated files.


