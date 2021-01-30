import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import auth from './services/authService';
import Movies from "./components/movies";
import Rental from './components/rental';
import Customers from './components/customers';
import NotFound from './components/common/notfound';
import NavBar from './components/navbarVidly';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegForm from './components/registrationForm';
import Logout from "./components/logout";
import ProtectedRoute from './components/common/protectedRoute';
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

//console.log(process.env);
class App extends Component {
    state = {

    }

    componentDidMount = () => {
        const user = auth.getCurrentUser();
        if (user) this.setState({user});
    }

    render() { 
        const {user} = this.state;
        return (
            <>
            <ToastContainer/>
            <NavBar user={user}/>
            <Switch>
                <Route path="/register" component={RegForm}/>                
                <Route path="/login" component={LoginForm}/>
                <Route path="/logout" component={Logout}/>
                <ProtectedRoute path="/movies/:id" component={MovieForm}/>
                <Route path="/movies" render={(props) => <Movies {...props} user={this.state.user}/>} />
                <Route path="/customers" component={Customers}/>
                <Route path="/rental" component={Rental}/>
                <Route path="/not-found" component={NotFound}/>
                <Redirect from="/" exact to="/movies"/>
                <Redirect to="/not-found"/>
            </Switch>
            </>
        )
    }
}
 
export default App;

/* 
    state = {
        counters: [
            {id: 1, value: 0},
            {id: 2, value: 0},
            {id: 3, value: 0},
            {id: 4, value: 0}
        ]
    }
    handleReset = () => {
        const counters = this.state.counters.map(c => {
            c.value = 0;
            return c;
        })
        this.setState({counters});
    }
    handleCounterDelete = (id) => { //raised event
        const counters = this.state.counters.filter(cntr => cntr.id !== id);
        this.setState({counters});
    }
    handleCounterIncr = (counter) => {
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index] = {...counter};
        counters[index].value++;
        this.setState({counters});
    } 
    handleCounterDecr = (counter) => {
        if (counter.value <= 0) return;
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index] = {...counter};
        counters[index].value--;        
        this.setState({counters});
    }   
*/