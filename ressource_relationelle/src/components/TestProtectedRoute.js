// Component to remove later, just for test purposes
import React, { Component } from 'react';
import auth from '../auth';
import { useJwt } from 'react-jwt';

const TestProtectedRoute = (props) => {

    const { decodedToken, isExpired } = useJwt(auth.getToken());
    console.log(decodedToken);
    console.log(isExpired);

    return (
        <>
            <h1>This is a protected route</h1>
        </>
    );
}

export default TestProtectedRoute;