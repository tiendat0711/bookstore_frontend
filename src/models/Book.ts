class BookModel {
    bookId: number;
    bookName?: string; //nullable
    sellPrice?: number;
    listPrice?: number;
    description?: string;
    quantity?: number;
    authorName?: string;
    rate?: number;

    constructor(
        bookId: number,
        bookName: string,//nullable
        sellPrice: number,
        listPrice: number,
        description: string,
        quantity: number,
        authorName: string,
        rate: number,

    ) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.authorName = authorName;
        this.description = description;
        this.quantity = quantity;
        this.sellPrice = sellPrice;
        this.listPrice = listPrice;
        this.rate = rate;
    }


}

export default BookModel;