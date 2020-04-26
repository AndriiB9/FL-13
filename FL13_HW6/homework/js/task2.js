let inputWord = prompt('Please enter your word');
let isWhiteSpaceOnly = inputWord && inputWord.replace(/ /g, '') === '';

if ( inputWord && inputWord.length % 2 === 0 && inputWord.length > 0 && !isWhiteSpaceOnly){ 
    alert(inputWord.charAt(inputWord.length / 2 - 1) + inputWord.charAt(inputWord.length / 2));
} else if ( inputWord && inputWord.length % 2 !== 0 && !isWhiteSpaceOnly) { 
    alert(inputWord.charAt(inputWord.length / 2));
} else {
    alert('Invalid value');
}
