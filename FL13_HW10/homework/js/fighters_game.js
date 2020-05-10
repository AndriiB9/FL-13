class Fighter {
    constructor(obj) {
        let name;
        Object.defineProperty(this, 'name', {
            configurable: false,
            writable: false
        });

        Object.defineProperty(this, 'damage', {
            value: obj.damage,
            configurable: false,
            writable: false
        });
        
        Object.defineProperty(this, 'hp', {
            value: obj.hp,
            configurable: false,
            writable: true
        });

        Object.defineProperty(this, 'strength', {
            value: obj.strength,
            configurable: false,
            writable: false
        });

        Object.defineProperty(this, 'agility', {
            value: obj.agility,
            configurable: false,
            writable: false
        });

        Object.defineProperty(this, 'wins', {
            value: 0,
            configurable: false,
            writable: true
        });

        Object.defineProperty(this, 'losses', {
            value: 0,
            configurable: false,
            writable: true
        });

        name = obj.name;

        this.getName = function() {
            return name;
        }
    }

    getDamage() {
        return this.damage;
    }
    getStrength() {
        return this.strength;
    }
    getAgility() {
        return this.agility;
    }
    getHealth() {
        return this.hp;
    }
    attack(defender) {
        let randomCalc = Math.random() * 100;
        if (randomCalc > defender.getAgility() + defender.getStrength()) {
            console.log(`${this.getName()} makes ${this.damage} damage to ${defender.getName()}`);
            defender.dealDamage(this.damage);
        } else {
            console.log(`${this.getName()} attack missed`);
        }
    }
    logCombatHistory() {
        console.log(`name: ${this.getName()}, wins: ${this.wins}, losses: ${this.losses}`);
    }
    heal(points) {
        this.hp += points;
    }
    dealDamage(points) {
        this.hp -= points;
        if (this.hp < 0) {
            this.hp = 0;
        }
    }
    addWin() {
        this.wins++;
    }
    addLoss() {
        this.losses++;
    }
}

function battle(fighter, fighter2) {
    if (fighter.getHealth() === 0 || fighter2.getHealth() === 0) {
        let name = fighter.getHealth() === 0 ? fighter.getName() : fighter2.getName();
        console.log(`${name} is dead and can\`t fight`);
        return;
    } else {
        while (fighter.getHealth() !== 0 && fighter2.getHealth() !== 0) {
            fighter.attack(fighter2);
            fighter2.attack(fighter);
        }
        let winner = fighter.getHealth() === 0 ? fighter2 : fighter;
        let losser = fighter.getHealth() === 0 ? fighter : fighter2;
        console.log(`${winner.getName()} has won!`);
        winner.addWin();
        losser.addLoss();
    }
}

let fighter = new Fighter({ name: 'Maximus', damage: 25, hp: 100, strength: 30, agility: 25 });
let fighter2 = new Fighter({ name: 'Commodus', damage: 20, hp: 90, strength: 25, agility: 20 });
battle(fighter2, fighter);
