import React, { useEffect, useState } from "react";
import BookProps from "./BookProps";
import BookModel from "../../models/Book";
import { getBookByNameAndCategoryId, getAllBook } from "../../api/bookApi";
import { Paginate } from "../utils/paginate";

interface ListProps {
    keywordSearch: string;
    categoryId: number;
}

const List = ({ keywordSearch, categoryId }: ListProps) => {
    const [listBook, setListBook] = useState<BookModel[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    // const [totalBook, setTotalBook] = useState(0);
    useEffect(() => {
        if (keywordSearch === '' && categoryId === 0) {
            getAllBook(currentPage - 1).then(
                rs => {
                    setListBook(rs.result);
                    setTotalPage(rs.totalPage);
                    setLoadingData(false);
                }
            ).catch(
                error => {
                    setLoadingData(false);
                    setError(error.message)
                }
            );
        }
        else {
            getBookByNameAndCategoryId(keywordSearch, categoryId).then(
                rs => {
                    setListBook(rs.result);
                    setTotalPage(rs.totalPage);
                    setLoadingData(false);
                }
            ).catch(
                error => {
                    setLoadingData(false);
                    setError(error.message)
                }
            );
        }

    }, [currentPage, keywordSearch, categoryId]);

    const paginate = (page: number) => {
        setCurrentPage(page);
    }

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

            <Paginate currentPage={currentPage} totalPage={totalPage} paginate={paginate} />
        </div>
    );
}

export default List;