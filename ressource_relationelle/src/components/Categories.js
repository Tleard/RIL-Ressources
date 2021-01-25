// Component which contains all the categories
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import auth from "../auth";
import { Container, Row, Col } from "reactstrap";
import CategoryCard from "./CategoryCard";
import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      const getCategories = async() => {
        const categoriesFromServer = await fetchCategories();
        setCategories(categoriesFromServer)
      }

      // Getting
      getCategories()
    }
  }, []);

  // Fetch Categories
  const fetchCategories = async() => {
    const res = await fetch(`${global.api}/api/resources_category`, {
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

  console.log(categories);

  return (
    <>
      <Container>
        <h1>C'est bien la page catégorie !</h1>
        <Row>
          {categories.map((category) => (
            <Col sm="6">
              <Link to={{pathname: "/category", state: {category: category}}}>
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  status={category.status}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Categories;