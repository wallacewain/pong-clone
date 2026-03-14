# Pong Clone Devlog

## What is this

A Pong game in a single HTML file. Two players, local multiplayer, the classic setup. Except it's not classic at all because we immediately went off the rails.

## What we did

### 1. Made a normal Pong game

Standard stuff:
- Canvas-based rendering
- Two paddles (W/S and Arrow keys)
- Ball that speeds up on every hit
- Angled returns based on paddle hit position
- Score tracking, first to 10 wins
- Pause with Space

This lasted about 30 seconds before things got weird.

### 2. Added Pac-Man (feature/pacman)

The big idea: after the ball bounces at least 5 times in a single rally, Pac-Man has a random chance to spawn from a random edge of the screen. He then:

- Chases the ball across the field with his mouth chomping
- Has an eye so you know he means business
- Catches the ball and eats it — the ball visibly shrinks inside his mouth
- Ends the game with a yellow "PAC-MAN ate the ball!" message
- Neither player wins. Pac-Man wins. Nobody asked for this.

The longer a rally goes, the more likely he is to show up. So play well and get punished for it.

## Stupid ideas along the way

- Pac-Man interrupting a completely different game for no reason
- Making the ball shrink while being eaten instead of just disappearing (worth it)
- The fact that Pac-Man is technically a third player who always wins

## Tech

- Single `pong.html` file, no dependencies, no build step
- Vanilla JS + Canvas API
- Open it in a browser and go

## Branch history

- `master` — the whole thing
- `feature/pacman` — merged in, where the chaos lives
