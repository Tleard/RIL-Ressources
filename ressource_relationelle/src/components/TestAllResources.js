import React from 'react'
import { useState, useEffect } from 'react'
import auth from '../auth'

function TestAllResources() {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      const getResources = async () => {
        const resourcesFromServer = await fetchResources();
        setResources(resourcesFromServer);
      };

      // No endpoint yet
      // const getCategories = async() => {
      //   const categoriesFromServer = await fetchCategories();
      //   setCategories(categoriesFromServer)
      // }

      // Getting
      getResources();
      //getCategories()
    }
  }, []);

  // Fetch Resources
  const fetchResources = async () => {
    const res = await fetch(`${global.api}/api/resources`, {
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

  // Fetch Categories *NO Endpoint yet*
  // const fetchCategories = async() => {
  //   const res = await fetch(`${global.api}/api/resources`, {
  //     method: "get",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-type": "application/json",
  //       Authorization: `Bearer ${auth.getToken()}`,
  //     },
  // })
  // const data = await res.json()

  // return data;
  // }

  console.log(resources);
  return (
    <div>
      <h1>This is a page test for all resources</h1>
      {resources.map((resource) => (
          <div>
            <p>{resource.title}</p>
            <p>{resource.description}</p>
          </div>
      ))}
    </div>
  );
}

export default TestAllResources
