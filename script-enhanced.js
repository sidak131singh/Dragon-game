
let gameState = {
    // Player Stats
    player: {
        name: "Hero",
        level: 1,
        xp: 0,
        xpNeeded: 100,
        health: 100,
        maxHealth: 100,
        gold: 50,
        attack: 10,
        stamina: 100,
        maxStamina: 100,
        currentWeapon: 0
    },
    
    // Game Progress
    inventory: [{name: "stick", icon: "weapon-stick.png"}],
    currentLocation: "town",
    fighting: null,
    monsterHealth: 0,
    
    // Quests
    activeQuests: [],
    completedQuests: [],
    
    // Achievements
    achievements: [],
    unlockedAchievements: [],
    
    // Settings
    settings: {
        musicEnabled: true,
        sfxEnabled: true,
        animationSpeed: 'normal'
    },
    
    // Combat
    combatLog: [],
    inCombat: false
};

// ========== GAME DATA ==========
const weapons = [
    {name: "stick", power: 5, cost: 0, icon: "weapon-stick.png"},
    {name: "dagger", power: 15, cost: 30, icon: "weapon-dagger.png"},
    {name: "claw hammer", power: 30, cost: 60, icon: "weapon-hammer.png"},
    {name: "sword", power: 50, cost: 100, icon: "weapon-sword.png"}
];

const monsters = [
    {name: "slime", level: 2, health: 30, attack: 5, xpReward: 10, goldReward: 15, icon: "monster-slime.png", element: "poison"},
    {name: "fanged beast", level: 5, health: 80, attack: 12, xpReward: 30, goldReward: 40, icon: "monster-beast.png", element: "fire"},
    {name: "dragon", level: 10, health: 200, attack: 25, xpReward: 100, goldReward: 200, icon: "monster-dragon.png", element: "fire"}
];

const achievements = [
    {id: "first_blood", name: "First Blood", description: "Defeat your first monster", unlocked: false},
    {id: "monster_hunter", name: "Monster Hunter", description: "Defeat 10 monsters", unlocked: false, count: 0},
    {id: "wealthy", name: "Wealthy Merchant", description: "Accumulate 500 gold", unlocked: false},
    {id: "level_5", name: "Rising Hero", description: "Reach level 5", unlocked: false},
    {id: "dragon_slayer", name: "Dragon Slayer", description: "Defeat the dragon", unlocked: false}
];

const questTemplates = [
    {type: "kill", target: "slime", count: 3, reward: {xp: 20, gold: 30}, description: "Defeat 3 slimes"},
    {type: "kill", target: "fanged beast", count: 2, reward: {xp: 40, gold: 50}, description: "Defeat 2 fanged beasts"},
    {type: "collect", target: "gold", count: 100, reward: {xp: 30}, description: "Collect 100 gold"},
    {type: "upgrade", target: "weapon", count: 1, reward: {xp: 25, gold: 20}, description: "Upgrade your weapon"}
];

const locations = {
    town: {
        name: "Town Square",
        background: "town",
        buttons: ["Go to Store", "Go to Cave", "Rest"],
        functions: ["goStore", "goCave", "rest"],
        text: "You are in the town square. The sun shines brightly. Where would you like to go?",
        music: "bgMusicTown"
    },
    store: {
        name: "Store",
        background: "store",
        buttons: ["Buy Health (10g)", "Buy Weapon", "Go to Town"],
        functions: ["buyHealth", "buyWeapon", "goTown"],
        text: "Welcome to the store! What would you like to purchase?",
        music: "bgMusicTown"
    },
    cave: {
        name: "Dark Cave",
        background: "cave",
        buttons: ["Fight Slime", "Fight Beast", "Go to Town"],
        functions: ["fightSlime", "fightBeast", "goTown"],
        text: "You enter a dark cave. You hear strange noises echoing...",
        music: "bgMusicTown"
    },
    fight: {
        name: "Battle",
        background: "fight",
        buttons: ["Attack", "Dodge", "Run"],
        functions: ["attack", "dodge", "run"],
        text: "You are in combat!",
        music: "bgMusicCombat"
    }
};

