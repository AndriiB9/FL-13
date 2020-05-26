let assign = function(target, ...sources) {
    for(let i = 0; i < sources.length; i++) {
    for (let key in sources[i]) {
        target[key] = sources[i][key];
        }
    }
    return target;
}

const creditCard = { creditLimit: '50$', cash: '200$' };
const paymentsCard = { cash: '100$' };

const universalCard = assign({}, creditCard, paymentsCard);
console.log(universalCard);