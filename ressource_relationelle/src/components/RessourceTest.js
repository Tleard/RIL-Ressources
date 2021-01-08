import React, { useState, useEffect, useCallback } from 'react';

const accessToken = JSON.parse(localStorage.getItem('auth_token'));
//console.log(accessToken);

const apiUrl = 'localhost:8000/api';


const RessourceTest = () => {

    const [resources, setResources] = useState([]);
    const [requestError, setRequestError] = useState();
    
    useEffect(() => {
        fetch('http://localhost:8000/api/resources', {
                method:'get',
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json',
                    'Authorization':`Bearer ${accessToken}`
                },
                //body: JSON.stringify(payload)
            })
            .then(res=>res.json())
            .then((data)=>{
                console.log(data);
            })
    })

    return(
        <div>
            <h3>Web API in react functional component</h3>
            {/* <button onClick={() => fetchData()}>Get Ressources</button> */}
            {requestError && <p className="error">{}{requestError}</p>}
        </div>

        
    );
}

export default RessourceTest;
