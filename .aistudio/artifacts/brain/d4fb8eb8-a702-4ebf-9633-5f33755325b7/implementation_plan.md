# Chota Don's 22nd Birthday Adventure 🎂🫀✨

An extraordinary, gamified birthday adventure website celebrating **Chota Don 🫀** on her **22nd birthday milestone**, lovingly conceived and crafted by **British**. The experience blends 9 interactive story quest levels, real-time audio and physics animations, a grand finale, and cutting-edge Gemini AI features.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The personalized attributes from the source specification (`Chota Don 🫀`, Age `22`, Gender `Girl`, Created By `British`) serve as the foundation of the experience. Placeholders are never displayed.

- **Confirmed Theme & Visual Direction**: Modern luxury aesthetic pairing rich rose-gold, cosmic velvet violet, and warm champagne starlight with frosted glass panels and high-contrast typography.
- **Audio Experience**: Pure in-browser Web Audio API synthesizer generating delicate ambient harp arpeggios and celebratory sound effects with instant header toggles (no broken audio links or external CDN dependencies).
- **AI Integrations**:
  - **Keepsake Portrait Studio**: Powered by `gemini-3-pro-image-preview` with explicit UI affordances for **1K**, **2K**, and **4K** image sizes and customizable aspect ratios.
  - **Fairy Companion (Astraea)**: Multi-turn chat interface honoring Chota Don and British, supporting model tiers (`gemini-3.1-flash-lite`, `gemini-3.8-flash`, and `gemini-4-argon`).

---

## 1. Overview & Core Concept

- **What It Does**: Transmutes a traditional static birthday greeting into a 3–5 minute interactive journey through 9 magical stages, climaxing in an animated candle-lighting ritual, a handwritten typewriter letter from British, and a massive fireworks celebration.
- **Target Celebrant**: Chota Don 🫀, celebrating her 22nd birthday—a milestone celebrating her charisma, wit, strength, and elegance.
- **Key Value**: Delivers an emotionally resonant, deeply personalized gift made with genuine care, combining mini-games with authentic heartfelt tributes.

---

## 2. User Experience & Visual Design

### Key User Flows (Story Progression)

```
[Level 1: Magical Welcome] ──► [Level 2: The Magical Door] ──► [Level 3: Gift Kingdom]
                                                                        │
[Level 6: Star Collection] ◄── [Level 5: Balloon World] ◄── [Level 4: Butterfly Challenge]
          │
          ▼
[Level 7: Treasure Chest]  ──► [Level 8: Birthday Cake & 22 Candles] ──► [Level 9: Secret Letter]
                                                                                 │
                                                                                 ▼
                                                                     [🌟 FINAL CELEBRATION 🌟]
```

1. **Level 1 — Magical Welcome**: Ambient gradient aurora with floating stars, butterflies, hearts, balloons, and an animated **"Start the Surprise 🌟"** gateway.
2. **Level 2 — The Magical Door**: Interactive 3D arched door with golden handles; opening it unleashes light beams and reveals a personalized tribute.
3. **Level 3 — Gift Kingdom**: 10 floating interactive gift boxes, each revealing a unique, non-duplicate birthday wish for Chota Don 🫀.
4. **Level 4 — Butterfly Challenge**: Interactive mini-game tracking butterfly catches, unlocking secret compliments and affirmations.
5. **Level 5 — Balloon World**: Ascending pastel balloons that pop with confetti bursts and display uplifting compliments.
6. **Level 6 — Star Collection**: Deep celestial sky where collecting 5 stars unlocks milestone blessings for her 22nd year.
7. **Level 7 — Treasure Chest**: Ornate golden chest unlocking 30 categorized luxury blessing cards (Royalty, Magic, Blossom, Wealth, Joy).
8. **Level 8 — Birthday Cake**: 3-tier birthday cake featuring 22 interactive candles; lighting all 22 triggers a fireworks explosion and celebration fanfare.
9. **Level 9 — Secret Letter**: Wax-sealed envelope unsealed to reveal a heartfelt, typed personal letter from British to Chota Don 🫀.
10. **Final Celebration**: Grand fireworks and confetti engine, giant glowing banner *"🌟 HAPPY BIRTHDAY! 🌟🌟"*, personalized blessing card, trophy case, and keepsake tools.

