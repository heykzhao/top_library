// let myLibrary = [];
let myLibrary = [];

function Book(title, author, read, rating, comment) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.rating = rating;
    this.comment = comment; 
};

function addBooktoLibrary(book) {
    if ((myLibrary.some(e => (e.title == book.title) && (e.author == book.author)))) {
        alert('It looks like this book is already in your library!');
    } else {
        myLibrary.push(book);
    }
};



// Display Library based on what's in myLibrary object
const libraryDiv = document.querySelector('.library');
function displayLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
        let div = document.createElement('div');
        div.setAttribute('class', 'book-card');
        div.innerHTML = `
        <div class="book">
            <div class="read-not-read ${myLibrary[i].read}">✓</div>
            <p class='book-title'>${myLibrary[i].title}</p>
            <p class='book-author'>${myLibrary[i].author}</p>
        </div>
        <div class="bottom-of-card">
            <div class="extra-options noselect">• • •</div>
        </div>
        `;
        libraryDiv.appendChild(div);
    }
}
displayLibrary();

// Display Star Ratings option whenever a book is read
const bottomOfCardDiv = document.querySelectorAll('.bottom-of-card');
function displayStarRating() {
    for (let i = 0; i < bottomOfCardDiv.length; i++) {
        let div = document.createElement('div');
        div.setAttribute('class', 'ratings noselect');
        if (myLibrary[i].read === "read") {
            div.innerHTML = `
            <i class="rating-star inactive-star noselect">★</i>
            <i class="rating-star inactive-star noselect">★</i>
            <i class="rating-star inactive-star noselect">★</i>
            <i class="rating-star inactive-star noselect">★</i>
            <i class="rating-star inactive-star noselect">★</i>
            `;
        bottomOfCardDiv[i].insertBefore(div, bottomOfCardDiv[i].firstChild);
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