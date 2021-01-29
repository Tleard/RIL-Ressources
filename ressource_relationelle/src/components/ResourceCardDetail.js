import React from 'react'
import "./ResourceCardDetail.css"

function ResourceCardDetail(props) {
    // The resource is passed as an object accessible via the props
    console.log('inside ResourceCardDetail')
    console.log(props);
    //console.log(props.author.username);

    const date = new Date(props.createdAt);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return (
        <div className="resource-detail-card">
            <div className="resource-detail-card-header">
                <h2>{props.title}</h2>
                <div>
                    {props.author && props.author.username ? <span className="margin-x">par : <span className="bold">{props.author.username}</span></span> : 'Some error happened'}
                    <span className="margin-x">{`${day}/${month}/${year}`}</span>                        
                </div>     
            </div>
            <span className="line"></span>
            <div className="resource-detail-card-center">
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default ResourceCardDetail