// ========== DOM ELEMENTS ==========
const elements = {
    // Menus
    startMenu: document.getElementById('startMenu'),
    settingsMenu: document.getElementById('settingsMenu'),
    creditsMenu: document.getElementById('creditsMenu'),
    gameContainer: document.getElementById('gameContainer'),
    
    // HUD
    playerName: document.getElementById('playerName'),
    levelText: document.getElementById('levelText'),
    healthText: document.getElementById('healthText'),
    maxHealthText: document.getElementById('maxHealthText'),
    healthBar: document.getElementById('healthBar'),
    xpText: document.getElementById('xpText'),
    xpNeededText: document.getElementById('xpNeededText'),
    xpBar: document.getElementById('xpBar'),
    goldText: document.getElementById('goldText'),
    attackText: document.getElementById('attackText'),
    staminaText: document.getElementById('staminaText'),
    questCountText: document.getElementById('questCountText'),
    
    // Scene
    sceneBackground: document.getElementById('sceneBackground'),
    narrativeText: document.getElementById('narrativeText'),
    monsterDisplay: document.getElementById('monsterDisplay'),
    playerDisplay: document.getElementById('playerDisplay'),
    monsterImage: document.getElementById('monsterImage'),
    monsterName: document.getElementById('monsterName'),
    monsterHealthBar: document.getElementById('monsterHealthBar'),
    monsterHealthText: document.getElementById('monsterHealthText'),
    monsterLevel: document.getElementById('monsterLevel'),
    
    // Buttons
    button1: document.getElementById('button1'),
    button2: document.getElementById('button2'),
    button3: document.getElementById('button3'),
    button4: document.getElementById('button4'),
    
    // Panels
    inventoryGrid: document.getElementById('inventoryGrid'),
    questList: document.getElementById('questList'),
    combatLog: document.getElementById('combatLog'),
    logContent: document.getElementById('logContent'),
    
    // Notifications
    achievementNotif: document.getElementById('achievementNotif'),
    achievementName: document.getElementById('achievementName'),
    levelUpNotif: document.getElementById('levelUpNotif'),
    newLevel: document.getElementById('newLevel'),
    
    // Minimap
    mapTown: document.getElementById('map-town'),
    mapStore: document.getElementById('map-store'),
    mapCave: document.getElementById('map-cave'),
    
    // Audio
    bgMusicTown: document.getElementById('bgMusicTown'),
    bgMusicCombat: document.getElementById('bgMusicCombat'),
    sfxAttack: document.getElementById('sfxAttack'),
    sfxHit: document.getElementById('sfxHit'),
    sfxCoin: document.getElementById('sfxCoin'),
    sfxLevelUp: document.getElementById('sfxLevelUp')
};

// ========== MENU FUNCTIONS ==========
function startNewGame() {
    // Reset game state
    gameState.player = {
        name: "Hero",
        level: 1,
        xp: 0,
        xpNeeded: 100,
        health: 100,
        maxHealth: 100,
        gold: 50,
        attack: 10,
        stamina: 100,
        maxStamina: 100,
        currentWeapon: 0
    };
    gameState.inventory = [{name: "stick", icon: "weapon-stick.png"}];
    gameState.currentLocation = "town";
    gameState.activeQuests = [];
    gameState.unlockedAchievements = [];
    
    elements.startMenu.classList.remove('active');
    elements.gameContainer.classList.remove('hidden');
    
    updateLocation('town');
    updateUI();
    generateRandomQuest();
    playMusic('bgMusicTown');
}

function continueGame() {
    const savedGame = localStorage.getItem('dragonRepellerSave');
    if (savedGame) {
        gameState = JSON.parse(savedGame);
        elements.startMenu.classList.remove('active');
        elements.gameContainer.classList.remove('hidden');
        updateLocation(gameState.currentLocation);
        updateUI();
        playMusic('bgMusicTown');
    } else {
        alert('No saved game found!');
        startNewGame();
    }
}

function saveGame() {
    localStorage.setItem('dragonRepellerSave', JSON.stringify(gameState));
    addCombatLog('Game saved successfully!', 'heal');
}

function showSettings() {
    elements.settingsMenu.classList.add('active');
}

function hideSettings() {
    elements.settingsMenu.classList.remove('active');
}

function showCredits() {
    elements.creditsMenu.classList.add('active');
}

function hideCredits() {
    elements.creditsMenu.classList.remove('active');
}

