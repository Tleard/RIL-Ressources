import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../auth";
import userlib from "../userLibraryFunctions";
import moment from 'moment';
import 'moment/locale/fr';

// MaterialUI import
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// MaterialUI Icon Import
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ReportIcon from "@material-ui/icons/Report";
import DeleteIcon from "@material-ui/icons/Delete";

// MaterialUI Lab
import { Alert, AlertTitle } from "@material-ui/lab";

function UserLibrary() {
  const [libResources, setLibResources] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      const getResource = async () => {
        const resourceFromServer = await fetchResource();
        setLibResources(resourceFromServer);
      };

      getResource();
    }
  }, []);

  const fetchResource = async () => {
    const res = await fetch(`${global.api}/api/user/getLib`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
    });
    const data = await res.json();

    return data;
  };

  return (
    <>
      <Typography variant="h2" component="h1" style={{ margin: "4% 0 4% 0" }}>
        Ma Bibliothèque
      </Typography>
      <Grid container spacing={3}>
        {!libResources.message ? (
          libResources.map((resource) => {
            const date = new Date(resource.createdAt);

            return (
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardHeader
                    title={resource.title}
                    subheader={`${resource.author.username} - ${moment(date).format('L')}`}
                  />
                  <CardContent>{resource.description}</CardContent>
                  <CardActions style={{ justifyContent: "flex-end" }}>
                    <IconButton aria-label="share">
                      <DeleteIcon
                        onClick={() => {
                          userlib.removeFromLibrary(resource.id);
                          const getResource = async () => {
                            const resourceFromServer = await fetchResource();
                            setLibResources(resourceFromServer);
                          };

                          getResource();
                        }}
                      />
                    </IconButton>
                    <Button size="medium" color="primary">
                      <Link
                        key={resource.id}
                        //to={{pathname: "category/resource", state: {id: resource.id}}}
                        to={{
                          pathname: "resource",
                          hash: `${resource.id}`,
                        }}
                      >
                        Consulter
                      </Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Alert severity="info">
            <AlertTitle>Attention</AlertTitle>
            Votre bibliothèque est vide
          </Alert>
        )}
      </Grid>
    </>
  );
}

export default UserLibrary;
