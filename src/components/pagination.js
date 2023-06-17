import React, { useState } from 'react';

const Pagination = (props) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (event, page) => {
        event.preventDefault();
        setCurrentPage(page);
        props.onPageChange(page);
    }

    const getPages = () => {
        let pages = [];
        for (let i = 1; i <= props.totalPages; i++) {
            pages.push(
                <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i}>
                    <a href="#" className="page-link" onClick={(event) => handlePageChange(event, i)}>
                        {i}
                    </a>
                </li>
            );
        }
        return pages;
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {getPages()}
            </ul>
        </nav>
    )
}

export default Pagination;