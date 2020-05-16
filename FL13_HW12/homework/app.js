const root = document.getElementById('root');
let div1 = document.createElement('div');
let div2 = document.createElement('div');
let ul = document.createElement('ul');
let booksArr = [];

function createUI() {
    root.append(div1, div2);
    div1.className = 'left';
    div1.appendChild(ul);
    div2.className = 'right';
    let button = document.createElement('button');
    button.className = 'buttonAdd';
    button.innerHTML = 'Add';
    div1.appendChild(button);

    let clickEvent = document.getElementsByClassName('buttonAdd');

    clickEvent[0].onclick = function () {
        showForm(true);
    }
    getBooks();
    createForm();
    hideRightContent();
    showCreateUIAccordingToURL();
    window.addEventListener('hashchange', function () {
        hideRightContent();
        showCreateUIAccordingToURL();
    });
}

function getBooks() {
    booksArr = JSON.parse(localStorage.getItem('books'));
    ul.innerHTML = '';
    for (let item of booksArr) {
        displayBookInList(item);
    }
}

createUI();

function findBook(id) {
    let currentBook;
    for (let item of booksArr) {
        if (item['id'] === id) {
            currentBook = item;
            return currentBook;
        }
    }
}

function createPreview(id) {
    hideRightContent();

    let currentBook = findBook(id);
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let divImg = document.createElement('div');
    let p1 = document.createElement('p');
    divImg.className = 'img';
    h3.innerHTML = `${currentBook['title']}`;
    p.innerHTML = `${currentBook['author']}`;
    divImg.style.backgroundImage = `url(${currentBook['image']})`;
    p1.innerHTML = `${currentBook['plot']}`;
    h3.classList.add('rightContent');
    div2.append(h3, p, divImg, p1);
    h3.style.display = 'block';
    document.location.hash = `#preview`;
    document.location.search = `?id=${id}`;
}

function createForm() {
    let form = document.createElement('form');
    form.classList.add('rightContent');
    form.innerHTML = `<label>Book name<br><input class='bookName field' type="text"` +
        `onclick='classList.remove("invalidInput")' required> </label><br>` +
        `<label>Author<br><input class='author field' type="text"></label><br>` +
        `<label>Image<br><input class='image field' type="text"></label><br>` +
        `<label>Plot<br><textarea class='plot field' type="text" rows="3"></textarea></label><br>` +
        `<input value="Save" type="button" class='saveBtn'>` +
        `<input value="Cancel" type="button" class='cancel'>`
    div2.append(form);
}

function showForm(isNewBook, id) {
    hideRightContent();
    let onClickFunc = isNewBook ? addNewBook : function () { 
        saveBookEdits(id);
    };
    let saveBtn = document.getElementsByClassName('saveBtn');
    let cancel = document.getElementsByClassName('cancel');
    cancel[0].onclick = function () {
        if (confirm('Discard changes?')) {
            window.history.back();
        } else {
            return;
        }
    };
    saveBtn[0].onclick = onClickFunc;
    let form = document.getElementsByTagName('form')[0];
    if (!isNewBook && id) {
        document.location.hash = `#edit`;
        document.location.search = `?id=${id}`;
        let currentBook = findBook(id);
        document.getElementsByClassName('bookName')[0].value = currentBook['title'];
        document.getElementsByClassName('author')[0].value = currentBook['author'];
        document.getElementsByClassName('image')[0].value = currentBook['image'];
        document.getElementsByClassName('plot')[0].value = currentBook['plot'];
    } else {
        document.location.hash = `#add`;
        document.location.href = 'index.html#add';
        document.getElementsByClassName('bookName')[0].value = '';
        document.getElementsByClassName('author')[0].value = '';
        document.getElementsByClassName('image')[0].value = '';
        document.getElementsByClassName('plot')[0].value = '';
    }
    form.style.display = 'block';
}

function hideRightContent() {
    let list = div2.children;
    for (let contentItem of list) {
        contentItem.style.display = 'none';
    }
}

function addNewBook() {
    let fields = document.querySelectorAll('.field');
    for (let i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
            fields[i].classList.toggle('invalidInput');
            alert('field is blank')
            return;
        }
    }

    let bookName = document.getElementsByClassName('bookName')[0].value;
    let author = document.getElementsByClassName('author')[0].value;
    let image = document.getElementsByClassName('image')[0].value;
    let plot = document.getElementsByClassName('plot')[0].value;
    let newId = 1 + Number(booksArr[booksArr.length - 1]['id']);
    let newBook = {
        'title': bookName,
        'author': author,
        'image': image,
        'plot': plot,
        'id': newId
    };

    displayBookInList(newBook);
    booksArr.push(newBook);
    localStorage.setItem('books', JSON.stringify(booksArr));
    createPreview(newId);
}

function saveBookEdits(id) {
    let currentBook = findBook(id);
    currentBook['title'] = document.getElementsByClassName('bookName')[0].value;
    currentBook['author'] = document.getElementsByClassName('author')[0].value;
    currentBook['image'] = document.getElementsByClassName('image')[0].value;
    currentBook['plot'] = document.getElementsByClassName('plot')[0].value;
    localStorage.setItem('books', JSON.stringify(booksArr));
    getBooks();
    createPreview(id);
    setTimeout(function () { 
        alert("Book successfully updated"); 
    }, 300);
}

function displayBookInList(book) {
    let li = document.createElement('li');
    let editBtn = document.createElement('button');
    ul.appendChild(li);
    li.innerHTML = book['title'];
    editBtn.className = 'edit';
    editBtn.innerHTML = 'Edit';
    li.append(editBtn);
    li.addEventListener('click', function () {
        createPreview(book['id']);
    });
    editBtn.addEventListener('click', function () {
        event.stopPropagation();
        showForm(false, book['id']);
    });
}

function showCreateUIAccordingToURL() {
    if (location.hash.includes('add')) {
        showForm(true);
    } else if (location.search && !findBook(Number(location.search.split('=')[1]))) {
        if (location.search || location.href) {
            location.href = 'index.html';
        }
    } else if (location.hash.includes('preview')) {
        let id = Number(location.search.split('=')[1]);
        createPreview(id);
    } else if (location.hash.includes('edit')) {
        let id = Number(location.search.split('=')[1]);
        showForm(false, id);
    }
}