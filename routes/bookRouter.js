const express = require('express');
const booksController = require('../controllers/bookController');
const bookValidation = require('../validations/bookValidation');

const routes = (Book) => {
    const bookRouter = express.Router();

    const { getBooks, postBooks, getBookById, putBooks, deleteBookById, getBookSearch } = booksController(Book);

    bookRouter.route('/books')
    .get(getBooks)
    .post(bookValidation, postBooks) 

    bookRouter.route('/books/:bookId')
    .get(getBookById)
    .put(bookValidation, putBooks)
    .delete(deleteBookById)

    bookRouter.route('/books/search')
    .get(getBookSearch)

    return bookRouter;
}
module.exports = routes;