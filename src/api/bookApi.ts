
import BookModel from "../models/Book";
import { my_request } from "./myRequestApi";

export async function getBook(url: string): Promise<BookModel[]> {

    const result: BookModel[] = [];
    const response = await my_request(url);
    console.log(response);

    const data = response._embedded.books;



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

    return result;
}

export async function getAllBook() {
    const url: string = 'http://localhost:8080/books?sort:bookId,desc';

    return getBook(url);
}

export async function get3NewBook() {
    const url: string = 'http://localhost:8080/books?sort:bookId,desc&page=0&size=3';

    return getBook(url);
}