<div align="center">

# 🎱 Billiards *with* Cheats

**See every shot before you take it.**

[![License](https://img.shields.io/badge/license-Proprietary-red?style=for-the-badge)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://convux611.github.io/billiards-with-cheats)
[![HTML5](https://img.shields.io/badge/HTML5-single--file-E34F26?style=for-the-badge&logo=html5&logoColor=white)]()
[![Firebase](https://img.shields.io/badge/Firebase-accounts-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)]()
[![MQTT](https://img.shields.io/badge/MQTT-multiplayer-660066?style=for-the-badge)]()

![screenshot](preview.png)

</div>

8-ball pool that runs directly in your browser with zero installs. The highlight is the cheat engine — before every shot, you can preview the exact path, bank shots, and collisions of every ball on the table. 

Play online against friends, face smart AI bots, master handcrafted campaign puzzle levels, design custom trick shots in the level editor, or unlock custom cues in the shop!

---

## ✨ Features

### 🎯 The Cheats & Aiming
- **Full Trajectory Prediction**: Real-time multi-ball collision and cushion bounce forecasting.
- **Spin & English Control**: Topspin, backspin, and side english via an interactive cue-ball diagram.
- **Fine-Aim Wheel**: Dedicated rotary wheel for pixel-perfect millimeter aiming on mouse or touch.
- **Sandbox Controls**: Instant shot undo, table rerack, and free ball placement mode.

### 🏆 Campaign & Puzzle Challenges
- **Handcrafted Levels**: Tricky puzzle layouts requiring precise banks, multi-ball combos, and spin control.
- **3-Star Mastery System**: Earn stars based on shot count, with your highest star rating permanently preserved.
- **Coin Rewards**: Earn 100 coins for every newly unlocked star with animated celebration tallies.
- **Hazard Balls**: Solid pitch-black hazard balls that cause an instant challenge fail upon contact or sinking.
- **Challenge Rules**: Specific target-pocket assignments, no-scratch constraints, and optional cheat-free purity runs.

### 🛠️ Built-in Level Editor
- **Visual Table Canvas**: Interactive drag-and-drop table for creating custom puzzle scenarios.
- **Open Table Walls (Cut Rails)**: Toggle individual cushions off between pockets — balls fly off open edges with custom 3D falling animations.
- **Giant Heavy Balls**: Spawn massive balls up to 5x normal size with authentic mass scaling and dynamic high-res procedural texturing.
- **Slime Blob (Slowdown Zones)**: Add organic green slime puddles to the felt — balls passing through are temporarily slowed down until they exit.
- **Custom Rules & Ice Table**: Configure target goals, pockets, no-touch rules, and zero-friction ice surfaces.

### 🎱 Cue Shop & Economy
- **Collectible Cues**: Unlock an assortment of cues featuring distinct wraps, woods, and designs.
- **Integrated Economy**: Purchase cues using coins earned across campaign levels and multiplayer matches.
- **In-Game Rendering**: Equipped cues render in full detail during gameplay and match play.

### 🌐 Realtime Online Multiplayer
- **No-Server MQTT**: Instant 1v1 matchmaking and custom private password-protected lobbies.
- **Match Modes**: Standard 60s turn timer, 12s blitz/rapid, turn-by-turn mode, and forced trick shots.
- **Live Reactions**: Send animated emoji expressions mid-match.

### 🤖 vs Computer
- **Offline AI**: Practice against an AI opponent with Easy, Normal, and Hard difficulty levels.

### ⚡ 60 FPS Physics & Visual Engine
- **3D Quaternion Ball Physics**: True continuous 3D rolling orientation rendered procedurally with precomputed sphere lookups.
- **Physical Ball Return Tube**: Pocketed balls physically drop and roll down the return rail into a visual tray.
- **Ice Table Mode**: Low-friction surface mode for extreme multi-rail trick shots.
- **Optimized Performance**: Spatial AABB collision pruning, zero-allocation particle compaction, and zero GPU stalls.

### 👤 Cloud Accounts & Persistence
- **Google Sign-In**: Quick authentication powered by Firebase Auth.
- **Cross-Device Sync**: Stars, high scores, coins, and unlocked cues sync seamlessly via Cloud Firestore.
- **Match Statistics**: Win/loss and matchup history tracked per opponent.

### 📱 Progressive Web App (PWA)
- **Installable**: Add directly to your home screen on Android, iOS, Windows, and Mac.
- **Offline-First**: Fully cached by service worker so you can play offline anywhere.
- **Responsive Landscape**: Optimized mobile layout with slim touch controls and full-screen support.

---

## 🕹️ Controls

### Mouse
| Action | Control |
|---|---|
| **Aim Angle** | Click and drag across the table |
| **Fine-Tune Aim** | Scroll mouse wheel anywhere, or drag the fine-aim wheel |
| **Set Power** | Pull down the cue stick behind the cue ball, or use the left slider |
| **Shoot** | Release mouse button |
| **Apply Spin** | Click the cue ball diagram in the top right |
| **Move Cue Ball** | Enable Move mode (in hand), then drag the ball |

### Touch
| Action | Control |
|---|---|
| **Aim Angle** | Drag finger across the table (stick follows touch) |
| **Fine-Tune Aim** | Drag the rotary wheel on the right edge |
| **Set Power** | Drag the vertical power slider on the left edge |
| **Shoot** | Release the power slider or release cue pull |
| **Apply Spin** | Tap the cue ball diagram in the top right |

---

## 🛠️ Stack

The entire client — physics, 3D procedural shading, UI, level editor, and network client — is engineered in clean, zero-dependency web standards:

| Component | Technology |
|---|---|
| **Rendering & Physics** | HTML5 Canvas 2D API with adaptive sub-stepping |
| **Multiplayer Networking** | MQTT over WebSockets (HiveMQ / EMQX / Mosquitto) |
| **Authentication** | Firebase Auth (Google Sign-In) |
| **Database & Sync** | Cloud Firestore |
| **PWA & Offline** | Service Worker API & Web App Manifest |

---

## 🚀 Running Locally

```bash
# Simply open in any modern browser:
open index.html

# Or serve locally (recommended for PWA testing):
npx serve .
```

---

## ⚖️ License

Proprietary — all rights reserved. See [LICENSE](LICENSE). Viewing the source does not grant rights to copy, redistribute, or use commercially.

<div align="center">

made with ❤️ by [Convux611](https://github.com/Convux611)

</div>
