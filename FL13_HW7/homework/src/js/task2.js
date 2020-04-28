let checkNum;
let prizes = [100, 50, 25];
let attempt = 0;
let totalPrize = 0;
let wantContinue = true;
let counter = 1;

let startGame = confirm('Do you want to play a game?');

if (!startGame) {
    alert('You did not become a billionaire, but can');
} else {
    while (wantContinue) {
        let maxRange = 5 * counter;
        let randomNum = (Math.random() * maxRange).toFixed(0);
        for (attempt = 0; attempt < 3; attempt++) {
            checkNum = prompt(
                `Choose a roulette pocket number from 0 to ${maxRange}\n` +
                `Attempts left: ${3 - attempt}\nTotal prize: ${totalPrize} $\n` +
                `Possible prize on current attempt: ${prizes[attempt]} $`
            )
            if (!checkNum) {
                alert(`Thank you for your participation. Your prize is: 0 $`);
                wantContinue = confirm('Do you want to play again?');
                break
            } else if (checkNum === randomNum) {
                totalPrize += prizes[attempt];
                wantContinue = confirm(`Congratulation, you won! Your prize is: ${totalPrize} $.` +
                    ` Do you want to continue?`);
                for (let i = 0; i < prizes.length; i++) {
                    prizes[i] *= 2;
                }
                ++counter;
                break;
            } else if (attempt === 2) {
                alert(`Thank you for your participation. Your prize is: ${totalPrize} $`);
                wantContinue = confirm('Do you want to play again?');
            }
        }
    }
}