// ========== LOCATION & NAVIGATION ==========
function updateLocation(locationKey) {
    const location = locations[locationKey];
    if (!location) return;
    
    gameState.currentLocation = locationKey;
    
    // Update background
    elements.sceneBackground.className = `scene-bg ${location.background}`;
    
    // Update text
    elements.narrativeText.textContent = location.text;
    
    // Update buttons
    elements.button1.textContent = location.buttons[0];
    elements.button2.textContent = location.buttons[1];
    elements.button3.textContent = location.buttons[2];
    
    elements.button1.onclick = () => window[location.functions[0]]();
    elements.button2.onclick = () => window[location.functions[1]]();
    elements.button3.onclick = () => window[location.functions[2]]();
    
    // Update minimap
    document.querySelectorAll('.minimap-dot').forEach(dot => dot.classList.remove('active'));
    if (elements[`map${locationKey.charAt(0).toUpperCase() + locationKey.slice(1)}`]) {
        elements[`map${locationKey.charAt(0).toUpperCase() + locationKey.slice(1)}`].classList.add('active');
    }
    
    // Hide/show monster display
    if (locationKey === 'fight') {
        elements.monsterDisplay.classList.remove('hidden');
        elements.playerDisplay.classList.remove('hidden');
        elements.combatLog.classList.remove('hidden');
    } else {
        elements.monsterDisplay.classList.add('hidden');
        elements.playerDisplay.classList.add('hidden');
        elements.combatLog.classList.add('hidden');
    }
    
    // Play appropriate music
    playMusic(location.music);
    
    // Save game
    saveGame();
}

function goTown() {
    updateLocation('town');
    gameState.inCombat = false;
}

function goStore() {
    updateLocation('store');
}

function goCave() {
    updateLocation('cave');
}

function rest() {
    if (gameState.player.health < gameState.player.maxHealth) {
        gameState.player.health = Math.min(gameState.player.maxHealth, gameState.player.health + 50);
        gameState.player.stamina = gameState.player.maxStamina;
        elements.narrativeText.textContent = "You rest and recover your strength. Health and stamina restored!";
        playSFX('sfxCoin');
        updateUI();
    } else {
        elements.narrativeText.textContent = "You are already at full health!";
    }
}

// ========== STORE FUNCTIONS ==========
function buyHealth() {
    const cost = 10;
    if (gameState.player.gold >= cost) {
        if (gameState.player.health < gameState.player.maxHealth) {
            gameState.player.gold -= cost;
            gameState.player.health = Math.min(gameState.player.maxHealth, gameState.player.health + 10);
            elements.narrativeText.textContent = "You bought 10 health!";
            playSFX('sfxCoin');
            createParticles(50, 30);
            updateUI();
        } else {
            elements.narrativeText.textContent = "Your health is already full!";
        }
    } else {
        elements.narrativeText.textContent = "You don't have enough gold!";
    }
}

function buyWeapon() {
    if (gameState.player.currentWeapon < weapons.length - 1) {
        const nextWeapon = weapons[gameState.player.currentWeapon + 1];
        if (gameState.player.gold >= nextWeapon.cost) {
            gameState.player.gold -= nextWeapon.cost;
            gameState.player.currentWeapon++;
            gameState.inventory.push({name: nextWeapon.name, icon: nextWeapon.icon});
            gameState.player.attack += nextWeapon.power;
            elements.narrativeText.textContent = `You bought a ${nextWeapon.name}! Attack increased!`;
            playSFX('sfxCoin');
            createParticles(100, 50);
            updateInventoryDisplay();
            updateUI();
            checkQuestProgress('upgrade', 'weapon', 1);
        } else {
            elements.narrativeText.textContent = `You need ${nextWeapon.cost} gold to buy a ${nextWeapon.name}!`;
        }
    } else {
        elements.narrativeText.textContent = "You already have the best weapon!";
    }
}

// ========== COMBAT SYSTEM ==========
function fightSlime() {
    startFight(0);
}

function fightBeast() {
    startFight(1);
}

function fightDragon() {
    startFight(2);
}

function startFight(monsterIndex) {
    if (gameState.player.stamina < 20) {
        elements.narrativeText.textContent = "You're too tired to fight! Rest first.";
        return;
    }
    
    gameState.fighting = monsterIndex;
    const monster = monsters[monsterIndex];
    gameState.monsterHealth = monster.health;
    gameState.inCombat = true;
    gameState.combatLog = [];
    
    updateLocation('fight');
    
    // Display monster
    elements.monsterImage.src = monster.icon;
    elements.monsterImage.onerror = function() {
        this.style.display = 'none';
        this.parentElement.innerHTML = `<div style="font-size:100px;">🐉</div>` + this.parentElement.innerHTML;
    };
    elements.monsterName.textContent = monster.name.toUpperCase();
    elements.monsterLevel.textContent = monster.level;
    elements.monsterHealthText.textContent = `${gameState.monsterHealth} / ${monster.health}`;
    updateMonsterHealthBar();
    
    addCombatLog(`A wild ${monster.name} appears!`, 'default');
    elements.narrativeText.textContent = `You encounter a ${monster.name}! Prepare for battle!`;
}

