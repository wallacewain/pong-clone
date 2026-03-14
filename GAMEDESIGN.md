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

### iOS notes
- Works in Safari — Share → Add to Home Screen to install
- `fullscreen` manifest mode not supported on iOS, falls back to `standalone` (small status bar)
- Offline play requires iOS 16.4+

### Known loose ends
- Icons (`icon-192.png`, `icon-512.png`) are minimal generated placeholders — worth replacing with real art
- `gen-icons.mjs` can be deleted once you're happy with the icons
- No network multiplayer — both players share one device

---

## Related
- **Triangles** — separate repo: https://github.com/wallacewain/triangles
