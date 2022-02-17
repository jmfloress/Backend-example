const express = require('express');
const booksController = require('../controllers/bookController');
const bookValidation = require('../validations/bookValidation');

const routes = (Book) => {
    const bookRouter = express.Router();

    const { getBooks, postBooks, getBookById, putBooks, deleteBookById, getBookByTitle, getBookByAuthor } = booksController(Book);

    bookRouter.route('/books')
    .get(getBooks)
    .post(bookValidation, postBooks) 

    bookRouter.route('/books/:bookId')
    .get(getBookById)
    .put(bookValidation, putBooks)
    .delete(deleteBookById)

    bookRouter.route('/books/:title/details')
    .get(getBookByTitle)

    bookRouter.route('/books/:author/details')
    .get(getBookByAuthor)

    return bookRouter;
}
module.exports = routes;