import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookModel from '../../models/Book';
import { getBookById } from '../../api/bookApi';



const BookDetail = () => {
    const { bookId } = useParams();

    let bookIdNumber = 0;
    try {
        bookIdNumber = parseInt(bookId + '');
        if (Number.isNaN(bookIdNumber)) {
            bookIdNumber = 0;
        }
    } catch (error) {
        bookIdNumber = 0;
        console.log("Error", error);
    }

    const [book, setBook] = useState<BookModel | null>(null);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getBookById(bookIdNumber)
            .then(
                (book) => {
                    setBook(book);
                    setLoadingData(false);
                }
            ).catch(
                (error) => {
                    setLoadingData(false);
                    setError(error);
                }
            )
    }, [bookId])
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
        <div className='container'>
            <div className='row mt-4 mb-4'>
                <div className='col-4'>
                    {book?.bookId}
                </div>
                <div className='col-8'>
                    {book?.bookName}
                </div>
            </div>
        </div>
    )
}

export default BookDetail;