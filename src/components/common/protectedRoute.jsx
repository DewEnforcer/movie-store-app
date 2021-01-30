import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import auth from "../../services/authService";


const ProtectedRoute = ({component: Component, redirectPath, render, ...rest}) => {
    return (
        <Route 
        {...rest}
        render={(props) => {
            if (auth.getCurrentUser()) return Component ? <Component {...props}/> : render(props);
            return <Redirect to={{
                pathname: redirectPath,
                state: {
                    from: props.location
                }
            }}/>
        }}
        />
    );
}
 
ProtectedRoute.defaultProps = {
    redirectPath: "/login",
}


export default ProtectedRoute;
