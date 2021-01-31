// We make use of the library react-jwt to check if a token is still valid or not
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useJwt} from 'react-jwt';
import auth from './auth';

// We export a functional component. We will pass Components as a props in the function, it is destructured. 
const ProtectedRoute = ({component: Component, ...rest}) => {
    const { decodedToken, isExpired } = useJwt(auth.getToken());

    return (
        <Route 
            {...rest} 
            render ={props => {
                if(auth.getToken() !== 'undefined' && !isExpired) {
                    return <Component {...props}/>;
                } else {
                    return ( <Redirect 
                        to={{
                            pathname: "login",
                            state: {
                                form: props.location
                            }
                        }}
                    />
                    )
                }
            }}
        />
    );
}

export default ProtectedRoute;