function attack() {
    if (!gameState.inCombat) return;
    
    const monster = monsters[gameState.fighting];
    const weapon = weapons[gameState.player.currentWeapon];
    
    // Player attacks
    const isCritical = Math.random() < 0.15; // 15% crit chance
    let damage = weapon.power + Math.floor(Math.random() * gameState.player.level * 2);
    if (isCritical) {
        damage *= 2;
        createParticles(150, 100);
    }
    
    gameState.monsterHealth -= damage;
    gameState.player.stamina -= 10;
    
    // Add to combat log
    if (isCritical) {
        addCombatLog(`CRITICAL HIT! You dealt ${damage} damage!`, 'crit');
        playSFX('sfxCoin');
    } else {
        addCombatLog(`You attack for ${damage} damage.`, 'damage');
        playSFX('sfxAttack');
    }
    
    // Monster attacks back
    if (gameState.monsterHealth > 0) {
        const monsterDamage = monster.attack + Math.floor(Math.random() * 5);
        gameState.player.health -= monsterDamage;
        addCombatLog(`${monster.name} attacks you for ${monsterDamage} damage!`, 'damage');
        playSFX('sfxHit');
        flashElement(elements.playerDisplay);
    }
    
    updateUI();
    updateMonsterHealthBar();
    
    // Check combat outcome
    if (gameState.player.health <= 0) {
        defeat();
    } else if (gameState.monsterHealth <= 0) {
        victory();
    } else {
        elements.narrativeText.textContent = `You hit the ${monster.name} for ${damage} damage!`;
    }
}

function dodge() {
    if (!gameState.inCombat) return;
    
    const dodgeSuccess = Math.random() > 0.5;
    const monster = monsters[gameState.fighting];
    
    if (dodgeSuccess) {
        addCombatLog('You successfully dodged the attack!', 'heal');
        elements.narrativeText.textContent = `You dodged the ${monster.name}'s attack!`;
        gameState.player.stamina += 5; // Recover some stamina
    } else {
        const damage = Math.floor(monster.attack * 0.5);
        gameState.player.health -= damage;
        addCombatLog(`Dodge failed! You took ${damage} damage.`, 'damage');
        elements.narrativeText.textContent = `You failed to dodge and took ${damage} damage!`;
        playSFX('sfxHit');
    }
    
    updateUI();
}

function run() {
    if (!gameState.inCombat) return;
    
    const runSuccess = Math.random() > 0.4;
    
    if (runSuccess) {
        elements.narrativeText.textContent = "You successfully escaped!";
        gameState.inCombat = false;
        setTimeout(() => goTown(), 1000);
    } else {
        const monster = monsters[gameState.fighting];
        const damage = Math.floor(monster.attack * 0.7);
        gameState.player.health -= damage;
        addCombatLog(`Failed to escape! ${monster.name} attacks for ${damage} damage!`, 'damage');
        elements.narrativeText.textContent = `You failed to escape and took ${damage} damage!`;
        playSFX('sfxHit');
        updateUI();
        
        if (gameState.player.health <= 0) {
            defeat();
        }
    }
}

function victory() {
    const monster = monsters[gameState.fighting];
    
    gameState.player.xp += monster.xpReward;
    gameState.player.gold += monster.goldReward;
    gameState.inCombat = false;
    
    elements.narrativeText.textContent = `Victory! You defeated the ${monster.name} and gained ${monster.xpReward} XP and ${monster.goldReward} gold!`;
    
    addCombatLog(`Victory! +${monster.xpReward} XP, +${monster.goldReward} Gold`, 'heal');
    playSFX('sfxCoin');
    createParticles(200, 100);
    
    // Check achievements
    checkAchievement('first_blood');
    if (gameState.fighting === 2) {
        checkAchievement('dragon_slayer');
    }
    
    // Check quests
    checkQuestProgress('kill', monster.name, 1);
    
    updateUI();
    checkLevelUp();
    
    setTimeout(() => goTown(), 3000);
}

