
import BookModel from "../models/Book";
import { my_request } from "./myRequestApi";

interface resultInterface {
    result: BookModel[];
    totalPage: number;
    totalBook: number;
}
export async function getBook(url: string): Promise<resultInterface> {

    const result: BookModel[] = [];
    const response = await my_request(url);


    const data = response._embedded.books;

    const totalPage: number = response.page.totalPages;
    const totalBook: number = response.page.totalElements;


    for (const key in data) {
        result.push({
            bookId: data[key].bookId,
            bookName: data[key].bookName,
            listPrice: data[key].listPrice,
            sellPrice: data[key].sellPrice,
            authorName: data[key].authorName,
            description: data[key].describe,
            quantity: data[key].quantity,
            rate: data[key].rate
        });


    }

    return { result: result, totalBook: totalBook, totalPage: totalPage };
}

export async function getAllBook(page: number) {
    const url: string = `http://localhost:8080/books?sort:bookId,desc&size=8&page=${page}`;

    return getBook(url);
}

export async function get3NewBook() {
    const url: string = 'http://localhost:8080/books?sort:bookId,desc&page=0&size=3';

    return getBook(url);
}

export async function getBookByNameAndCategoryId(keywordSearch: string, categoryId: number) {
    let url: string = `http://localhost:8080/books?sort:bookId,desc&size=8&page=0`;

    if (keywordSearch !== '') {
        url = `http://localhost:8080/books/search/findBookByBookNameContaining?
               sort=bookId,desc&size=8&page=0&bookName=${keywordSearch}`;
        console.log("keyword search url");
    } else if (keywordSearch === '' && categoryId > 0) {
        url = `http://localhost:8080/books/search/findBookByCategories_categoryId?
        sort=bookId,desc&size=8&page=0&categoryId=${categoryId}`;
        console.log("categoryId search url");
    } else if (keywordSearch !== '' && categoryId > 0) {
        url = `http://localhost:8080/books/search/findBookByBookNameContainingAndCategories_categoryId?
        sort=bookId,desc&size=8&page=0&bookName=${keywordSearch}&categoryId=${categoryId}`;
    }

    return getBook(url);
}

export async function getBookById(bookId: number): Promise<BookModel | null> {
    const url = `http://localhost:8080/books/${bookId}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Have error when fetching book API by book id');
        }

        const bookData = await response.json();

        if (bookData) {
            return {
                bookId: bookData.bookId,
                bookName: bookData.bookName,
                authorName: bookData.authorName,
                description: bookData.describe,
                listPrice: bookData.listPrice,
                sellPrice: bookData.sellPrice,
                quantity: bookData.quantity,
                rate: bookData.rate,
            }
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}