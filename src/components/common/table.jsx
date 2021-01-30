import React from 'react';
import TableBody from './tableBody';
import TableHeader from "./tableHeader";

const Table = ({columns, sortData, onSort, items, linkPath}) => {
    return (
        <table className="table">
            <TableHeader sortData={sortData} columns={columns} onSort={onSort} />
            <TableBody linkPath={linkPath} items={items} columns={columns} valueProperty="_id" />
        </table>
        );
}
 
export default Table;