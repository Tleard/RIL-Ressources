// This compenent contains the resources of a category
import React from 'react';
import auth from '../auth';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import ResourceCard from './ResourceCard';

function Category(props) {
  // The category object that we get is used to get the correct resources
  const { category } = props.location.state;

  const [resources, setResources] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState([]);


  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      const getResources = async () => {
        const resourcesFromServer = await fetchResources();
        setResources(resourcesFromServer);
      };

      setCategoryTitle(category.name);

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
    <>
      <Container>
        <h1>This is Category Page for : {categoryTitle} </h1>
        <Row>
          <Col>
            {typeof resources[0] !== "string" ?
              resources.map((resource) => (
                <ResourceCard 
                  key={resource.id}
                  id={resource.id}
                  username={resource.author.username}
                  createdAt={resource.createdAt}
                  title={resource.title}
                  description={resource.description}
                />
              ))
              : <Alert color="secondary">Cette catégorie n'a pas encore de ressource</Alert>
            }
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Category
