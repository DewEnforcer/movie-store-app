import React, {Component} from 'react';
import Like from "./common/Like"
import Table from "./common/table";
import auth from "../services/authService";
class MoviesTable extends Component {

    columns = [
        {label: "Title", path: "title"},
        {label: "Genre", path: "genre.name"},
        {label: "Stock", path: "numberInStock"},
        {label: "Rate", path: "dailyRentalRate"},
        {key: "like", content: movie => <Like Liked={movie.Liked} onClick={() => this.props.onLike(movie)}/>},
    ]

    addDeleteColumn = () => {
        this.columns.push(
            {key: "delete", content: movie => <button className="btn btn-danger btn-sm" onClick={() => this.props.onMovieRemove(movie)} value={movie._id}>Delete</button>}
        )
    }

    constructor() { //perhaps use componentwillmount?
        super();
        const user = auth.getCurrentUser();
        if (user && user.isAdmin) this.addDeleteColumn();
    }

    render() { 
        const {items, sortData, onSort} = this.props; 
        return <Table linkPath="movies" columns={this.columns} items={items} sortData={sortData} onSort={onSort}/>
    }
}
 
export default MoviesTable;
