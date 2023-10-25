import React, { useEffect, useState } from "react";
import BookProps from "../product/BookProps";
import BookModel from "../../models/Book";
import { get3NewBook } from "../../api/bookApi";
import CarouselItem from "./CarouselItem";

const Carousel = () => {
    const [listBook, setListBook] = useState<BookModel[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        get3NewBook().then(
            data => {
                setListBook(data.result);
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
        <div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <div className="row align-items-center">
                            <CarouselItem book={listBook[0]} />
                        </div>
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <div className="row align-items-center">
                            <CarouselItem book={listBook[1]} />
                        </div>
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <div className="row align-items-center">
                            <CarouselItem book={listBook[2]} />
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
export default Carousel;