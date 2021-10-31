let sampleBook1 = new Book('Bad Blood', 'John Carreyrou', true, '4');
let sampleBook2 = new Book('An Ugly Truth', 'Sheera Frankel, Cecilia Kang', true, '5');
let sampleBook3 = new Book('The Every', 'Dave Eggers', false, '');

// let myLibrary = [];
let myLibrary = [sampleBook1, sampleBook2, sampleBook3];
let readNotReadButton = document.querySelectorAll('.read-not-read');
let deleteButton = document.querySelectorAll('.extra-options');
let starButton = document.querySelectorAll('.rating-star');

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
            saveLocal()
            newBookForm.reset();
            newBookModal.style.display = "none";
        }
    }
    starRatingUI();
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
            <div class="extra-options noselect">⛔️</div>
        </div>
        `;
        libraryDiv.appendChild(div);
    }
    deleteButton = document.querySelectorAll('.extra-options');
    deleteButton.forEach((btn) => {
        btn.addEventListener('click', deleteBook);
    })
    readNotReadButton = document.querySelectorAll('.read-not-read');
    readNotReadButton.forEach((btn) => {
        btn.addEventListener('click', readNotRead);
    })
    starRatingUI();
}
displayLibrary();
// Display Star Ratings option whenever a book is read
let bottomOfCardDiv = document.querySelectorAll('.bottom-of-card');
function displayStarRating() {
    let bottomOfCardDiv = document.querySelectorAll('.bottom-of-card');
    for (let i = 0; i < bottomOfCardDiv.length; i++) {
        let div = document.createElement('div');
        let childNodes = bottomOfCardDiv[i].children;
        div.setAttribute('class', 'ratings noselect');
        div.innerHTML = `
            <i class="rating-star inactive-star noselect 1-star">★</i>
            <i class="rating-star inactive-star noselect 2-star">★</i>
            <i class="rating-star inactive-star noselect 3-star">★</i>
            <i class="rating-star inactive-star noselect 4-star">★</i>
            <i class="rating-star inactive-star noselect 5-star">★</i>
            `;

        if (myLibrary[i].read === true && childNodes[0].classList.contains('ratings') === false) {
            bottomOfCardDiv[i].insertBefore(div, bottomOfCardDiv[i].firstChild);
        } 
        if (myLibrary[i].read === false && childNodes[0].classList.contains('ratings') === true) {
            bottomOfCardDiv[i].removeChild(childNodes[0]);
        }
    };
    starButton = document.querySelectorAll('.rating-star');
    starButton.forEach((btn) => {
        btn.addEventListener('click', rateBook);
    })
    starRatingUI();
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
        myLibrary[e.target.parentNode.id].rating = '';
        displayStarRating();
        starRatingUI();
        saveLocal()
    } else {
        e.target.classList.add('true');
        myLibrary[e.target.parentNode.id].read = true;
        myLibrary[e.target.parentNode.id].rating = '';
        displayStarRating();
        starRatingUI();
        saveLocal()
    }
}

// Delete button
function deleteBook(e) {
    let deleteBookIndex = e.target.parentNode.parentNode.firstElementChild.id;
    myLibrary.splice(deleteBookIndex, 1);
    displayLibrary();
    displayStarRating();
    starRatingUI();
    saveLocal()
}

// Star Rating
function rateBook(e) {
    let rateBookIndex = e.target.parentNode.parentNode.parentNode.firstElementChild.id;
    let starsGiven;
    if (e.target.classList.contains("1-star")) {
        starsGiven = 1;
    } else if (e.target.classList.contains("2-star")) {
        starsGiven = 2;
    } else if (e.target.classList.contains("3-star")) {
        starsGiven = 3;
    } else if (e.target.classList.contains("4-star")) {
        starsGiven = 4;
    } else if (e.target.classList.contains("5-star")) {
        starsGiven = 5;
    }
    myLibrary[rateBookIndex].rating = starsGiven;
    starRatingUI();
    saveLocal()
}

function starRatingUI() {
    let bookRatings = [];
    for (let i = 0; i < myLibrary.length; i++) {
        bookRatings.push(myLibrary[i].rating);
    }
    let bottomOfCardDiv = document.querySelectorAll('.bottom-of-card');
    for (let i = 0; i < bottomOfCardDiv.length; i++) {
        if (bottomOfCardDiv[i].children[0].classList.contains('ratings')) {
            let specificBookRating = bookRatings[i];
            let specificBookRatingDiv = bottomOfCardDiv[i].children[0].children;
            for (let j = 0; j < specificBookRatingDiv.length; j++) {
                if (specificBookRatingDiv[j].classList.contains('active-star')) {
                    specificBookRatingDiv[j].classList.remove('active-star');
                    specificBookRatingDiv[j].classList.add('inactive-star');
                }
                for (let k = 0; k < specificBookRating; k++) {
                    specificBookRatingDiv[k].classList.remove('inactive-star');
                    specificBookRatingDiv[k].classList.add('active-star');
                }
            }
        }
    }
}
starRatingUI();

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function saveLocal() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function retrieveLocal() {
    if (localStorage.getItem("myLibrary")) {
        let retrievedStorage = JSON.parse(localStorage.getItem("myLibrary"));
        myLibrary = retrievedStorage.map((book) => JSONToBook(book));
    } else {
    myLibrary = [sampleBook1, sampleBook2, sampleBook3];
    }
    displayLibrary();
    displayStarRating();
    starRatingUI();
    saveLocal()
}

function JSONToBook(book) {
    return new Book(book.title, book.author, book.read, book.rating);
}

retrieveLocal();