// Component which contains all the categories
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import auth from "../auth";

// MaterialUI import
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';


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

  return (
    <>
    <Typography variant="h2" component="h1" style={{margin:"4% 0 4% 0"}}>
      Categories
    </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h3"
                  component="h2"
                  style={{ textAlign: "center" }}
                >
                  <Link
                    key={category.id}
                    to={{
                      pathname: "category",
                      hash: `${category.name}`
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    {category.name.toUpperCase()}
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Categories;