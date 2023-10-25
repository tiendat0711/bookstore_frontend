import React, { useEffect, useState } from 'react';
import BookModel from '../../models/Book';
import Image from '../../models/Image';
import { getAllImageForBook } from '../../api/imageApi';
import { Link } from 'react-router-dom';
interface BookPropsInterface {
    book: BookModel;
}


const BookProps = ({ book }: BookPropsInterface) => {

    const bookId: number = book.bookId;

    const [listImage, setListImage] = useState<Image[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllImageForBook(bookId).then(
            ImageData => {
                setListImage(ImageData);
                setLoadingData(false);
            }
        ).catch(
            error => {
                setLoadingData(false);
                setError(error);
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
        <div className="col-md-3 mt-2">
            <div className="card">

                {listImage[0] && listImage[0].imageData &&

                    <Link to={`/books/${book.bookId}`} >
                        <img
                            src={`${listImage[0].imageData}`}
                            className="card-img-top"
                            alt={book.bookName}
                            style={{ height: '200px' }}
                        />
                    </Link>

                }
                <div className="card-body">
                    <Link to={`/books/${book.bookId}`} style={{ textDecoration: 'none' }}>
                        <h5 className="card-title">{book.bookName}</h5>
                    </Link>

                    <p className="card-text">{book.description}</p>
                    <div className="price">
                        <span className="original-price">
                            <del>{book.listPrice}</del>
                        </span>
                        <span className="discounted-price">
                            <strong>{book.sellPrice}</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default BookProps;