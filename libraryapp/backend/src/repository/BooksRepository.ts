import {Book} from "../types/book"
import {injectable} from "inversify";

@injectable()
export default abstract class BooksRepository {
    abstract getBooks(): Promise<Book[] | null>
    abstract getBook(id: string): Promise<Book | null>
    abstract createBook(book: Book): void
    abstract updateBook(id: string, book: Book): void
    abstract deleteBook(id: string): void
}