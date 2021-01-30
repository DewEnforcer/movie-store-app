import React from 'react';
import propTypes from "prop-types";

const Pagination = ({page, resultCount, onPageChange, resultsPerPage}) => {
    const count = Math.ceil(resultCount / resultsPerPage);
    if (count <= 1) return null;
    const buttons = [];
    for (let i = 1; i <= count; i++) {
        buttons.push(i);
    }
    return (
     <nav aria-label="Page navigation example">
        <ul className="pagination">
            {buttons.map((button) => {
                return <li onClick={() => onPageChange(button)} key={button} className={button === page ? "page-item active" : "page-item"}><a className="page-link" href="#">{button}</a></li>
            })}
        </ul>
     </nav>
    );
}
 
Pagination.propTypes = {
    page: propTypes.number.isRequired, 
    resultCount: propTypes.number.isRequired,
    onPageChange: propTypes.func.isRequired,
    resultsPerPage: propTypes.number.isRequired
}

export default Pagination;