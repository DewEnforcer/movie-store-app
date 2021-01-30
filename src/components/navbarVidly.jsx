import React from 'react';
import {NavLink} from "react-router-dom"
import CurrentUser from './CurrentUser';
const NavBar = ({user}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">Vidly</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
                    {user && <NavLink className="nav-link nav-item" to="/customers">Customers</NavLink>}
                    {user && <NavLink className="nav-link nav-item" to="/rental">Rentals</NavLink>}
                    {!user && <><NavLink className="nav-link nav-item" to="/login">Login</NavLink>
                    <NavLink className="nav-link nav-item" to="/register">Register</NavLink></>}
                    {user && <><NavLink className="nav-link nav-item" to="/logout">Logout</NavLink></>}
                </div>
            </div>
            {user && <CurrentUser username={user.name}/>}
        </nav>
    );
}
 
export default NavBar;