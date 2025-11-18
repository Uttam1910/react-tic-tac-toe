# 🎮 Tic Tac Toe Pro v2.0

A modern, feature-rich Tic Tac Toe game built with React featuring AI opponents, responsive design, and a beautiful UI.

## ✨ Features

- **🎯 Two Game Modes**
  - Player vs Player (PvP)
  - Player vs AI

- **🤖 AI Difficulty Levels**
  - Easy: Random moves
  - Medium: Smart decisions with some randomness
  - Hard: Unbeatable AI using minimax algorithm

- **📊 Score Tracking**
  - Persistent score storage using localStorage
  - Track wins, draws, and losses
  - Reset scores anytime

- **🌙 Dark/Light Theme**
  - Toggle between themes
  - Theme preference saved automatically
  - Smooth transitions

- **📱 Responsive Design**
  - Works perfectly on desktop, tablet, and mobile
  - Touch-friendly interface
  - Optimized for all screen sizes

- **🎨 Modern UI/UX**
  - Smooth animations and transitions
  - Professional gradient backgrounds
  - Glassmorphism effects
  - Hover interactions and visual feedback
  - Winner highlighting with animations

- **⚡ Performance**
  - Optimized rendering
  - Smart AI algorithm with caching
  - Minimal re-renders

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the project**
```bash
cd tic-tac-toe
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

## 🎮 How to Play

1. **Select Game Mode**
   - Choose between "2 Players" or "vs AI"

2. **Choose Difficulty (AI mode only)**
   - Easy: Perfect for learning
   - Medium: A good challenge
   - Hard: Nearly unbeatable

3. **Play**
   - Click any empty square to make your move
   - Player X goes first
   - The status bar shows whose turn it is

4. **Win Conditions**
   - Get three of your symbols in a row (horizontal, vertical, or diagonal)
   - The winning squares highlight with animation

5. **Score Tracking**
   - Your scores update automatically
   - Scores persist across sessions
   - Click "Reset Scores" to clear them

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🛠️ Technologies Used

- **React 18.3**: UI framework
- **CSS3**: Modern styling with animations
- **FontAwesome**: Icon library
- **Local Storage API**: Data persistence
- **Minimax Algorithm**: AI implementation

## 📁 Project Structure

```
src/
├── App.js                 # Main app component with theme and score tracking
├── App.css               # App styling
├── components/
│   ├── Board.js         # Game board logic and AI implementation
│   ├── Board.css        # Board styling
│   ├── Square.js        # Individual square component
│   └── Square.css       # Square styling
├── index.js             # Entry point
└── index.css            # Global styles

public/
├── index.html           # HTML template
└── manifest.json        # PWA manifest
```

## 🎯 Game Logic

### Winner Detection
- Checks 8 possible winning lines
- Highlights winning squares
- Detects draw conditions

### AI Algorithm
- **Easy**: Randomly selects from available squares
- **Medium**: Uses minimax algorithm with 70% probability, falls back to random 30% of the time
- **Hard**: Pure minimax algorithm - evaluates all possible future states to find the optimal move

### Minimax Scoring
- AI victory: +10
- Player victory: -10
- Draw: 0
- Depth-based adjustments: Prefers faster wins and slower losses

## 💾 Data Persistence

The app uses browser localStorage to save:
- **Scores**: X wins, O wins, draws
- **Theme preference**: Light or dark mode

Data is automatically loaded on app start and saved on every game end.

## 🎨 Customization

### Colors
Edit the CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #ec4899;
  --accent-color: #14b8a6;
  /* ... more variables ... */
}
```

### AI Behavior
Modify difficulty logic in `src/components/Board.js`:
- Adjust minimax depth for performance
- Change probability weights in medium difficulty
- Add new difficulty levels

## 📦 Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build` folder.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📝 Version History

### v2.0 (Current)
- Complete UI overhaul with modern design
- AI opponent with multiple difficulty levels
- Score tracking system
- Dark/Light theme toggle
- Responsive design
- Enhanced animations

### v0.1
- Basic 2-player game
- Simple UI

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Built with React
- Icons by FontAwesome
- Design inspired by modern web applications

## 🐛 Known Issues

None currently reported. Please create an issue if you find one!

## 🚀 Future Enhancements

- [ ] Sound effects
- [ ] Online multiplayer
- [ ] Game replay/history
- [ ] Achievements and badges
- [ ] Player names and avatars
- [ ] Statistics and analytics dashboard
- [ ] Elo rating system
- [ ] Mobile app version

## 📞 Contact

For questions or suggestions, feel free to reach out!

---

**Enjoy the game! 🎉**
