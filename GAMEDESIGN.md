# Game Design Notes

## Pong Clone

### What it is
Classic 2-player pong in a single HTML file. First to 10 wins.
PWA — installable on Android from the browser (Add to Home Screen).

### Features
- Two paddles, keyboard (W/S and arrow keys) and touch controls
- Touch: left half of screen = left paddle, right half = right paddle
- Canvas scales to fill screen in landscape
- Pac-Man that randomly appears after 5+ bounces and chases the ball — if it catches it, game over
- Service worker for offline play

### Stack
- Pure HTML/JS/Canvas, no dependencies
- `manifest.json` + `sw.js` for PWA
- GitHub Pages for hosting (auto-deploys on push via `.github/workflows/pages.yml`)
- `.devcontainer/devcontainer.json` for Codespaces (`serve` pre-installed, port 3000 auto-forwarded)

### Repo
- GitHub: https://github.com/wallacewain/pong-clone
- Live URL (after Pages is enabled): https://wallacewain.github.io/pong-clone/pong.html

### To enable GitHub Pages
Repo → Settings → Pages → Source → GitHub Actions

### Known loose ends
- Icons (`icon-192.png`, `icon-512.png`) are minimal generated placeholders — worth replacing with real art
- `gen-icons.mjs` can be deleted once you're happy with the icons
- No network multiplayer — both players share one device

---

## Triangles (design phase)

### Concept
2-player abstract strategy game. Each player owns a triangle. The corners of each triangle are movable **balls**. On each turn a player moves one ball. If a ball from the opponent's triangle sits inside your triangle's area, it gets eaten — losing **mass** — and becomes slower to move.

### Terminology
- **Ball** — a corner of the triangle, the thing you move
- **Mass** — the stat that increases as a ball is eaten. High mass = heavy = short movement range. Low mass = light = long movement range.
- **Eating** — when your triangle's area covers an opponent's ball. Happens at the end of each turn you hold coverage.

### Core loop (v1 — turn-based)
1. Active player selects one of their 3 balls
2. A movement circle is shown: radius = `BASE_RANGE × (1 - mass/MAX_MASS)`
3. Player taps destination within that circle to confirm move
4. After the move: any opponent ball currently inside your triangle loses 1 mass-point
5. Turn passes

### Mass / movement
- Balls start at mass 0 (fully light, full movement range)
- Mass increases by 1 per turn they're inside opponent's triangle
- Max mass = 10 (at max mass the ball can barely move — tiny radius)
- If a ball reaches max mass it is **removed** from the game
- Losing any ball = immediate loss (triangle collapses)

### Win condition
First player to have any one of their opponent's balls reach max mass (10) wins.
Rationale: keeps games decisive, every eating event matters.

### Canvas
- **Bounded circle**, no safe zones
- Hard wall — balls cannot leave the boundary
- No corner camping (unlike a square)
- Forces confrontation naturally as players retreat toward the wall

### Touch / UX on mobile
- Tap a ball to select it — shows movement radius circle
- Tap destination to move
- Turn indicator prominently shown (top of screen)
- Whose turn it is, each ball shows its current mass visually (size or colour)

### Branching plan
Each branch tests one variable at a time:

| Branch | What it tests |
|---|---|
| `v1-foundation` | Turn-based, circle canvas, mass mechanic baseline |
| `v2-action-points` | 2 actions/turn, mass affects action cost |
| `v3-realtime` | Both players move simultaneously — is chaos fun? |
| `v4-shrinking-circle` | Battle royale ring — shrinks every N turns, forces engagement |

### Open questions
- Should max mass = death (ball removed) or should the ball become permanently frozen (captive)?
- Does a degenerate triangle (zero area) still protect its balls? Probably yes, but it can't eat.
- What happens if the triangle inverts (balls cross over each other)? Probably just use absolute area (shoelace formula, take abs).
- Mobile: one device pass-and-play, or same-screen simultaneous? Start with pass-and-play.

### Tech plan
- Same stack as pong — single HTML file, Canvas 2D
- Point-in-triangle: sign-based test (fast, no deps)
- Triangle area: shoelace formula (for future area-based mechanics)
- Separate repo: `triangles`
