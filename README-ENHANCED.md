# 🐉 Dragon Repeller RPG - Enhanced Edition

## 📋 Overview
A fully enhanced browser-based RPG with modern animations, sound effects, quest system, achievements, and beautiful UI.

## 🎮 Features Implemented

### ✨ Visual Design & Layout
- Clean, responsive fantasy RPG layout with pixel-art aesthetic
- Unique background scenes for each location (town, store, cave, battle)
- Animated health, XP, and stamina bars
- Retro RPG fonts with hover animations
- Visual feedback on all interactions

### 🎯 Gameplay & Progression
- **Level System**: Level up every 100 XP with stat increases
- **Critical Hits**: 15% chance to deal double damage
- **Monster Elements**: Fire, poison, and normal types
- **Stamina System**: Limits combat actions (requires rest)
- **Random Combat**: Variable damage based on level and weapon

### 🏪 Store & Inventory
- Visual inventory grid with item icons
- Buy health potions (10 gold)
- Progressive weapon upgrades
- Equipped weapon highlighting

### 🎯 New Systems
- **Quest System**: Auto-generated quests with XP and gold rewards
- **Achievements**: 5 unlockable achievements with notifications
- **Save/Load**: Auto-save every 30 seconds + localStorage persistence
- **Combat Log**: Real-time battle feed

### 🎵 Sound & Music
- Background music for different locations
- Sound effects for attacks, hits, coins, and level-ups
- Toggleable audio in settings menu

### 🎨 Animation & Polish
- Smooth location transitions
- Attack animations with particle effects
- Hit flash effects on damage taken
- Level-up celebrations
- Achievement pop-ups

### 📱 UI/UX
- Full-screen responsive design
- Player info card with avatar
- Minimap showing current location
- Settings menu (music, SFX, animation speed)
- Start menu with New Game/Continue/Settings/Credits

## 📁 Required Image Files

Place these images in the **same folder** as your HTML/CSS/JS files:

### 🏞️ Backgrounds (1920x1080px recommended)
```
bg-town.jpg       - Medieval town square scene
bg-store.jpg      - Shop interior with shelves
bg-cave.jpg       - Dark cave with rocks
bg-fight.jpg      - Battle arena or dramatic background
```

### ⚔️ Weapons (64x64px transparent PNG)
```
weapon-stick.png     - Simple wooden stick
weapon-dagger.png    - Iron dagger
weapon-hammer.png    - Claw hammer
weapon-sword.png     - Knight's sword
```

### 👾 Monsters (128x128px transparent PNG)
```
monster-slime.png    - Green slime blob
monster-beast.png    - Wolf or fanged creature
monster-dragon.png   - Red/black dragon
```

### 👤 Player & UI Icons (as specified)
```
player-sprite.png    - Hero character (64x64px)
coin-icon.png        - Gold coin (32x32px)
heart-icon.png       - Red heart (32x32px)
star-icon.png        - Yellow star (32x32px)
```

### 🎭 Optional Animated GIFs
```
torch.gif       - Flickering torch animation
flag.gif        - Waving flag animation
```

## 🎨 Where to Get Images

### Free Resources:
1. **OpenGameArt.org** - Pixel art sprites and backgrounds
2. **Itch.io** - Free game assets (search "RPG sprites")
3. **Kenney.nl** - Free game assets pack
4. **Freepik.com** - Free vectors and images
5. **Pixabay.com** - Free stock images

### Quick Placeholder Solution:
If you don't have images yet, the code has fallback:
- Backgrounds will show colored gradients
- Missing icons will show emoji replacements (⚔️, 🐉, ❤️, etc.)
- Game will work fully without images!

## 🚀 How to Run

1. **Copy all 3 files** to a folder:
   - `index.html`
   - `styles.css`
   - `script-enhanced.js`

2. **Add images** (optional but recommended) to the same folder

3. **Open `index.html`** in any modern browser (Chrome, Firefox, Edge)

4. **Play!** Click "New Game" to start

## 🎮 Controls

- **Mouse Click**: Interact with all buttons
- **Auto-Save**: Game saves every 30 seconds + after major actions
- **Continue**: Load your saved game from the start menu

## 📊 Game Stats

### Weapons
| Weapon      | Power | Cost |
|-------------|-------|------|
| Stick       | 5     | 0    |
| Dagger      | 15    | 30g  |
| Claw Hammer | 30    | 60g  |
| Sword       | 50    | 100g |

### Monsters
| Monster      | Level | HP  | Attack | Rewards    |
|--------------|-------|-----|--------|------------|
| Slime        | 2     | 30  | 5      | 10 XP, 15g |
| Fanged Beast | 5     | 80  | 12     | 30 XP, 40g |
| Dragon       | 10    | 200 | 25     | 100 XP, 200g |

### Achievements
- 🩸 **First Blood**: Defeat your first monster
- 🎯 **Monster Hunter**: Defeat 10 monsters
- 💰 **Wealthy Merchant**: Accumulate 500 gold
- ⬆️ **Rising Hero**: Reach level 5
- 🐉 **Dragon Slayer**: Defeat the dragon

## 🔧 Tech Stack

- **Pure Vanilla JavaScript** (no frameworks)
- **CSS3** with animations and gradients
- **HTML5** with semantic elements
- **LocalStorage API** for save system
- **Web Audio API** for sounds

## 📝 Code Structure

```
script-enhanced.js
├── Game State Management
├── Data Arrays (weapons, monsters, locations)
├── DOM Element References
├── Menu Functions
├── Location & Navigation
├── Store System
├── Combat System
├── Level Up System
├── Quest System
├── Achievement System
├── UI Update Functions
├── Audio System
└── Visual Effects
```

## 🎯 Future Enhancement Ideas

- Multiplayer mode
- Equipment system (armor, accessories)
- Magic spells and abilities
- More locations and bosses
- Character customization
- Difficulty modes
- Mobile touch controls
- Gamepad support

## 📜 License

Free to use, modify, and distribute. Created for educational purposes.

## 🙏 Credits

- **Original Game**: Your basic RPG concept
- **Enhanced by**: GitHub Copilot AI
- **Music**: Mixkit (royalty-free)
- **Fonts**: Google Fonts (Press Start 2P, MedievalSharp)

---

## 🎮 Quick Start Checklist

- [ ] Copy 3 code files (HTML, CSS, JS)
- [ ] Add background images (or skip for gradient fallbacks)
- [ ] Add weapon icons (or skip for emoji fallbacks)
- [ ] Add monster sprites (or skip for emoji fallbacks)
- [ ] Open index.html in browser
- [ ] Click "New Game"
- [ ] Enjoy your enhanced RPG! 🎉

---

**Need help?** The game will work even without images! Just open and play to see the enhanced functionality. Add images later for the full visual experience.
