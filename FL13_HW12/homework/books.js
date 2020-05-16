const books = [
    {
    'title': 'JavaScript | The definitive guide',
    'author': 'David Flenegan',
    'image': 'https://hackr.io/blog/uploads/images/1570190914bjDgwA0nFR.jpg',
    'plot': 'Explore a preview version of JavaScript: The Definitive Guide, 7th Edition right now.',
    'id' : 1
},
{
    'title': 'A Smarter Way to Learn JavaScript',
    'author': 'Mark Myers',
    'image': 'https://images-na.ssl-images-amazon.com/images/I/512KPmZIG7L._SX348_BO1,204,203,200_.jpg',
    'plot': 'Learning JavaScript is hell because of two problems.I remove the problems, and you start having fun.',
    'id' : 2
},
{
    'title': 'Eloquent JavaScript',
    'author': 'Marjin Haverbeke',
    'image': 'https://hackr.io/blog/uploads/images/1570190914aIEpTrZrwj.jpg',
    'plot': 'Probably the biggest standout of Eloquent JavaScript: A Modern Introduction to Programming is its heavy usage of practice exercises. Unlike other books on programming and JS, this book is a work of pure art.',
    'id' : 3
}
]
if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify(books));
}


