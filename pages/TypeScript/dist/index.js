"use strict";
const gameInterface = document.querySelector(".gameInterface");
const startScreen = document.querySelector('.startScreen');
const gamePad = document.querySelector('.gamePad');
const easySelector = document.querySelector('.easySelector');
const mediumSelector = document.querySelector('.midSelector');
const hardSelector = document.querySelector('.hardSelector');
const overlord = document.querySelector('.overlord');
const attackBtn = document.querySelector(".attackButton");
const specialAttackBtn = document.querySelector(".specialAttackButton");
const healBtn = document.querySelector(".healButton");
const specialHealBtn = document.querySelector(".specialHealBtn");
const abandonBtn = document.querySelector(".abandonButton");
const displayPlayerHealth = document.querySelector(".playerHealth");
const displayMonsterHealth = document.querySelector(".ghoulHealth");
const healthZone = document.querySelector(".healthZone");
const playerHealthBar = healthZone.querySelector('div:first-child');
const monsterHealthBar = healthZone.querySelector('div:last-child');
let logSpace = document.querySelector('.logs');
let powerChargeDisplay = document.querySelector('.gamePad p');
class Arena {
    constructor() {
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.logs = [];
        this.monsterMinPotency = 5;
        this.monsterMaxPotency = 10;
        this.killCharges = 0;
        this.powerCharges = 0;
    }
    defineDamage(min, max) {
        return Math.floor((Math.random() * max) + min);
    }
    monsterAttack() {
        let monsterPotency = this.defineDamage(this.monsterMinPotency, this.monsterMaxPotency);
        this.playerHealth -= monsterPotency;
        this.logs.unshift(`The Monster attacks you, causing ${monsterPotency} damage!`);
        this.checkPlayerHealth();
        this.updateHealthDisplay();
        this.updateLog();
    }
    playerAttack() {
        let playerPotency = this.defineDamage(3, 10);
        this.monsterHealth -= playerPotency;
        this.logs.unshift(`You attack the monster, causing ${playerPotency} damage!`);
        if (this.checkEnemyHealth()) {
            return;
        }
        ;
        this.monsterAttack();
        this.powerCharges += 1;
    }
    playerSpecialAttack() {
        this.powerCharges -= 3;
        if (this.powerCharges < 3) {
            specialAttackBtn.classList.replace('specialAttackButtonActive', 'specialAttackButton');
            specialHealBtn.classList.replace('specialHealBtnActive', 'specialHealBtn');
        }
        let playerPotency = this.defineDamage(10, 20);
        this.monsterHealth -= playerPotency;
        this.logs.unshift(`You attack the monster with all your might, causing ${playerPotency} damage!`);
        if (this.checkEnemyHealth()) {
            return;
        }
        ;
        this.monsterAttack();
    }
    playerSpecialHeal() {
        this.powerCharges -= 3;
        if (this.powerCharges < 3) {
            specialAttackBtn.classList.replace('specialAttackButtonActive', 'specialAttackButton');
            specialHealBtn.classList.replace('specialHealBtnActive', 'specialHealBtn');
        }
        this.playerHealth <= 50 ? this.playerHealth += 50 : this.playerHealth = 100;
        this.logs.unshift(`Your desperation fuels your healing magic, restoring 50 health!`);
        this.monsterAttack();
    }
    playerHeal() {
        this.playerHealth <= 90 ? this.playerHealth += 10 : this.playerHealth = 100;
        this.logs.unshift(`You heal yourself for 10 health!`);
        this.monsterAttack();
        this.powerCharges += 1;
    }
    abandon() {
        this.powerCharges = 0;
        this.killCharges = 0;
        alert("You flee!");
        this.restartGame();
    }
    checkEnemyHealth() {
        if (this.monsterHealth <= 0) {
            alert(`You have slain the monster!`);
            this.monsterHealth = 0;
            this.updateHealthDisplay();
            this.returnToMain();
            return true;
        }
    }
    checkPlayerHealth() {
        if (this.playerHealth <= 0) {
            alert(`The monster has slain you!`);
            this.restartGame();
        }
        this.checkPower();
    }
    checkPower() {
        powerChargeDisplay.innerText = `Power charges for special actions: ${this.powerCharges}`;
        if (this.powerCharges >= 3) {
            specialAttackBtn.classList.replace('specialAttackButton', 'specialAttackButtonActive');
            specialHealBtn.classList.replace('specialHealBtn', 'specialHealBtnActive');
        }
    }
    updateHealthDisplay() {
        displayPlayerHealth.innerText = `Your health: ${this.playerHealth}`;
        displayMonsterHealth.innerText = `Monster's health: ${this.monsterHealth}`;
        playerHealthBar.style.background = `linear-gradient(to right, rgb(98, 18, 163) ${this.playerHealth}%, black ${this.playerHealth + 0.1}%) `;
        monsterHealthBar.style.background = `linear-gradient(to left, rgb(204, 25, 64) ${this.monsterHealth}%, black ${this.monsterHealth - 0.1}%)`;
    }
    updateLog() {
        logSpace.innerHTML = '';
        if (this.logs.length > 20) {
            this.logs.length = 20;
        }
        ;
        for (let n of this.logs) {
            let logPart = document.createElement('p');
            logPart.innerText = n;
            if (n[0] === "Y") {
                logPart.style.color = "rgb(98, 18, 163)";
                logPart.style.marginBottom = "2vh";
            }
            else {
                logPart.style.color = "rgb(204, 25, 64)";
            }
            logSpace.append(logPart);
        }
    }
    setDifficultyEasy() {
        this.monsterHealth = 100;
        this.monsterMinPotency = 3;
        this.monsterMaxPotency = 5;
        easySelector.classList.replace("monsterButton", "deadMonster");
        this.startGame();
    }
    setDifficultyMid() {
        this.monsterHealth = 100;
        this.monsterMinPotency = 5;
        this.monsterMaxPotency = 10;
        mediumSelector.classList.replace("monsterButton", "deadMonster");
        this.startGame();
    }
    setDifficultyHard() {
        this.monsterHealth = 100;
        this.monsterMinPotency = 10;
        this.monsterMaxPotency = 15;
        hardSelector.classList.replace("monsterButton", "deadMonster");
        this.startGame();
    }
    setBoss() {
        this.monsterMinPotency = 8;
        this.monsterMaxPotency = 10;
        this.monsterHealth = 500;
        displayMonsterHealth.innerText = `Monster's health: ${this.monsterHealth}`;
        this.startGame();
    }
    startGame() {
        this.powerCharges = 0;
        this.checkPower();
        this.updateHealthDisplay();
        startScreen.style.display = "none";
        gamePad.style.display = "inline";
        logSpace.innerHTML = '';
    }
    returnToMain() {
        this.logs = [];
        specialAttackBtn.classList.replace('specialAttackButtonActive', 'specialAttackButton');
        specialHealBtn.classList.replace('specialHealBtnActive', 'specialHealBtn');
        this.updateHealthDisplay();
        startScreen.style.display = "inline";
        gamePad.style.display = "none";
        this.killCharges += 1;
        if (this.killCharges === 3) {
            overlord.classList.replace('overlord', 'overlordReady');
        }
    }
    restartGame() {
        this.killCharges = 0;
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.updateHealthDisplay();
        startScreen.style.display = "inline";
        gamePad.style.display = "none";
        this.resetStyle();
        return true;
    }
    resetStyle() {
        hardSelector.classList.replace("deadMonster", "monsterButton");
        mediumSelector.classList.replace("deadMonster", "monsterButton");
        easySelector.classList.replace("deadMonster", "monsterButton");
        overlord.classList.replace('overlordReady', 'overlord');
    }
}
let game = new Arena;
attackBtn.addEventListener('click', () => game.playerAttack());
specialAttackBtn.addEventListener('click', () => game.playerSpecialAttack());
healBtn.addEventListener('click', () => game.playerHeal());
specialHealBtn.addEventListener('click', () => game.playerSpecialHeal());
abandonBtn.addEventListener('click', () => game.abandon());
gamePad.style.display = 'none';
easySelector.addEventListener('click', () => game.setDifficultyEasy());
mediumSelector.addEventListener('click', () => game.setDifficultyMid());
hardSelector.addEventListener('click', () => game.setDifficultyHard());
overlord.addEventListener('click', () => game.setBoss());