function defeat() {
    gameState.inCombat = false;
    gameState.player.health = 0;
    gameState.player.gold = Math.floor(gameState.player.gold * 0.5);
    
    elements.narrativeText.textContent = "You were defeated! You lost half your gold...";
    addCombatLog('You were defeated...', 'damage');
    
    setTimeout(() => {
        gameState.player.health = gameState.player.maxHealth;
        gameState.player.stamina = gameState.player.maxStamina;
        updateUI();
        goTown();
    }, 3000);
}

// ========== LEVEL UP SYSTEM ==========
function checkLevelUp() {
    if (gameState.player.xp >= gameState.player.xpNeeded) {
        gameState.player.level++;
        gameState.player.xp -= gameState.player.xpNeeded;
        gameState.player.xpNeeded = Math.floor(gameState.player.xpNeeded * 1.5);
        
        // Stat increases
        gameState.player.maxHealth += 20;
        gameState.player.health = gameState.player.maxHealth;
        gameState.player.attack += 5;
        gameState.player.maxStamina += 10;
        gameState.player.stamina = gameState.player.maxStamina;
        
        showLevelUpNotification();
        playSFX('sfxLevelUp');
        createParticles(300, 150);
        
        // Check achievements
        if (gameState.player.level === 5) {
            checkAchievement('level_5');
        }
        
        updateUI();
    }
}

function showLevelUpNotification() {
    elements.newLevel.textContent = gameState.player.level;
    elements.levelUpNotif.classList.add('show');
    
    setTimeout(() => {
        elements.levelUpNotif.classList.remove('show');
    }, 3000);
}

// ========== QUEST SYSTEM ==========
function generateRandomQuest() {
    if (gameState.activeQuests.length < 3) {
        const template = questTemplates[Math.floor(Math.random() * questTemplates.length)];
        const quest = {
            id: Date.now(),
            ...template,
            progress: 0
        };
        gameState.activeQuests.push(quest);
        updateQuestDisplay();
    }
}

function checkQuestProgress(type, target, amount) {
    gameState.activeQuests.forEach(quest => {
        if (quest.type === type && quest.target === target) {
            quest.progress += amount;
            
            if (quest.progress >= quest.count) {
                completeQuest(quest);
            }
        }
    });
    updateQuestDisplay();
}

function completeQuest(quest) {
    gameState.player.xp += quest.reward.xp || 0;
    gameState.player.gold += quest.reward.gold || 0;
    
    gameState.activeQuests = gameState.activeQuests.filter(q => q.id !== quest.id);
    gameState.completedQuests.push(quest.id);
    
    elements.narrativeText.textContent = `Quest complete! +${quest.reward.xp || 0} XP, +${quest.reward.gold || 0} Gold`;
    playSFX('sfxCoin');
    createParticles(100, 50);
    
    updateUI();
    checkLevelUp();
    generateRandomQuest();
}

function updateQuestDisplay() {
    elements.questList.innerHTML = '';
    
    if (gameState.activeQuests.length === 0) {
        elements.questList.innerHTML = '<p style="text-align:center; color:#888;">No active quests</p>';
    }
    
    gameState.activeQuests.forEach(quest => {
        const questDiv = document.createElement('div');
        questDiv.className = 'quest-item';
        questDiv.innerHTML = `
            <h4>${quest.description}</h4>
            <p>Reward: ${quest.reward.xp || 0} XP, ${quest.reward.gold || 0} Gold</p>
            <div class="quest-progress">Progress: ${quest.progress}/${quest.count}</div>
        `;
        elements.questList.appendChild(questDiv);
    });
    
    elements.questCountText.textContent = gameState.activeQuests.length;
}

// ========== ACHIEVEMENT SYSTEM ==========
function checkAchievement(achievementId) {
    const achievement = achievements.find(a => a.id === achievementId);
    
    if (achievement && !gameState.unlockedAchievements.includes(achievementId)) {
        gameState.unlockedAchievements.push(achievementId);
        showAchievementNotification(achievement);
    }
}

function showAchievementNotification(achievement) {
    elements.achievementName.textContent = achievement.name;
    elements.achievementNotif.classList.add('show');
    
    playSFX('sfxLevelUp');
    
    setTimeout(() => {
        elements.achievementNotif.classList.remove('show');
    }, 3000);
}

