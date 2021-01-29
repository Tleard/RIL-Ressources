// Card which contains an introduction to a resource. Mainly used in the Category.js component

import React from 'react'
import Btn from './Btn'
import { Link } from 'react-router-dom'
import './ResourceCard.css'

function ResourceCard({id, username, createdAt, title, description}) {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return (
        <div className="resource-card">
            <div className="resource-card-header">
                <h2>{title}</h2>
                <div>
                    <span className="margin-x">par : <span className="bold">{username}</span></span>
                    <span className="margin-x">{`${day}/${month}/${year}`}</span>
                </div>         
            </div>
            <span className="line"></span>
            <div className="resource-card-center">
                <p>{description}</p>
            </div>
            <div className="resource-card-footer">
                <Link key={id} to={{pathname: "category/resource", state: {id: id}}}>
                    <Btn key={id} bgColor={'#0b256b'} foColor={'#ffffff'} text={'Consulter'} />
                </Link>
            </div>
        </div>
    )
}

export default ResourceCard
