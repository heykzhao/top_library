let test = new Book('test','test',true,null,null);
let test2 = new Book('tesst','test',false,null,null);

// let myLibrary = [];
let myLibrary = [test,test2];
let readNotReadButton = document.querySelectorAll('.read-not-read');

function Book(title, author, read, rating, comment) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.rating = rating;
};

const newBookForm = document.querySelector('.new-book-form');
const newBookSubmitButton = document.querySelector('.submit-button');
newBookSubmitButton.addEventListener('click', addBookFromSubmitButton)
function addBookFromSubmitButton(e) {
    e.preventDefault();
    const bookTitle = document.getElementById('bookTitle').value;
    const bookAuthor = document.getElementById('bookAuthor').value;
    const bookRead = document.getElementById('bookRead').checked;
    let newBook = new Book(bookTitle,bookAuthor,bookRead,null,null);

    if ((bookTitle == '') || (bookAuthor == '')) {
        alert('You must have a book title and author to create an entry!');
    } else {
        if ((myLibrary.some(e => (e.title == newBook.title) && (e.author == newBook.author)))) {
            alert('It looks like this book is already in your library!');
            newBookForm.reset();
            return;
        } else {
            myLibrary.push(newBook);
            displayLibrary();
            displayStarRating();
            newBookForm.reset();
            newBookModal.style.display = "none";
        }
    }
}

// Display Library based on what's in myLibrary object
let libraryDiv = document.querySelector('.library');
function displayLibrary() {
    removeAllChildNodes(libraryDiv);
    for (let i = 0; i < myLibrary.length; i++) {
        let div = document.createElement('div');
        div.setAttribute('class', 'book-card');
        div.innerHTML = `
        <div class="book" id="${i}">
            <div class="read-not-read ${myLibrary[i].read} noselect">✓</div>
            <p class='book-title'>${myLibrary[i].title}</p>
            <p class='book-author'>${myLibrary[i].author}</p>
        </div>
        <div class="bottom-of-card">
            <div class="extra-options noselect">• • •</div>
        </div>
        `;
        libraryDiv.appendChild(div);
    }
    readNotReadButton = document.querySelectorAll('.read-not-read');
    readNotReadButton.forEach((btn) => {
        btn.addEventListener('click',readNotRead);
    })
}
displayLibrary();

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Display Star Ratings option whenever a book is read
let bottomOfCardDiv = document.querySelectorAll('.bottom-of-card');
function displayStarRating() {
    let bottomOfCardDiv = document.querySelectorAll('.bottom-of-card');
    for (let i = 0; i < bottomOfCardDiv.length; i++) {
        let div = document.createElement('div');
        let childNodes = bottomOfCardDiv[i].children;
        div.setAttribute('class', 'ratings noselect');
        div.innerHTML = `
            <i class="rating-star inactive-star noselect">★</i>
            <i class="rating-star inactive-star noselect">★</i>
            <i class="rating-star inactive-star noselect">★</i>
            <i class="rating-star inactive-star noselect">★</i>
            <i class="rating-star inactive-star noselect">★</i>
            `;

        if (myLibrary[i].read === true && childNodes[0].classList.contains('ratings') === false) {
            bottomOfCardDiv[i].insertBefore(div, bottomOfCardDiv[i].firstChild);
        } 
        if (myLibrary[i].read === false && childNodes[0].classList.contains('ratings') === true) {
            bottomOfCardDiv[i].removeChild(childNodes[0]);
        }
    };
};
displayStarRating();

// Open and closing a new book modal
const newBookModal = document.querySelector('.new-book-modal');
const newBookButton = document.querySelector('.new-book-button');
const closeButton = document.querySelector('.modal-close-button');

newBookButton.onclick = function() {
    newBookModal.style.display = "block";
}
closeButton.onclick = function() {
    newBookModal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == newBookModal) {
        newBookModal.style.display = "none";
    }
}

// Read or not read button
function readNotRead(e) {
    if (e.target.classList.contains('true')) {
        e.target.classList.remove('true');
        myLibrary[e.target.parentNode.id].read = false;
        displayStarRating();
    } else {
        e.target.classList.add('true');
        myLibrary[e.target.parentNode.id].read = true;
        displayStarRating();
    }
}