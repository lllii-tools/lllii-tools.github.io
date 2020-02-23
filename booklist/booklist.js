let header = document.querySelector('header');
let idBooklist = document.querySelector('#booklist');
var requestURL = 'https://lllii-tools.github.io/booklist/booklist.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    var myBooks = request.response;
    //populateHeader(superBooks);
    showBooks(myBooks);
};
/*
// ヘッダへの値のセット
function populateHeader(jsonObj) {
  var myH1 = document.createElement('h1');
  myH1.textContent = jsonObj['squadName'];
  header.appendChild(myH1);

  var myPara = document.createElement('p');
  myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
  header.appendChild(myPara);
}
*/
// 表示
function showBooks(jsonObj) {
    var books = jsonObj['books'];
    // 各本棚
    const filteredAll = books;
    const filteredA1R = books.filter(function (x) {
        return x.shelf == 'A1R';
    });
    const filteredA3L = books.filter(function (x) {
        return x.shelf == 'A3L';
    });
    const filteredA4L = books.filter(function (x) {
        return x.shelf == 'A4L';
    });
    const filteredB1L = books.filter(function (x) {
        return x.shelf == 'B1L';
    });
    const filteredB1R = books.filter(function (x) {
        return x.shelf == 'B1R';
    });
    const filteredD0 = books.filter(function (x) {
        return x.shelf == 'D0';
    });
    const filteredD1 = books.filter(function (x) {
        return x.shelf == 'D1';
    });
    function booklist(array) {
        for (let i = 0; i < array.length; i++) {
            var myBook = document.createElement('div');
            var myH2 = document.createElement('h2');
            var myAuthor = document.createElement('ul');
            var myPara2 = document.createElement('p');
            var myPara3 = document.createElement('p');
            var myCategory = document.createElement('ul');
            // 1)で生成した要素にclass付与
            myBook.setAttribute('class', 'bookInfo');
            myH2.setAttribute('class', 'bookTitle');
            myH2.textContent = array[i].title;
            myAuthor.setAttribute('class', 'bookAuthor');
            myPara2.setAttribute('class', 'bookDescription');
            myPara2.textContent = array[i].description;
            myPara3.setAttribute('class', 'bookShelf');
            myPara3.textContent = array[i].shelf;
            myCategory.setAttribute('class', 'bookCategory');
            var authors = array[i].author;
            for (let i = 0; i < authors.length; i++) {
                var listItem = document.createElement('li');
                listItem.textContent = authors[i];
                myAuthor.appendChild(listItem);
            }
            var categories = array[i].category;
            for (let i = 0; i < categories.length; i++) {
                var listItem = document.createElement('li');
                listItem.textContent = categories[i];
                myCategory.appendChild(listItem);
            }
            myBook.appendChild(myH2);
            myBook.appendChild(myAuthor);
            myBook.appendChild(myCategory);
            myBook.appendChild(myPara2);
            myBook.appendChild(myPara3);
            idBooklist.appendChild(myBook);
        }
        // 総数表示
        //const h1 = document.querySelector('h1');
        //const bookTotal = document.createElement('span')
        //bookTotal.textContent = ' (' + array.length + ')';
        //h1.appendChild(bookTotal);
    }
    // 初期表示
    booklist(books);
    // サイドバー
    const shelfAll = document.getElementById('shelfAll');
    const shelfA1R = document.getElementById('shelfA1R');
    const shelfA4L = document.getElementById('shelfA4L');
    const shelfB1L = document.getElementById('shelfB1L');
    const shelfB1R = document.getElementById('shelfB1R');
    const shelfD0 = document.getElementById('shelfD0');
    const shelfD1 = document.getElementById('shelfD1');
    //const shelf = document.getElementById('shelf');
    function listClear() {
        while (idBooklist.firstChild)
            idBooklist.removeChild(idBooklist.firstChild);
    }
    new Promise(function (resolve) {
        resolve();
    }).then(function () {
        function fnShelfAll() {
            listClear();
            booklist(filteredAll);
            window.scroll(0, 0);
        }
        shelfAll.addEventListener('click', fnShelfAll);
    });
    new Promise(function (resolve) {
        resolve();
    }).then(function () {
        function fnShelfA1R() {
            listClear();
            booklist(filteredA1R);
            window.scroll(0, 0);
        }
        shelfA1R.addEventListener('click', fnShelfA1R);
    });
    new Promise(function (resolve) {
        resolve();
    }).then(function () {
        function fnShelfA4L() {
            listClear();
            booklist(filteredA4L);
            window.scroll(0, 0);
        }
        shelfA4L.addEventListener('click', fnShelfA4L);
    });
    new Promise(function (resolve) {
        resolve();
    }).then(function () {
        function fnShelfB1L() {
            listClear();
            booklist(filteredB1L);
            window.scroll(0, 0);
        }
        shelfB1L.addEventListener('click', fnShelfB1L);
    });
    new Promise(function (resolve) {
        resolve();
    }).then(function () {
        function fnShelfB1R() {
            listClear();
            booklist(filteredB1R);
            window.scroll(0, 0);
        }
        shelfB1R.addEventListener('click', fnShelfB1R);
    });
    new Promise(function (resolve) {
        resolve();
    }).then(function () {
        function fnShelfD0() {
            listClear();
            booklist(filteredD0);
            window.scroll(0, 0);
        }
        shelfD0.addEventListener('click', fnShelfD0);
    });
    new Promise(function (resolve) {
        resolve();
    }).then(function () {
        function fnShelfD1() {
            listClear();
            booklist(filteredD1);
            window.scroll(0, 0);
        }
        shelfD1.addEventListener('click', fnShelfD1);
    });
    /*
    new Promise(function(resolve) {
      resolve();
    }).then(function(){
      function fnShelf(){
        listClear()
        booklist(filtered)
      }
      shelfA1R.addEventListener('click', fnShelf)
    })
    */
}
