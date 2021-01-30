import React, { Component } from 'react';
import { register } from './../services/userService';
import auth from "./../services/authService";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from 'react-toastify';
class RegForm extends Form {
    state = {
        data: {
            username: "", password: "", name: ""
        },
        errors: {},
        inputs: [
            {name: "username", path: "username", label: "Email", type:"text"},
            {name: "password", path: "password", label: "Password", type:"password"},
            {name: "name", path: "name", label: "Name", type:"text"}
        ]
    }

    schema = {
        username: Joi.string().email().required().label("Email"),
        password: Joi.string().required().min(5).label("Password"),
        name: Joi.string().required().label("Name")
    }
    doSubmit = async () => {
        //Call server
        try {
            const {headers} = await register(this.state.data);
            auth.loginJWT(headers["x-auth-token"]);
            window.location = "/";
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data);
                const errors = {...this.state.data};
                errors.username = error.response.data;
                this.setState({errors});
            } 
        }
    }

    render() { 
        return ( <div>
            <h1>Register form</h1>
            <form onSubmit={this.handleSubmit}>
                {this.state.inputs.map((input) => this.renderInput(input))}
                {this.renderButton("Signup")}
            </form>
        </div>);
    }
}
 
export default RegForm;