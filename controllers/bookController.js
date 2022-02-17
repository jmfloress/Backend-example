const bcrypt = require('bcrypt');

const booksController = (Book) => {
    const getBooks = async (req, res) => {

        const { query } = req;
        const response = await Book.find(query);
        res.json(response);
    }

    const postBooks = async (req, res) => {
        
        const book = new Book(req.body);

        await book.save();
        res.json(book);
    }

    const getBookById = async (req, res) => {

        const { params } = req;
        const response = await Book.findById(params.bookId);
        res.json(response);
    }

    const getBookSearch = async (req, res) => {
        const title = req.query.title;
        const author = req.query.author;
        if (title && author) {
            const response = await Book.find({title, author});
            res.json(response);
        } else if (title) {
            const response = await Book.find({title});
            res.json(response);
        } else if (author) {
            const response = await Book.find({author});
            res.json(response);
        } else {
            res.status(400).json('NULL');
        }
    }

    const putBooks = async (req, res) => {
        const { body } = req;
        const response = await Book.updateOne({
        _id: req.params.bookId,
        },
        {
        $set:{
            title: body.title,
            genre: body.genre,
            author: body.author,
            read: body.read
        }
        });
        res.json(response);
    }

    const deleteBookById = async (req, res) => {
        const id = req.params.bookId;
        await Book.findByIdAndDelete(id);
        res.status(202).json("Book has been deleted.");
    }

    return { getBooks, postBooks, getBookById, putBooks, deleteBookById, getBookSearch };
}

module.exports = booksController;