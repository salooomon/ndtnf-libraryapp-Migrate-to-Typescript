import {Request, Response} from "express";
import container from "../container/container";
import saveBook from "../other/saveBooks";
import BookService from "../services/BookService";

const repo = container.get(BookService);

// Добавление книг
export const addBooks = async () => {
    try {
        const promises = saveBook.map(async (book) => {
            const existingBook = await repo.getBookByName(book.title);
            if (!existingBook) {
                await repo.createBook(book);
                console.log(`Книга "${book.title}" успешно добавлена в базу данных`);
            } else {
                console.log(`Книга "${book.title}" уже существует в базе данных`);
            }
        });

        await Promise.all(promises);
    } catch (error) {
        console.error('Ошибка при добавлении книг:', error);
    }
};


// Получение всех книг
export const getBooks = (req: Request, res: Response) => {
    repo.getBooks()
        .then((books) => res.status(200).json(books))
        .catch((e) => {
            console.log(e);
        });
};

// Получение книги по id
export const getBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const book = await repo.getBook(id);
        res.json(book);
    } catch (error: Error | any) {
        if (error.name === 'DocumentNotFoundError') {
            res.status(404).json('404 | книга не найдена');
        } else {
            res.status(500).json(error.message);
        }
    }
};

// Создание книги с последующим возвращением книги
export const createBook = (req: Request, res: Response) => {
    const {
        title, description, authors, favorite,
        fileCover, fileName,
    } = req.body;
    const fileBook = ''
    repo.createBook({
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook,
    }).then((newBook) => res.status(201).json(newBook))
        .catch((e) => {
            console.log(e);
        });
};

// Редактирование книги по id
export const editeBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        title, description, authors, favorite,
        fileCover, fileName,
    } = req.body;
    let fileBook = '';
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
    } catch (error: Error | any) {
        if (error.name === 'DocumentNotFoundError') {
            res.status(404).json('404 | книга не найдена');
        } else {
            res.status(500).json(error.message);
        }
    }
};

// Удаление книги по id
export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await repo.deleteBook(id);
        res.json('ok');
    } catch (error: Error | any) {
        if (error.name === 'DocumentNotFoundError') {
            res.status(404).json('404 | книга не найдена');
        } else {
            res.status(500).json(error.message);
        }
    }
};