import React, { Component } from 'react';
import Joi, { errors } from "joi-browser";
import Form from "./common/form";
import {getMovie, saveMovie} from "../services/movieService";
import {getGenres} from "../services/genreService";
import { toast } from 'react-toastify';
class MovieForm extends Form {
    state = {
        data: {title: "", genreId: "0", numberInStock: "", dailyRentalRate: ""},
        errors: {},
        genres: [],
        inputs: [
            {name: "title", path: "title", label: "Title", type:"text"},
            {name: "genreId", path: "genreId", label: "Genre", type:"select"},
            {name: "numberInStock", path: "numberInStock", label: "Number in stock", type:"number"},
            {name: "dailyRentalRate", path: "dailyRentalRate", label: "Rate", type:"number"}            
        ]
    }

    schema = {
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number in stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate")
    }

    componentDidMount = async () => {
        await this.populateGenres();
        await this.populateMovie();
    }
    populateGenres = async () => {
        const dataMovie = {...this.state.data};
        const {data: genres} = await getGenres();
        dataMovie.genreId = genres[0]._id;
        this.setState({genres, data:dataMovie});
    }
    populateMovie = async () => {
        const {match, history} = this.props;
        try {
            if (match.params.id === "form") return;
            
            const {data: movie} = await getMovie(match.params.id);
            const data = this.mapToViewModel(movie);
            this.setState({data});
        } catch (error) {
            if (error.response && error.response.status === 404) history.replace("/not-found");
        }
    }
    mapToViewModel = (movie) => {
        return {id: movie._id, title: movie.title, genreId: movie.genre._id, numberInStock: movie.numberInStock, dailyRentalRate: movie.dailyRentalRate}
    }
    NavigateBack = () => {
        this.props.history.push("/");
    }
    doSubmit = async () => {
        try {
            await saveMovie(this.state.data);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error("Incorrect movie form!");
                return;
            }
        }
        this.NavigateBack();
    }
    render() { 
        const {match} = this.props;
        return (
            <div className="movie_form_wrapper">
            <h1>Movie form {match.params.id !== "form" && match.params.id}</h1>
            <form  className="form" onSubmit={this.handleSubmit}>
                {this.state.inputs.map((input) => {
                    switch (input.type) {
                        case "select":
                           return this.renderSelect(input, this.state.genres)
                        default:
                           return this.renderInput(input)
                    }
                })}
                {this.renderButton("Save")}
            </form>
            </div>
        );
    }
}
 
export default MovieForm;