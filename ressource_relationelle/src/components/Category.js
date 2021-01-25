// This compenent contains the resources of a category
import React from 'react'
import auth from '../auth'
import { useState, useEffect } from 'react'

function Category(props) {
  const { category } = props.location.state;
  //console.log(category);

  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      const getResources = async () => {
        const resourcesFromServer = await fetchResources();
        setResources(resourcesFromServer);
      };

      getResources();

    }
  }, []);

  // Fetch Resources
  const fetchResources = async () => {
    const res = await fetch(`${global.api}/api/resources/category/${category.name}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
    });
    const data = await res.json();

    return data;
  };

  console.log(resources);
  
  return (
    <div>
      <h1>This is a Category for now !</h1>
      {resources.map((resource) => (
          <div>
            <p>{resource.title}</p>
            <p>{resource.description}</p>
          </div>
      ))}
    </div>
  );
}

export default Category
