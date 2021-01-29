// Component containing a chosen ressource
import React from 'react'
import { useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import "./Resource"
import auth from '../auth'
import ResourceCardDetail from './ResourceCardDetail'

function Resource(props) {
    const { id } = props.location.state;
    //console.log(id);

    const [resource, setResource] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("auth_token")) {
          const getResources = async () => {
            const resourcesFromServer = await fetchResource();
            setResource(resourcesFromServer);
          };
    
          getResources();
          
        }
      }, []);

    // Fetch One Ressource
    const fetchResource = async () => {
        const res = await fetch(`${global.api}/api/resources/${id}`, {
            method: "get",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              Authorization: `Bearer ${auth.getToken()}`,
            },
        })
        const data = await res.json()
    
        return data;
    }
    console.log(resource[0]);
    //console.log(resource[0].id);


    return (
        <>
            <Container>
                <h1>This is only ONE resource.</h1>
                <ResourceCardDetail {...resource[0]}/>
            </Container>
        </>
    )
}

export default Resource