// ========== UI UPDATE FUNCTIONS ==========
function updateUI() {
    // Player stats
    elements.levelText.textContent = gameState.player.level;
    elements.healthText.textContent = gameState.player.health;
    elements.maxHealthText.textContent = gameState.player.maxHealth;
    elements.xpText.textContent = gameState.player.xp;
    elements.xpNeededText.textContent = gameState.player.xpNeeded;
    elements.goldText.textContent = gameState.player.gold;
    elements.attackText.textContent = gameState.player.attack;
    elements.staminaText.textContent = gameState.player.stamina;
    
    // Health bar
    const healthPercent = (gameState.player.health / gameState.player.maxHealth) * 100;
    elements.healthBar.style.width = `${healthPercent}%`;
    
    // XP bar
    const xpPercent = (gameState.player.xp / gameState.player.xpNeeded) * 100;
    elements.xpBar.style.width = `${xpPercent}%`;
    
    // Check gold achievement
    if (gameState.player.gold >= 500) {
        checkAchievement('wealthy');
    }
    
    updateInventoryDisplay();
}

function updateMonsterHealthBar() {
    if (gameState.inCombat) {
        const monster = monsters[gameState.fighting];
        const healthPercent = (gameState.monsterHealth / monster.health) * 100;
        elements.monsterHealthBar.style.width = `${healthPercent}%`;
        elements.monsterHealthText.textContent = `${Math.max(0, gameState.monsterHealth)} / ${monster.health}`;
    }
}

function updateInventoryDisplay() {
    elements.inventoryGrid.innerHTML = '';
    
    gameState.inventory.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';
        if (index === gameState.player.currentWeapon) {
            itemDiv.classList.add('equipped');
        }
        
        const img = document.createElement('img');
        img.src = item.icon;
        img.alt = item.name;
        img.onerror = function() {
            this.parentElement.innerHTML = '⚔️';
        };
        
        itemDiv.appendChild(img);
        itemDiv.title = item.name;
        elements.inventoryGrid.appendChild(itemDiv);
    });
}

function toggleInventory() {
    const panel = document.getElementById('inventoryPanel');
    if (panel.style.display === 'none') {
        panel.style.display = '';
    } else {
        panel.style.display = 'none';
    }
}

// ========== COMBAT LOG ==========
function addCombatLog(message, type = 'default') {
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = message;
    elements.logContent.insertBefore(logEntry, elements.logContent.firstChild);
    
    // Keep only last 10 entries
    while (elements.logContent.children.length > 10) {
        elements.logContent.removeChild(elements.logContent.lastChild);
    }
}

// ========== AUDIO SYSTEM ==========
function playMusic(musicId) {
    if (!gameState.settings.musicEnabled) return;
    
    // Stop all music
    Object.keys(elements).forEach(key => {
        if (key.startsWith('bgMusic')) {
            elements[key].pause();
            elements[key].currentTime = 0;
        }
    });
    
    // Play requested music
    if (elements[musicId]) {
        elements[musicId].volume = 0.3;
        elements[musicId].play().catch(e => console.log('Audio play failed:', e));
    }
}

function playSFX(sfxId) {
    if (!gameState.settings.sfxEnabled) return;
    
    if (elements[sfxId]) {
        elements[sfxId].currentTime = 0;
        elements[sfxId].volume = 0.5;
        elements[sfxId].play().catch(e => console.log('SFX play failed:', e));
    }
}

// ========== VISUAL EFFECTS ==========
function createParticles(count, duration) {
    const container = document.getElementById('particleContainer');
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            particle.style.background = `hsl(${Math.random() * 60 + 40}, 100%, 50%)`;
            
            container.appendChild(particle);
            
            setTimeout(() => {
                container.removeChild(particle);
            }, 1000);
        }, i * (duration / count));
    }
}

function flashElement(element) {
    element.classList.add('hit-flash');
    setTimeout(() => {
        element.classList.remove('hit-flash');
    }, 300);
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dragon Repeller Enhanced Edition - Loaded!');
    
    // Auto-save every 30 seconds
    setInterval(() => {
        if (!elements.gameContainer.classList.contains('hidden')) {
            saveGame();
        }
    }, 30000);
});

// Make functions globally accessible
window.startNewGame = startNewGame;
window.continueGame = continueGame;
window.showSettings = showSettings;
window.hideSettings = hideSettings;
window.showCredits = showCredits;
window.hideCredits = hideCredits;
window.goTown = goTown;
window.goStore = goStore;
window.goCave = goCave;
window.rest = rest;
window.buyHealth = buyHealth;
window.buyWeapon = buyWeapon;
window.fightSlime = fightSlime;
window.fightBeast = fightBeast;
window.fightDragon = fightDragon;
window.attack = attack;
window.dodge = dodge;
window.run = run;
window.toggleInventory = toggleInventory;
