let tipAmount, checkSum;
let checkNumberPromt = window.prompt("What's your check number?");
let tipPercentagePromt = window.prompt("What's your percentage?");
let checkNumber = isNaN(parseFloat(checkNumberPromt)) ? NaN : Number(checkNumberPromt);
let tipPercentage = isNaN(parseFloat(tipPercentagePromt)) ? NaN : Number(tipPercentagePromt);

if (checkNumber >= 0 && !isNaN(checkNumber) && tipPercentage >= 0 && tipPercentage <= 100 && !isNaN(tipPercentage)) {
    tipAmount = checkNumber * tipPercentage / 100;
    checkSum = tipAmount + checkNumber;
    alert('Check number: ' + checkNumber.toFixed(2) + '\n'
    + 'Tip: ' + tipPercentage.toFixed(2) + ' %' + '\n' 
    + 'Tip amount: ' + tipAmount.toFixed(2) + '\n'  
    + 'Total sum to pay: ' + checkSum.toFixed(2));
} else {
    alert('Invalid input data');
} 