// Random books to fill array with
let book1 = new Book('Dune', 'Frank Herbert', 'Not yet', 'N/A', 'Have not read yet');
let book2 = new Book('Dune2', 'Frank Herbert', 'Not yet', 'N/A', 'Have not read yet');
let book3 = new Book('Dune', 'Frank Herbert2', 'Not yet', 'N/A', 'Have not read yet');
let book4 = new Book('Cool Guy', 'Kevin Zhao', 'Read', '5', 'Greatest book I\'ve ever read');


// let myLibrary = [];
let myLibrary = [book1, book2, book3, book4];

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

function displayLibrary() {
    
}