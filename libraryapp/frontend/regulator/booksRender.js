const booksAPI = require('../utils/bookApi')


const PORT = process.env.CNT_PORT || 3000;
const BASE_URL = process.env.BASE_URL || "http://counter";

// Страница просмотр всех книг в библиотеке
module.exports.renderLibrary = async (req, res) => {
    try {
        const books = await booksAPI.getAllBooks();
        if(books) {
            res.status(200).render('books/index', {
                title: 'Библиотека',
                books,
            })
        }
    } catch (error) {
        console.log(error)
    }
};

// Страница добавления книги
module.exports.renderPageCreateBook = (req, res) => {
    res.render('books/create', {
        title: 'Добавление книги',
        book: {},
    });
};

// Создание книги
module.exports.createPage = (req, res) => {
    const {
        title, description, authors, favorite,
        fileCover, fileName,
    } = req.body;
    const fileBook = req.file ? req.file.path : '';
    Book.create({
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook,
    }).then(() => res.redirect('/books'))
        .catch((e) => {
            console.log(e);
        });
};

// Страница просмотра книги
module.exports.renderPageBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await booksAPI.getBookById;
        let cnt = 0;
        try {
            const response = await fetch(`${BASE_URL}:${PORT}/counter/${id}/incr`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            cnt = data.cnt;
        } catch (error) {
            console.log(error);
        }
        user = req.isAuthenticated() ? req.user : null;

        const messages = []

        res.render('books/view', {
            title: `Книга | ${book.title}`,
            book,
            user,
            messages,
            count: cnt,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }
};

//Редактирование книги
module.exports.updateBook  = (req, res) => {
    const { id } = req.params;
    booksAPI.getBookById(id).orFail()
        .then((book) => res.render('books/update', {
            title: `Книга | ${book.title}`,
            book,
        }))
        .catch((e) => {
            console.log(e);
            res.redirect('/404');
        });
};

// Страница  редактирование книги
module.exports.renderPageEditeBook = (req, res) => {
    const { id } = req.params;
    const {
        title, description, authors,
        fileCover, fileName,
    } = req.body;

    const fileBook = req.file ? req.file.path : null;
    booksAPI.updateBookId(id, {
        title,
        description,
        authors,
        fileCover,
        fileName,
        fileBook,
    }).orFail()
        .then(() => res.redirect(`/books/${id}`))
        .catch((e) => {
            console.log(e);
            res.redirect('/404');
        });
};

// Страница удаление книги
module.exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        await booksAPI.deleteBookById(id)
        res.redirect('/books');
    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }
};
