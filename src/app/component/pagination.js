import Pagination from 'react-bootstrap/Pagination';

import { useEffect, useState } from 'react';

function goToPage(page, setPage) {
    setPage(page);
}

function renderItem(startIndex, quantity, current, hookSetPage) {
    let number = 0;

    const items = [...Array(quantity).keys()].map((number) => {
        return <Pagination.Item key={number} active={number == current} onClick={() => goToPage(number, hookSetPage)}>
            {number + 1}
        </Pagination.Item>
    });

    return items;
}

function PaginationCustom({ setPage, currentPage, totalPages }) {
    const quantity = 3;

    const items = renderItem(0, quantity, currentPage, setPage);

    return (
        <Pagination>
            <Pagination.First onClick={() => goToPage(0, setPage)} />
            <Pagination.Prev onClick={() => goToPage(currentPage - 1, setPage)} />
            
            {items}

            <Pagination.Next onClick={() => goToPage(currentPage + 1, setPage)} />
            <Pagination.Last />
        </Pagination>
    );
}

export default PaginationCustom;