import React, { Component } from 'react';
import {Link} from "react-router-dom";
import _ from "lodash";

class TableBody extends Component {
    renderCell = (column, item, linkPath) => {
        const link = "/"+linkPath+"/"+item[this.props.valueProperty];
        if (column.content) return column.content(item);
        const text = _.get(item, column.path).toString();
        if (column.label && column.path === "title") return <Link to={link}>{text}</Link>
        return text;
    }
    getCellKey = (item, column) => {
        return item[this.props.valueProperty]+(column.path||column.key);
    }
    render() { 
        const {items, columns, valueProperty, linkPath} = this.props;
        return (
            <tbody>
            {items.map((item) => {
                return (
                    <tr key={item[valueProperty]}>
                        {columns.map((column) => 
                            <td key={this.getCellKey(item, column)}>{this.renderCell(column, item, linkPath)}</td>
                        )}
                    </tr>
                )
            })}
            </tbody>
        );
    }
}
 
export default TableBody;