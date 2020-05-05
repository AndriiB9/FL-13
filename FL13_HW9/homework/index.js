function convert(...arg) {
    let arr = [...arg];
    for (let i = 0; i < arr.length; i++) {
        if(typeof arr[i] === 'string') {
           arr[i] = Number(arr[i]);
        } else if(typeof arr[i] === 'number') {
            arr[i] = arr[i].toString();
        }
    }
    return arr;
}

function executeforEach(arr) {
    for (let i = 0; i < arr.length; i++) {
         arr[i] *= 2;
    }
    return arr;
}

function mapArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        if(typeof arr[i] === 'string') {
                arr[i] = Number(arr[i]) + 3;
        } else {
            arr[i] += 3;
        }
    }
        return arr;
}

function filterArray(arr) {
    let arrPair = [];
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] % 2 === 0) {
                   arrPair.push(arr[i]);
            }
        }
            return arrPair;
    }

function containsValue(arr, value) {
    let check = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            check = true;
        }
    }
    return check;
}

function flipOver(str) {
    let strRev = '';
    for (let i = str.length-1; i >= 0; i--) {
        strRev += str[i];
    }
    return strRev;
}

function makeListFromRange(arr) {
    let range = [];

    if (arr[0] > arr[1]) {
    let temp = arr[0];  
    arr[0] = arr[1];  
    arr[1] = temp;
    } else if (arr.length === 1) {
        return arr;
    } 

    for (let i = arr[0]; i <= arr[1]; i++) {
        range.push(i);
    }
    return range;
}

const fruits = [
    {name: 'apple', weight: 0.5},
    {name: 'pineapple', weight: 2}
  ];

function getArrayOfKeys(obj, key) {
    let arrName = [];
    for (let item of obj) {
        arrName.push(item[key]);
    }
    return arrName;
}

function substitute(arr) {
    let arrNew = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 10 && arr[i] < 20) {
            arrNew.push('*');
        } else {
            arrNew.push(arr[i]);
        }
    }
    return arrNew;
}

const date = new Date(2020, 0, 2);
function getPastDay(date,days) {
    let dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() - days);
    return dateCopy.getDate();
}

function formatDate(today) {
    return today.getFullYear() + '/' + (today.getMonth() < 10 ? '0' + (today.getMonth() + 1) : today.getMonth()) + 
    '/' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()) + ' ' + 
    (today.getHours() < 10 ? '0' + today.getHours() : today.getHours()) + 
    ':' + (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())
}