let myLibrary = [];

function Book(title, author, read, rating, comment) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.rating = rating;
    this.comment = comment; 
};

function addBooktoLibrary(book) {
    if (book.indexOf() == -1) {
        myLibrary.push(book);
    } else {
        alert('You\'ve already added this book!');
    }
};
