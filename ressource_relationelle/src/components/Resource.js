// Component containing a chosen ressource
import React from 'react'
import { useState, useEffect } from 'react'
import "./Resource"
import auth from '../auth'

function Resource() {
    const [resource, setResource] = useState([])

    useEffect(() => {
        const getResource = async() => {
            const resourceFromServer = await fetchResource();
            setResource(resourceFromServer)
        }
    })

    // Fetch One Ressource
    const fetchResource = async () => {
        const res = await fetch(`${global.api}/api/resources/0bf05122-5daf-11eb-bc20-080027402d1d`, {
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

    console.log(resource);


    return (
        <div>
            
        </div>
    )
}

export default Resource
