import React, { useEffect, useState } from 'react';
import BookModel from '../../models/Book';
import Image from '../../models/Image';
import { getImageForOneBook } from '../../api/imageApi';

interface CarouselItemInterface {
    book: BookModel;
}


const CarouselItem: React.FC<CarouselItemInterface> = (props) => {

    const bookId: number = props.book.bookId;

    const [listImage, setListImage] = useState<Image[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getImageForOneBook(bookId).then(
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
        <>
            <div className="col-5 text-center">
                {listImage[0] && listImage[0].imageData &&
                    <img src={`${listImage[0].imageData}`} className="float-end" style={{ width: '150px' }} />}
            </div>
            <div className="col-7">
                <h5>{props.book.bookName}</h5>
                <p>{props.book.description}</p>
            </div>
        </>
    );
}

export default CarouselItem;