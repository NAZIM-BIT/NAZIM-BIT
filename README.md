# Tic Tac Toe Game 🎮

A beautiful, modern, and fully-featured Tic Tac Toe game built with HTML, CSS, and JavaScript.

## Features ✨

- **Beautiful Modern UI**: Gradient backgrounds, smooth animations, and responsive design
- **Score Tracking**: Keeps track of wins for X, O, and draws with persistent storage
- **Keyboard Support**: Play using number keys (1-9 in numpad layout) or mouse clicks
- **Sound Effects**: Procedural audio feedback for moves, wins, and draws
- **Auto-reset**: Games automatically reset after 3 seconds when finished
- **Winning Animation**: Winning cells are highlighted with pulsing animation
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Local Storage**: Scores are saved and persist between sessions

## How to Play 🎯

1. **Starting**: Player X always goes first
2. **Making Moves**: 
   - Click on any empty cell to place your mark
   - Or use keyboard numbers 1-9 (arranged like a numpad)
3. **Winning**: Get three of your marks in a row (horizontal, vertical, or diagonal)
4. **Controls**:
   - Click cells or use number keys 1-9
   - Press 'R' to reset the current game
   - Use "New Game" button to reset the board
   - Use "Reset Score" button to clear all scores

## Keyboard Layout 📱

```
7 | 8 | 9
---------
4 | 5 | 6
---------
1 | 2 | 3
```

## Running the Game 🚀

Simply open `index.html` in any modern web browser. No server or installation required!

```bash
# If you want to serve it locally (optional)
python -m http.server 8000
# Then visit http://localhost:8000
```

## File Structure 📁

```
tic-tac-toe/
├── index.html      # Main HTML structure
├── style.css       # Modern styling and animations
├── script.js       # Game logic and interactions
└── README.md       # This file
```

## Browser Compatibility 🌐

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Future Enhancements 🔮

The code includes a commented-out AI player that you can enable by uncommenting the relevant sections in `script.js`. The AI uses a strategic algorithm to provide a challenging opponent.

Enjoy playing! 🎉
