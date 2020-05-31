const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');
createUI();
getUsersList();

function createUI() {
    appContainer.innerHTML = `<input type="text" id="name" placeholder="Name">
    <input type="text" id="userName" placeholder="userName">
    <input type="button" id="ajaxButton" value="Add New User">`;

    document.getElementById("ajaxButton").addEventListener('click', addUser);
}

function createUsersUI(id, name, userName) {
    let users = document.getElementById('users');
    let div = document.createElement('div');
    users.appendChild(div);
    div.innerHTML = `<label id="${id}">${id}</label>
    <input type="text" id="name${id}" value='${name}'>
    <input type="text" id="userName${id}" value='${userName}'>
    <input type="button" id="updatedButton" class="${id}" value="Updated" onclick="updateUser()">
    <input type="button" id="deleteButton" class="${id}" value="Delete" onclick="deleteUser()">`
}

function getUsersList() {
    let users = document.getElementById('users');
    users.innerHTML = '';
    let httpRequest;
    httpRequest = new XMLHttpRequest();
    showLoading();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequest.onreadystatechange = proccessUsersList;
    httpRequest.open('GET', `${baseUrl}/users`);
    httpRequest.send();

    function proccessUsersList() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let userList = httpRequest.responseText;
                for (let item of JSON.parse(userList)) {
                    createUsersUI(item.id, item.name, item.username)
                }
                hideLoading()
            } else {
                alert('There was a problem with the request.');
            }
        }
    }
}

function addUser() {
    let httpRequest = new XMLHttpRequest();
    const name = document.getElementById("name").value;
    const userName = document.getElementById("userName").value;
    const body = { "name": `${name}`, "username": `${userName}` }
    console.log(JSON.stringify(body));
    httpRequest.open('POST', `${baseUrl}/users`);
    httpRequest.responseType = 'json';
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.onload = function () {
        console.log(httpRequest.status);
        if (httpRequest.status >= 400) {
            console.error(httpRequest.response)
        } else {
            console.log(httpRequest.response);
            getUsersList();
        }
    }
    httpRequest.send(JSON.stringify(body));
}

function updateUser() {
    let id = event.target.classList[0];
    let httpRequest = new XMLHttpRequest();
    const name = document.getElementById(`name${id}`).value;
    const userName = document.getElementById(`userName${id}`).value;
    const body = { "name": `${name}`, "username": `${userName}` }
    console.log(JSON.stringify(body));
    httpRequest.open('PUT', `${baseUrl}/users/${id}`);
    httpRequest.responseType = 'json';
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.onload = function () {
        console.log(httpRequest.status);
        if (httpRequest.status >= 400) {
            console.error(httpRequest.response)
        } else {
            console.log(httpRequest.response);
            getUsersList();
        }
    }
    httpRequest.send(JSON.stringify(body));
}

function deleteUser() {
    let id = event.target.classList[0];
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('DELETE', `${baseUrl}/users/${id}`);
    httpRequest.responseType = 'json';
    httpRequest.setRequestHeader('Authorization', 'admin');
    httpRequest.onload = function () {
        console.log(httpRequest.status);
        if (httpRequest.status >= 400) {
            console.error(httpRequest.response)
        } else {
            console.log(httpRequest.response);
            getUsersList();
        }
    }
    httpRequest.send();
}

function showLoading() {
    let processLoading = document.getElementById("loadingLabel");
    processLoading.style.display = 'block';
}
function hideLoading() {
    let processLoading = document.getElementById("loadingLabel");
    processLoading.style.display = 'none';
}