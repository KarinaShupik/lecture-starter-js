import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    const fighterHealth = [firstFighter.health, secondFighter.health];
    const pressedKeys = new Set(); // Using Set for efficient membership checks
    let lastPlayerOneCriticalHitTime = 0;
    let lastPlayerTwoCriticalHitTime = 0;

    const checkCriticalHit = (fighter, combination, lastCriticalHitTime) => {
        const currentTime = Date.now();
        if (currentTime - lastCriticalHitTime < 10000) return false;

        const combinationSet = new Set(combination);
        for (const key of combinationSet) {
            if (!pressedKeys.has(key)) return false;
        }
        fighter.health -= fighter.attack * 2;
        return true;
    };

    return new Promise(resolve => {
        document.addEventListener('keydown', event => {
            pressedKeys.add(event.code);

            if (checkCriticalHit(secondFighter, controls.PlayerOneCriticalHitCombination, lastPlayerOneCriticalHitTime)) {
                lastPlayerOneCriticalHitTime = Date.now();
                pressedKeys.clear(); // Clear all pressed keys after a successful combo
            } else if (checkCriticalHit(firstFighter, controls.PlayerTwoCriticalHitCombination, lastPlayerTwoCriticalHitTime)) {
                lastPlayerTwoCriticalHitTime = Date.now();
                pressedKeys.clear(); // Clear all pressed keys after a successful combo
            } else {
                // Handle regular attacks and blocks
                switch (event.code) {
                    case controls.PlayerOneAttack:
                        secondFighter.health -= getDamage(firstFighter, secondFighter);
                        break;
                    case controls.PlayerTwoAttack:
                        firstFighter.health -= getDamage(secondFighter, firstFighter);
                        break;
                    case controls.PlayerOneBlock:
                        // Handle Player One Block
                        break;
                    case controls.PlayerTwoBlock:
                        // Handle Player Two Block
                        break;
                }
            }

            // Update health indicators
            document.getElementById('right-fighter-indicator').style.width =
                (secondFighter.health * 100.0) / fighterHealth[1] + '%';
            document.getElementById('left-fighter-indicator').style.width =
                (firstFighter.health * 100.0) / fighterHealth[0] + '%';

            // Resolve the promise with the winner when fight is over
            if (firstFighter.health <= 0) {
                resolve(secondFighter);
            }
            if (secondFighter.health <= 0) {
                resolve(firstFighter);
            }
        });
    });
}


export function getDamage(attacker, defender) {
    // return damage
    const attackerHitPower = getHitPower(attacker);
    const defenderBlockPower = getBlockPower(defender);

    // Calculate damage based on hit and block powers
    const damage = attackerHitPower - defenderBlockPower; // Ensures damage is non-negative

    return damage;
}

export function getHitPower(fighter) {
    // return hit power
    const attack = fighter.attack; // Assuming 'attack' is a property of the fighter object
    const criticalHitChance = Math.random() + 1; // Random number from 1 to 2

    const power = attack * criticalHitChance;
    return power;
}

export function getBlockPower(fighter) {
    // return block power
    const defense = fighter.defense; // Assuming 'defense' is a property of the fighter object
    const dodgeChance = Math.random() + 1; // Random number from 1 to 2

    const power = defense * dodgeChance;
    return power;
}
