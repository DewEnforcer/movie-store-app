import React, { Component } from 'react';

//columns arr
//sort column obj
//on sort func

class TableHeader extends Component {
    raiseSort = (path) => {
        if (!this.props.onSort) return;

        if (typeof path === "undefined") return;
        const sortColumn = {...this.props.sortData};
        if (sortColumn.path === path) 
        sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        else {
            sortColumn.path = path;
            sortColumn.order = "asc";
        }
        this.props.onSort(sortColumn);
    }
    renderSortIcon = (column) => {
        const {sortData} = this.props;
        if (!sortData) return;
        if (column.path !== sortData.path) return null;
        const classes = "fa fa-sort-"+sortData.order;
        return <i className={classes}></i>;
    }
    render() { 
        return (
            <thead>
                <tr>
                {this.props.columns.map((column) => {
                    return <th className="clickable" key={column.path || column.key} onClick={() => this.raiseSort(column.path)}>{column.label} {this.renderSortIcon(column)}</th>
                })}
                </tr>
            </thead>
        );
    }
}
 
export default TableHeader;