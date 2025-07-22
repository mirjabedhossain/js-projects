let xp = 0;
let gold = 50  ;
let health = 100;
let fighting;
let currentWeapon = 0;
let haveWeapons = ['stick']
let monsterHealth = 0;

const xpText = document.getElementById("xp-text");
const goldText = document.getElementById("gold-text");
const healthText = document.getElementById("health-text");  
const button1 = document.getElementById("btn1");
const button2 = document.getElementById("btn2");
const button3 = document.getElementById("btn3");    
const monstersText = document.getElementById("monster-name");
const monsterHealthText = document.getElementById("monster-health");
const text = document.getElementById("details");
const monsterField = document.getElementById("monster-field");


const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEge],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

button1.onclick = goStore;
button2.onclick = goCave;   
button3.onclick = fightDragon;

function updateUi(location){
    monsterField.style.display = 'none';
    button1.innerText = location['button text'][0];
    button2.innerText = location['button text'][1]; 
    button3.innerText = location['button text'][2];
    button1.onclick = location['button functions'][0];  
    button2.onclick = location['button functions'][1];
    button3.onclick = location['button functions'][2];  
    text.innerHTML = location.text;

} 

function goStore() {
    updateUi(locations[1])
}
function goCave() {
    updateUi(locations[2])
}
function goTown() {
    updateUi(locations[0])
}
function comonFight(fighting){
  updateUi(locations[3])
  monsterField.style.display = 'block'
  monstersText.innerText = monsters[fighting].name
  monsterHealth = monsters[fighting].health
  monsterHealthText.innerText = monsterHealth;
 
}

function fightDragon(){
   
        fighting = 2;
        comonFight(fighting)

}
function buyHealth(){
  if(gold >= 10){
      gold -= 10;
      health += 10;
      goldText.innerText = gold;
      healthText.innerText = health;  
      text.innerHTML = "You buy 10 health for 10 gold.";
      text.innerHTML += " You don't have enough gold to buy health.";
        
  }
    
    
}
function buyWeapon(){
    if( currentWeapon < weapons.length - 1){
      if(gold >= 30 ){
        currentWeapon++;
        gold -= 30;
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        haveWeapons.push(newWeapon)
        text.innerText = `You have ${newWeapon} now`
        currentWeapon = haveWeapons.length - 1


    }else(
      text.innerText = "You have not enough Gold to buy weapon"
    )
  }else{
    text.innerText = "You already have all weapons"
    button2.innerText = 'sell Weapon for 15 gold'
    button2.onclick = sellWeapon
    
  }
}

function sellWeapon(){
    if(haveWeapons.length > 1){
      gold += 15;
      goldText.innerText = gold;
      let currentWeapon = haveWeapons.shift()
      text.innerText = `You sold your ${currentWeapon} for 15 gold.`

    }
}

function fightBeast(){
    fighting = 1
    comonFight(fighting)

}

function fightSlime(){
  fighting = 0
  comonFight(fighting)
}

function attack(){
  text.innerText = "you are fighting against monster"
  health -= monsters[fighting].level * 5 - Math.floor(Math.random() * xp) + 1
  healthText.innerText = health
  if(isHit()){
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp)
    monsterHealthText.innerText = monsterHealth
  }
  if(monsterHealth <= 0){
    if(fighting === 2){
      updateUi(locations[6])
      text.innerText = "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
      return;
    }
    updateUi(locations[4])
    text.innerText = 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    xp += monsters[fighting].level
    xpText.innerText = xp
    gold += Math.floor(monsters[fighting].level * 6.7);
    goldText.innerText = gold
  }

  if(health <= 0){
    updateUi(locations[5])
    text.innerText = "You die. &#x2620;"
  }


}

function isHit(){
  return Math.random() > 0.2 || health < 20;
}

function dodge(){
  text.innerText = "You are dodge atteck from monster"
}

function restart(){
  gold = 50;
  xp = 0;
  health = 100
  goldText.innerText = gold
  xpText.innerText = xp
  healthText.innerText = health
  monsterField.style.display = 'none'
  haveWeapons = ['stick']
  monsterHealth = 0;
  currentWeapon = 0;
  updateUi(locations[0])

}
function easterEge(){
  updateUi(locations[7])
  text.innerText = "You find a secret game. Pick a number above. Ten numbers"
}
function pickTwo(){
  let pick = 2
  findGress(pick)
}
function pickEight(){
  let pick = 8
  findGress(pick)
}

function findGress(pick){
  let numbers = []
  while (numbers.length < 10){
    numbers.push(Math.floor(Math.random() * 10) + 1)
  }
let gets = false
  for(let i = 0 ; i < 10 ; i++){
    if(numbers[i] === pick){
      gets = true
    }
  }
  
  text.innerText = `You picked ${pick}. The numbers are: ${numbers.join(', ')}`
  if(gets){
    gold += 20;
    goldText.innerText = gold
  }else{
    health -= 10
    healthText.innerText = health
  }
}