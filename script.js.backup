let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {name: "stick", power: 5},
    {name: "dagger", power: 30},
    {name: "claw hammer", power: 50},
    {name: "sword", power: 100}
]

const monsters = [
    {name: "slime", level: 2, health: 15},
    {name: "fanged beast", level: 8, health: 60},
    {name: "dragon", level: 20, health: 300}
]   

const locations = [
    {
        name: "town Square" ,
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says 'Store' and a cave entrance."
    },
    {
        name: "store" ,
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "Welcome to the store. What do you want to buy?"
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You are in a dark cave. You hear strange noises."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, run],
        text: "You are fighting a monster."
    },
    {
        name : "killed monster",
        "button text": ["Go to town square", "Go to estuary", "Go to cave"],
        "button functions": [goTown, easterEgg, goCave],
        text: "You defeated the monster!"
    },
    {
        name : "lose",
        "button text": ["RESTART", "RESTART", "RESTART"],
        "button functions": [restart, restart, restart],
        text: "You have been defeated. Please restart the game."
    },
    {
        name : "win",
        "button text": ["REPLAY", "REPLAY", "REPLAY"],
        "button functions": [restart, restart, restart],
        text: "Congratulations! You have defeated the dragon and won the game!"
    },
    {
        name : "easter egg",
        "button text" : ["2" , "8" , "Go to town square?"],
        "button functions" : [pickTwo, pickEight, goTown],
        text: " you found a secret game . Pick a number above . Ten numbers will be randomly choosen between 0 and 10 . if the number you choose matches one of the random numbers , you win !"
    }
]

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goStore() {
    update(locations[1]);
}
function goCave() {
    update(locations[2]);
}
function goTown() {
    update(locations[0]);
}
function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }else {
        text.innerText = "You don't have enough gold to buy health.";
    }
}
function buyWeapon() {
    if(currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You bought a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have : " + inventory.join(", ") + ".";
        } else {
            text.innerText = "You don't have enough gold to buy a weapon.";
        }
    }else{
        text.innerText = "You already have the most powerful weapon.";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}
function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        inventory.pop();
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have : " + inventory.join(", ") + ".";
    } else {
        text.innerText = "Don't sell your only weapon!";
    }
}
function fightSlime() {
    
    fighting = 0 ;
    goFight();
}
function fightBeast() {
    fighting = 1 ;
    goFight();
}
function fightDragon() {
    fighting = 2 ;
    goFight();
}
function goFight(monster) {
    update(locations[3]); 
    monsterHealth = monsters[fighting].health; 
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}
function attack() {
    text.innerText = "You attacked the " + monsters[fighting].name + " with your " + weapons[currentWeapon].name + ".";
    if(isMonsterHit()){
            health -= getMonsterAttackValue(monsters[fighting].level);
    }else{
        text.innerText += "you missed the attack!";
    }
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1 ;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatmonster();
    }
    if (Math.random() < 0.1 && inventory.length > 1) {
        text.innerText += "Your " + inventory.pop() + " broke!";
        currentWeapon--;
    }
}
function dodge() {
    text.innerText = "You dodged the attack from the " + monsters[fighting].name + ".";
}
function run() {
    goTown();
}
function defeatmonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function lose() {
    update(locations[5]);
} 

function winGame() {
    update(locations[6]);
}
function restart() {
    xp = 0;
    health = 100;
   gold = 50;
   currentWeapon = 0;
   inventory = ["stick"];
   goldText.innerText = gold;
   healthText.innerText = health;
   xpText.innerText = xp;
   goTown();
}
function getMonsterAttackValue(level) {
    let hit = level * 5 - Math.floor(Math.random() * xp);
    return hit < 0 ? 0 : hit;
}
function isMonsterHit() {
    let dodgeChance = Math.random();
    return dodgeChance > 0.2 || health < 20 ; // 80% chance to hit
}
function easterEgg() {
    update(locations[7]);
}
function pickTwo() {
    pick(2);
}  
function pickEight() {
    pick(8);
}       
function pick(guess){
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the numbers: ";
    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }
    if (numbers.indexOf(guess) !== -1) {
        text.innerText += "Congratulations! You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Sorry, you lose 10 health. Try again!";
        health -= 10;
        healthText.innerText = health;
        if (health <= 0) {
            lose();
        } 
    }
}