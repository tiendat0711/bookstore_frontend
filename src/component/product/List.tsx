import React, { useEffect, useState } from "react";
import BookProps from "./BookProps";
import BookModel from "../../models/Book";
import { getAllBook } from "../../api/bookApi";
import { Paginate } from "../utils/paginate";

const List: React.FC = () => {
    const [listBook, setListBook] = useState<BookModel[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllBook().then(
            data => {
                setListBook(data);
                setLoadingData(false);
            }
        ).catch(
            error => {
                setLoadingData(false);
                setError(error.message)
            }
        )
    }, [])

    if (loadingData) {
        return (
            <div>
                <h1>Loading....</h1>
            </div>
        )
    }

    if (error) {
        <div>
            <h1>Error: {error}</h1>
        </div>
    }
    return (


        <div className="container">
            <div className="row mt-4">
                {
                    listBook.map((book) => (

                        <BookProps key={book.bookId} book={book} />
                    ))
                }
            </div>

            <Paginate />
        </div>
    );
}

export default List;