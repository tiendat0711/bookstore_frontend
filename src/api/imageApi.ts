import Image from "../models/Image";
import { my_request } from "./myRequestApi";

export async function getImage(url: string): Promise<Image[]> {
    const result: Image[] = [];

    const response = await my_request(url);

    const data = response._embedded.images;

    for (const key in data) {
        result.push({
            imageId: data[key].imageId,
            imageName: data[key].imageName,
            isIcon: data[key].isIcon,
            link: data[key].link,
            imageData: data[key].imageData
        })
    }

    return result;
}

export async function getAllImageForBook(bookId: number) {
    const url: string = `http://localhost:8080/books/${bookId}/images`;

    return getImage(url);
}

export async function getImageForOneBook(bookId: number) {
    const url: string = `http://localhost:8080/books/${bookId}/images?sort=bookId,asc&page=&size=1`;

    return getImage(url);
}