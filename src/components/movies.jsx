import React, { Component } from 'react';
import {toast} from "react-toastify";
import {getMovies, deleteMovie} from "../services/movieService"
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate";
import Navigation from "./common/navigation";
import {filterByParams} from "../utils/filter";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from 'react-router-dom';
import SearchBar from './common/searchBar';

class Movies extends Component {
    defaultGenreId = "1";
    state = { 
        movies: [],
        page: 1,
        resultsPerPage: 4,
        activeGenre: "",
        searchQuery: "",
        genres: [],
        defaultGenre: {_id: this.defaultGenreId, name: "All Genres"},
        sortColumn: {path: "title", order: "asc"},
    }
    componentDidMount = async () => {
        const {data: fetchedGenres} = await getGenres();
        const {data: movies} = await getMovies();
        this.setState({movies, activeGenre: this.state.defaultGenre._id, genres: [this.state.defaultGenre, ...fetchedGenres]});
    }
    handleLikeMovie = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movie};
        movies[index].Liked = !movies[index].Liked;
        this.setState({movies});
    }
    handlePageChange = (newPage) => {
        if (newPage === this.state.page) return;
        this.setState({page: newPage});
    }
    handleGenreChange = (newGenre) => {
        this.setState({activeGenre: newGenre._id, page: 1, searchQuery: ""});
    }
    handleSort = (sortColumn) => {
        this.setState({sortColumn});
    }
    handleSearchBy = (query) => {
        this.setState({activeGenre: this.defaultGenreId, page: 1, searchQuery: query});
    }
    getPagedData = () =>{
        const {movies, activeGenre, searchQuery} = this.state
        const moviesToRender = filterByParams(movies, activeGenre, searchQuery)
        const sorted = _.orderBy(moviesToRender, [this.state.sortColumn.path], this.state.sortColumn.order);
        const paginated = paginate(sorted, this.state.page, this.state.resultsPerPage);
        return {totalCount: moviesToRender.length, data: paginated};
    }
    render() { 
        const {totalCount, data} = this.getPagedData();
        const {user} = this.props;
        return (
        <div className="row">
            <div className="col-2 m-5"><Navigation items={this.state.genres} activeGenre={this.state.activeGenre} onGenreChange={this.handleGenreChange}/></div>
            <div className="col m-5">
            {user && <Link style={{marginBottom: 10}} className="btn btn-primary" to="/movies/form">New Movie</Link>}
            <SearchBar onChange={this.handleSearchBy} value={this.state.searchQuery} />
            <h2>{this.getTitle(totalCount)}</h2>
            {this.state.movies.length > 0 && <>
            <MoviesTable items={data} onLike={this.handleLikeMovie} onSort={this.handleSort} sortData={this.state.sortColumn} onMovieRemove={this.handleMovieRemove}/>
            <Pagination page={this.state.page} resultCount={totalCount} onPageChange={this.handlePageChange} resultsPerPage={this.state.resultsPerPage}/></>}
            </div>
        </div>
        ) 
    }
    handleMovieRemove = async (movie) => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter((m) => m._id !== movie._id);
        this.setState({movies})

        try {
            await deleteMovie(movie._id);
        } catch (error) {
            if (error.response && error.response.status === 404) toast.error("The movie has already been removed!");
            this.setState({movies: originalMovies});
        }
    }
    getTitle = (movCount) => {
        return movCount > 0 ? "There are currently "+movCount+" movies" : "There are no movies";
    }
}
 
export default Movies;