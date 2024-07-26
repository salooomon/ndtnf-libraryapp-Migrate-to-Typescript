import {Book} from "../types/book"
import {injectable} from "inversify";

@injectable()
export abstract class BooksRepository {
    abstract createBook(book: any): void
    abstract getBook(id: string): Promise<Book | null>
    abstract getBooks(): Promise<Book[] | null>
    abstract updateBook(id: string, book: Book): void
    abstract deleteBook(id: string): void
}