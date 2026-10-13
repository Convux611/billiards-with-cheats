<div align="center">

# 🎱 Billiards *with* Cheats

**See every shot before you take it.**

[![License](https://img.shields.io/badge/license-Proprietary-red?style=for-the-badge)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://convux611.github.io/billiards-with-cheats)
[![HTML5](https://img.shields.io/badge/HTML5-single--file-E34F26?style=for-the-badge&logo=html5&logoColor=white)]()
[![Firebase](https://img.shields.io/badge/Firebase-accounts-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)]()
[![MQTT](https://img.shields.io/badge/MQTT-multiplayer-660066?style=for-the-badge)]()

</div>

---

## 🕹️ What is this?

**Billiards with Cheats** is a fully featured 8-ball pool game built as a single HTML file — no downloads, no installs, runs instantly in any browser. The twist? You can see the **full trajectory of every ball** before you shoot, letting you plan every shot with perfect precision.

Whether you're playing solo, going up against a bot, or competing against a friend online — the cheat lines are always there to guide you (if you want them).

---

## ✨ Features

### 🎯 Core Gameplay
- Full **8-ball pool** rules with realistic physics simulation
- **Cheat lines** — see the exact path every ball will take before you shoot
- **Spin control** — tap the cue ball diagram to apply top spin, back spin, left/right english
- **Power slider** — drag or scroll to control shot power (1%–100%)
- **Undo** — take back your last shot
- **Reset** — rerack and start fresh anytime

### 🌐 Multiplayer
- **Online lobbies** — create or join named rooms with optional passwords
- **Realtime 1v1** via MQTT (no server needed, works peer-to-peer)
- **Turn timer** — Normal (60s) or Rapid (12s) mode
- **Turn-by-turn mode** — turn passes after every shot
- **Forced trick shots** — bank off a far wall after the break
- **Emoji reactions** — send emojis to taunt (or comfort) your opponent

### 🤖 vs Computer
- Play against an AI opponent at **Easy**, **Normal**, or **Hard** difficulty

### 🎨 Polish & Feel
- **Dark billiard-hall aesthetic** — walnut wood, brass trim, felt-green LEDs
- **3D spinning balls** — each ball has a real quaternion orientation that updates as it rolls
- **Ball return tube** — pocketed balls roll down a visible tube on the side of the table
- **Sound effects** — collisions, pockets, cushion hits
- **Mouse wheel aiming** — snappy, precise angle control with adjustable sensitivity

### ⚙️ Settings
| Setting | Description |
|---|---|
| Cue power | Multiply your shot power (1.0× – 3.0×) |
| Mouse wheel aim | Sensitivity per scroll notch (adjustable) |
| Ice table | Low-friction table for long, fast shots |
| Keep cheat lines after shot | See where the balls *were* predicted to go |

### 👤 Accounts
- Sign in with **Google** to get a profile
- Custom **username** + **profile picture**
- Head-to-head **win/loss record** tracked between signed-in players
- Powered by **Firebase Auth + Firestore** (free tier)

### 📱 PWA
- **Install to home screen** on Android, iOS, or desktop
- Runs in **fullscreen landscape** mode
- Works **offline** (service worker caches the app)

---

## 🕹️ Controls

### Mouse / Desktop
| Action | Control |
|---|---|
| Aim | Click & drag on the table |
| Fine-tune angle | Scroll wheel (anywhere on page) |
| Set power | Hold left mouse button + drag down behind cue ball |
| Shoot | Release mouse button |
| Apply spin | Click the cue ball diagram (top-left) |
| Move cue ball | Enable **Move** mode, then drag the cue ball |

### Touch / Mobile
| Action | Control |
|---|---|
| Aim | Touch in front of the cue ball — stick follows finger |
| Hold aim | Touch behind the cue ball to lock the angle |
| Set power | Drag the power slider (left side) |
| Shoot | Tap the table / release |
| Spin | Tap the cue ball diagram |

---

## 🛠️ Tech Stack

| Tech | Role |
|---|---|
| Vanilla HTML / CSS / JS | Everything — zero frameworks, zero dependencies |
| Canvas 2D API | Game rendering, ball physics, cheat line drawing |
| MQTT (HiveMQ / EMQX / Mosquitto) | Realtime multiplayer over WebSockets |
| Firebase Auth | Google sign-in |
| Cloud Firestore | Player profiles & win records |
| Service Worker | PWA offline support |

> The entire game logic, physics engine, renderer, UI, and multiplayer client live inside a single `index.html` file.

---

## 🚀 Running Locally

No build step needed. Just open the file:

```bash
# Option 1 — open directly in browser
open index.html

# Option 2 — serve locally (recommended for PWA features)
npx serve .
# or
python -m http.server 8080
```

Then visit `http://localhost:8080` in your browser.

---

## ⚖️ License

This project is **proprietary**. All rights reserved.  
See [LICENSE](LICENSE) for details — viewing the source does not grant any right to use, copy, or distribute it.

---

<div align="center">
Made with ♠ by <a href="https://github.com/Convux611">Convux611</a>
</div>