### Visual Identity & Theme
- **Color Tokens**: Rich deep space violet (`#0b051d`), radiant rose (`#f43f5e`), vibrant magenta (`#ec4899`), luminous champagne amber (`#fbbf24`), and crystal emerald accents.
- **Typography**: Paired serif display typography (`Playfair Display`, `Cinzel Decorative`) with script flourishes (`Great Vibes`) and modern sans-serif readability (`Plus Jakarta Sans`).
- **Motion & Physics**: Canvas-driven multi-color firework bursts, gravity-aware confetti particles, and CSS float physics.

---

## 3. Key Product Decisions & Trade-Offs

- **Server-Side AI Gateway**:
  - *Decision*: Route all `@google/genai` calls through Express backend endpoints (`/api/chat`, `/api/generate-image`).
  - *Why*: Adheres to strict environment isolation requirements, keeps credentials server-side, and enables model tier switching (`gemini-3.1-flash-lite`, `gemini-3.8-flash`, `gemini-4-argon`, and `gemini-3-pro-image-preview`).
- **Web Audio API vs. External MP3s**:
  - *Decision*: Synthesize ambient background chords and sound effects directly via the Web Audio API.
  - *Why*: Eliminates broken audio assets, network latency, and CORS failures while ensuring responsive sound playback on mobile and desktop.
- **Progressive Unlock with Replayability**:
  - *Decision*: Gate subsequent levels behind interaction milestones while maintaining an achievement drawer and instant replayability in the grand finale.
  - *Why*: Balances an engaging story journey with convenient navigation.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (Vite / React 19)                │
├────────────────────────────────────────────────────────────────────────┤
│  HUD Header: Level Progress Bar | Sound Controls | Achievement Drawer  │
│                                                                        │
│  Active Stage: Level 1 ──► Level 9 ──► Grand Finale                    │
│                                                                        │
│  Ambient Engines:                                                      │
│  ┌───────────────────────┐  ┌───────────────────┐  ┌─────────────────┐ │
│  │ ParticleBackground    │  │ FireworksCanvas   │  │ Web Audio SFX   │ │
│  └───────────────────────┘  └───────────────────┘  └─────────────────┘ │
│                                                                        │
│  Interactive Modals:                                                   │
│  ┌──────────────────────────────┐  ┌─────────────────────────────────┐ │
│  │ Astraea Fairy Chat (Gemini)  │  │ Keepsake Studio (1K/2K/4K Img)  │ │
│  └──────────────┬───────────────┘  └────────────────┬────────────────┘ │
└─────────────────┼───────────────────────────────────┼──────────────────┘
                  │                                   │
                  ▼                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        BACKEND (Express / Node.js)                     │
├────────────────────────────────────────────────────────────────────────┤
│  POST /api/chat (gemini-3.1-flash-lite | 3.8-flash | 4-argon)          │
│  POST /api/generate-image (gemini-3-pro-image-preview, 1K/2K/4K)       │
└────────────────────────────────────────────────────────────────────────┘
```

- **Client State**:
  - `currentLevel`: Controls active scene render (`1` through `10`).
  - `achievements`: Tracks 10 milestone badges.
  - `litCandles`: Set of candle indices lit in Level 8.
  - `musicEnabled` & `sfxEnabled`: Real-time audio gain states.
- **Integrations**:
  - `/api/chat`: Multi-turn chat maintaining conversation history with system instruction for Astraea the Celestial Guardian.
  - `/api/generate-image`: Image generation with parameters `{ prompt, imageSize: '1K' | '2K' | '4K', aspectRatio }`.
