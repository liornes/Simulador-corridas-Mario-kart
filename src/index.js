const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    combatItem: '',
    PONTOS: 0
}

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    combatItem: '',
    PONTOS: 0
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock() {
    let random = Math.random();
    let result;

    switch(true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }

    return result;
}

function getCombatItem(character) {
    let random = Math.random();
    let item;

    random > 0.5 ? item = "Bomba" : item = "Casco";

    return character.combatItem = item;
}

function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

function calcCombatResult(character1, character2, powerResult1, powerResult2) {
    let pontosPosDerrota = 0;

    if (powerResult1 > powerResult2) {
        console.log(`${character1.NOME} venceu o confronto! 🥊👑`);

        pontosPosDerrota = character2.PONTOS;
        
        switch(true) {
            case character1.combatItem === 'Casco':
                pontosPosDerrota--;

                pontosPosDerrota > 0 ? character2.PONTOS-- : console.log(`${character2.NOME} não tem mais pontos para perder`);
                break;
            case character1.combatItem === 'Bomba':
                pontosPosDerrota -= 2;

                if(pontosPosDerrota === 1 ) {
                    character2.PONTOS -= 0;
                } else if (pontosPosDerrota > 1 ) {
                    character2.PONTOS -= 2;
                } else {
                    console.log(`${character2.NOME} não tem mais pontos para perder`);
                }
                break;
        }
    } else if (powerResult2 > powerResult1) {
        console.log(`${character2.NOME} venceu o confronto! 🥊👑`);
        
        pontosPosDerrota = character1.PONTOS;

        switch(true) {
            case character2.combatItem === 'Casco':
                pontosPosDerrota--;
                
                pontosPosDerrota > 0 ? character1.PONTOS-- : console.log(`${character1.NOME} não tem mais pontos para perder`);
                break;

            case character2.combatItem === 'Bomba':
                pontosPosDerrota -= 2

                if(pontosPosDerrota === 1) {
                    character1.PONTOS = 0;
                } else if (pontosPosDerrota > 1) {
                    character1.PONTOS -= 2;
                } else {
                    console.log(`${character1.NOME} não tem mais pontos para perder`);
                }
                break;
        }
    } else {
        console.log("Confronto empatado! Nenhum ponto foi perdido");
    }
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        let block = getRandomBlock();
        console.log(`Bloco: ${block}`);

        // rolar os dados
        let diceResult1 = rollDice();
        let diceResult2 = rollDice();

        // teste de habilitade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }

        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }

        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            getCombatItem(character1);
            getCombatItem(character2);

            console.log(`${character1.NOME} confrontou com ${character2.NOME} ! 🥊🥊`);

            console.log(`${character1.NOME} pegou o item de poder: ${character1.combatItem}`);
            logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            
            console.log('\n');

            console.log(`${character2.NOME} pegou o item de poder: ${character2.combatItem}`);
            logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            calcCombatResult(character1, character2, powerResult1, powerResult2);
        }

        if(totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }

        console.log(`Placar atual: ${character1.NOME} - ${character1.PONTOS} pontos / ${character2.NOME} - ${character2.PONTOS} pontos`);

        console.log("____________________________________");
    }
}

function declareWinner(character1, character2) {
    console.log("Resultado Final: ");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if(character1.PONTOS > character2.PONTOS) {
        console.log(`\n${character1.NOME} venceu a corrida! parabens! 🏆`);
    } else if(character2.PONTOS > character1.PONTOS) {
        console.log(`\n${character2.NOME} venceu a corrida! parabens! 🏆`);
    } else {
        console.log("A corrida terminou em empate");
    }
}

(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);

    await playRaceEngine(player1, player2);
    declareWinner(player1, player2);
})();