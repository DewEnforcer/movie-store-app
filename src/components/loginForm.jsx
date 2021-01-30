import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { toast } from 'react-toastify';
class LoginForm extends Form {
    state = {
        data: {username: "", password: ""},
        errors: {},
        inputs: [
            {name: "username", path: "username", label: "Username", type:"text"},
            {name: "password", path: "password", label: "Password", type:"password"}
        ]
    }

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    }
    doSubmit = async () => {
        try {
            await auth.login(this.state.data);

            const {state} = this.props.location;
            window.location = state ? state.from.pathname : "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) toast.error(ex.response.data);
        }
    }
    render() { 
        if (auth.getCurrentUser()) return <Redirect to="/"/>

        return (
        <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                {this.state.inputs.map((input) => this.renderInput(input))}
                {this.renderButton("Login")}
            </form>
        </div>);
    }
}
 
export default LoginForm;