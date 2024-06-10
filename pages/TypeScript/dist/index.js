"use strict";
const gameInterface = document.querySelector(".gameInterface");
const startBtn = document.querySelector('.startButton');
const gamePad = document.querySelector('.gamePad');
const attackBtn = document.querySelector(".attackButton");
const specialAttackBtn = document.querySelector(".specialAttackButton");
const healBtn = document.querySelector(".healButton");
const abandonBtn = document.querySelector(".abandonButton");
const displayPlayerHealth = document.querySelector(".playerHealth");
const displayMonsterHealth = document.querySelector(".ghoulHealth");
const healthZone = document.querySelector(".healthZone");
const playerHealthBar = healthZone.querySelector('div:first-child');
const monsterHealthBar = healthZone.querySelector('div:last-child');
let logSpace = document.querySelector('.logs');
class Arena {
    constructor() {
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.logs = [];
    }
    defineDamage(min, max) {
        return Math.floor((Math.random() * max) + min);
    }
    monsterAttack() {
        let monsterPotency = this.defineDamage(5, 10);
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
    }
    playerSpecialAttack() {
        let playerPotency = this.defineDamage(10, 20);
        this.monsterHealth -= playerPotency;
        this.logs.unshift(`You attack the monster with all your might, causing ${playerPotency} damage!`);
        if (this.checkEnemyHealth()) {
            return;
        }
        ;
        this.monsterAttack();
    }
    playerHeal() {
        this.playerHealth += 10;
        this.logs.unshift(`You heal yourself for 10 health!`);
        this.monsterAttack();
    }
    abandon() {
        alert("You flee!");
        this.restartGame();
    }
    checkEnemyHealth() {
        if (this.monsterHealth <= 0) {
            alert(`You have slain the monster!`);
            this.restartGame();
            return true;
        }
    }
    checkPlayerHealth() {
        if (this.playerHealth <= 0) {
            alert(`The monster has slain you!`);
            this.restartGame();
        }
    }
    updateHealthDisplay() {
        displayPlayerHealth.innerText = `Your health: ${this.playerHealth}`;
        displayMonsterHealth.innerText = `Monster's health: ${this.monsterHealth}`;
        playerHealthBar.style.background = `linear-gradient(to right, rgb(55, 0, 255) ${this.playerHealth}%, black ${this.playerHealth + 0.1}%) `;
        monsterHealthBar.style.background = `linear-gradient(to left, rgb(255, 0, 55) ${this.monsterHealth}%, black ${this.monsterHealth - 0.1}%)`;
    }
    updateLog() {
        logSpace.innerHTML = '';
        for (let n of this.logs) {
            let logPart = document.createElement('p');
            logPart.innerText = n;
            if (n[0] === "Y") {
                logPart.style.color = "blue";
                logPart.style.marginBottom = "2vh";
            }
            else {
                logPart.style.color = "red";
            }
            logSpace.append(logPart);
        }
    }
    startGame() {
        startBtn.style.display = "none";
        gamePad.style.display = "inline";
    }
    restartGame() {
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.updateHealthDisplay();
        startBtn.style.display = "inline";
        gamePad.style.display = "none";
        return true;
    }
}
let game = new Arena;
attackBtn.addEventListener("click", () => game.playerAttack());
specialAttackBtn.addEventListener("click", () => game.playerSpecialAttack());
healBtn.addEventListener("click", () => game.playerHeal());
abandonBtn.addEventListener("click", () => game.abandon());
gamePad.style.display = 'none';
startBtn.addEventListener("click", () => game.startGame());
