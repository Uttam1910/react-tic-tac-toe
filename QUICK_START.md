# 🚀 Quick Start Guide - Tic Tac Toe Pro

## Installation & Running

```bash
# Navigate to project directory
cd tic-tac-toe

# Install dependencies (first time only)
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Key Files Structure

```
src/
├── App.js                 # Main app with theme & score management
├── App.css               # App styling with animations
├── index.js              # Entry point
├── index.css             # Global styles & CSS variables
└── components/
    ├── Board.js          # Game logic & AI implementation
    ├── Board.css         # Board styling
    ├── Square.js         # Square component (memoized)
    └── Square.css        # Square styling

public/
├── index.html            # HTML template
└── manifest.json         # PWA manifest
```

## Game Modes

### 🎮 Player vs Player
- Two human players take turns
- Classic 2-player Tic Tac Toe

### 🤖 Player vs AI
Three difficulty levels:

| Level | Behavior | Difficulty |
|-------|----------|------------|
| **Easy** | Random moves | Beginner |
| **Medium** | 70% smart, 30% random | Intermediate |
| **Hard** | Minimax algorithm (unbeatable) | Expert |

## Features

✅ **Game Play**
- Real-time winner detection
- Draw detection
- Score tracking
- Game reset

✅ **UI/UX**
- Dark/Light theme toggle
- Fully responsive design
- Smooth animations
- Glassmorphism effects
- Winner highlighting

✅ **Storage**
- Persistent score tracking
- Theme preference saved
- Uses browser LocalStorage

✅ **Performance**
- Optimized React hooks
- Memoized components
- Efficient AI algorithm
- No unnecessary re-renders

✅ **Accessibility**
- ARIA labels
- Keyboard navigation
- Screen reader support
- Semantic HTML

## Customization

### Change Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #ec4899;
  --accent-color: #14b8a6;
  /* ... more variables ... */
}
```

### Adjust AI Difficulty
Modify difficulty logic in `src/components/Board.js`:
- **Easy**: Random selection
- **Medium**: 70% minimax, 30% random
- **Hard**: 100% minimax algorithm

### Change Animation Speed
Update transitions in CSS files:
```css
transition: all 0.3s ease; /* Change 0.3s to desired duration */
```

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
# Windows: netstat -ano | findstr :3000
# macOS/Linux: lsof -i :3000
# Then kill the PID

# Or use a different port
PORT=3001 npm start
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Build Errors
```bash
# Ensure Node version is correct
node --version  # Should be v14+

# Rebuild node-sass
npm rebuild

# Clean install
npm ci
```

## Performance Tips

- Hard AI mode may take ~1-2 seconds for first move (normal - computing optimal play)
- Game is fully functional on mobile devices
- Scores and theme preference saved automatically
- No data sent to external servers (fully client-side)

## Browser DevTools

### Check Performance
1. Open DevTools (F12)
2. Go to Performance tab
3. Record a game move
4. Analyze the flamegraph (should show minimal re-renders)

### Check Accessibility
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Click "Analyze page load"
4. Review accessibility score

## Deployment

### Deploy to Netlify
```bash
npm run build
# Upload build/ folder to Netlify
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages
1. Add to package.json: `"homepage": "https://username.github.io/tic-tac-toe"`
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add scripts: `"predeploy": "npm run build", "deploy": "gh-pages -d build"`
4. Deploy: `npm run deploy`

## Support & Issues

- Check OPTIMIZATION_SUMMARY.md for detailed technical information
- Review README.md for comprehensive documentation
- All code is well-commented and self-explanatory

---

**Version**: 2.0 | **Status**: Production Ready ✅
