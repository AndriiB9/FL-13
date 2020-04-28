let checkLogin = prompt('Please enter your login');
let checkPass;
let password = {
    'User' : 'UserPass', 
    'Admin' : 'RootPass'
}

if (!checkLogin) {
    alert('Canceled')
} else if (checkLogin.length < 4) {
    alert("I don't know any users having name length less than 4 symbols")
} else if (password[checkLogin]) {
    checkPass = prompt('Please enter your password');
    if (!checkPass) {
        alert('Canceled')
    } else if (checkPass === password[checkLogin]) {
        if (new Date().getHours() >= 20) {
            alert(`Good evening, dear ${checkLogin}!`)
        } else {
            alert(`Good day, dear ${checkLogin}!`)
        }
    } else {
        alert('Wrong password')
    }
} else {
    alert('I don`t know you')
}