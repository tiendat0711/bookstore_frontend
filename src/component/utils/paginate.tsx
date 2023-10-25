import React from 'react';

interface PaginateInterface {
    currentPage: number;
    totalPage: number;
    paginate: any;
}
export const Paginate: React.FC<PaginateInterface> = (props) => {

    const listPage = [];

    if (props.currentPage === 1) {
        listPage.push(1);
        if (props.totalPage >= 2) {
            listPage.push(2);
        }
        if (props.totalPage >= 3) {
            listPage.push(3);
        }
    }
    else if (props.currentPage > 1) {
        if (props.currentPage >= 3) {
            listPage.push(props.currentPage - 2);
        }
        if (props.currentPage >= 2) {
            listPage.push(props.currentPage - 1);
        }
        listPage.push(props.currentPage);
        if (props.totalPage >= props.currentPage + 1) {
            listPage.push(props.currentPage + 1);
        }
        if (props.totalPage >= props.currentPage + 2) {
            listPage.push(props.currentPage + 2);
        }

    }

    return (
        <>
            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item" onClick={() => props.paginate(1)}>
                        <button className="page-link" >
                            First page
                        </button>
                    </li>
                    {
                        listPage.map(page => (
                            <li className="page-item" key={page} onClick={() => props.paginate(page)}>
                                <button className={"page-link " + (props.currentPage === page ? "active" : "")}>
                                    {page}
                                </button>
                            </li>
                        ))
                    }
                    <li className="page-item" onClick={() => props.paginate(props.totalPage)}>
                        <button className="page-link" >
                            Last page
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )

}