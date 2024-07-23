const {BooksRepository} = require("../../repository/BooksRepository");

const container = require('../../container/container');

const repo = container.get(BooksRepository)

// Получение всех книг
module.exports.getBooks = (req, res) => {
    repo.getBooks()
        .then((books) => res.status(200).json(books))
        .catch((e) => {
            console.log(e);
        });
};

// Получение книги по id
module.exports.getBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await repo.getBook(id).orFail();
        res.json(book);
    } catch (error) {
        if (error.name === 'DocumentNotFoundError') {
            res.status(404).json('404 | книга не найдена');
        } else {
            res.status(500).json(error.message);
        }
    }
};

// Создание книги с последующим возвращением книги
module.exports.createBook = (req, res) => {
    const {
        title, description, authors, favorite,
        fileCover, fileName,
    } = req.body;
    const fileBook = req.file ? req.file.path : null;
    repo.createBook({
        title,
        description,
        authors,
        fileCover,
        fileName,
        fileBook,
    }).then((newBook) => res.status(201).json(newBook))
        .catch((e) => {
            console.log(e);
        });
};

// Редактирование книги по id
module.exports.editeBook = async (req, res) => {
    const { id } = req.params;
    const {
        title, description, authors, favorite,
        fileCover, fileName,
    } = req.body;
    let fileBook = null;
    if (req.file) {
        const { path } = req.file;
        fileBook = path;
    }
    try {
        const book = await repo.updateBook(id, {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook,
        });
        res.json(book);
    } catch (error) {
        if (error.name === 'DocumentNotFoundError') {
            res.status(404).json('404 | книга не найдена');
        } else {
            res.status(500).json(error.message);
        }
    }
};

// Удаление книги по id
module.exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        await repo.deleteBook(id).orFail();
        res.json('ok');
    } catch (error) {
        if (error.name === 'DocumentNotFoundError') {
            res.status(404).json('404 | книга не найдена');
        } else {
            res.status(500).json(error.message);
        }
    }
};