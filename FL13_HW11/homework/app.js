const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');
createTree(rootNode, data);

function createTree(container, obj) {
  container.append(createTreeDom(obj));
}
function createTreeDom(obj) {
  if (!obj) { 
    return; 
  }
  let ul = document.createElement('ul');
  for (let item of obj) {
    let li = document.createElement('li');
    li.innerHTML = item['title'];
    li.className = item['folder'] ? 'folder' : 'file';
    if (li.className === 'folder') {
      li.insertAdjacentHTML('afterbegin', '<span class="material-icons">folder_open</span>');
      if (!item['children']) {
        let ul = document.createElement('ul');
        let liEmpty = document.createElement('li');
        liEmpty.innerHTML = 'Folder is empty';
        ul.append(liEmpty);
        li.append(ul);
      }
    } else if (li.className === 'file') {
      li.insertAdjacentHTML('afterbegin', '<span class="material-icons">insert_drive_file</span>');
    }
    let childrenUl = createTreeDom(item['children']);
    if (childrenUl) {
      li.append(childrenUl);
    }
    ul.append(li);
  }

  return ul;
}
let folderArr = document.getElementsByClassName('folder');
for (let folder of folderArr) {
  folder.onclick = function () {
    let subList = folder.getElementsByTagName('ul');
    subList[0].style.display = subList[0].style.display === 'none' ? 'block' : 'none';
    event.stopPropagation();
  }
}

let contextMenu = document.createElement('div');
contextMenu.className = 'contextMenu';
contextMenu.innerHTML = '<ul><li class="menu-option">Rename</li><li class="menu-option-delete">Delete item</li>';
rootNode.append(contextMenu);
let liArr = document.getElementsByTagName('li');
for (let li of liArr) {
  li.oncontextmenu = function () {
    event.preventDefault();
    contextMenu.style.display = 'block';
    let del = document.getElementsByClassName('menu-option-delete');
    del[0].onclick = function () {
      li.remove();
    }
    let rename = document.getElementsByClassName('menu-option');
    rename[0].onclick = function () {
      li.contentEditable = true;
      let range = new Range();
      range.setStart(li, 1);
      range.setEnd(li, 2);
      document.getSelection().addRange(range);
    }
  }
}