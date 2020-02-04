console.log('booklist');
let header = document.querySelector('header');
let main = document.querySelector('main');
var requestURL = 'https://lllii-tools.github.io/booklist/booklist.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    var superBooks = request.response;
    //populateHeader(superBooks);
    showBooks(superBooks);
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
    for (let i = 0; i < books.length; i++) {
        var myBook = document.createElement('div');
        var myH2 = document.createElement('h2');
        var myAuthor = document.createElement('ul');
        var myPara2 = document.createElement('p');
        var myPara3 = document.createElement('p');
        var myCategory = document.createElement('ul');
        // 1)で生成した要素にclass付与
        myBook.setAttribute('class', 'bookInfo');
        myH2.setAttribute('class', 'bookTitle');
        myH2.textContent = books[i].title;
        myAuthor.setAttribute('class', 'bookAuthor');
        myPara2.setAttribute('class', 'bookDescription');
        myPara2.textContent = books[i].description;
        myPara3.setAttribute('class', 'bookShelf');
        myPara3.textContent = books[i].shelf;
        myCategory.setAttribute('class', 'bookCategory');
        var authors = books[i].author;
        for (let i = 0; i < authors.length; i++) {
            var listItem = document.createElement('li');
            listItem.textContent = authors[i];
            myAuthor.appendChild(listItem);
        }
        var categories = books[i].category;
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
        main.appendChild(myBook);
    }
    // 総数表示
    const h1 = document.querySelector('h1');
    const bookTotal = document.createElement('span');
    bookTotal.textContent = ' (' + books.length + ')';
    h1.appendChild(bookTotal);
}
