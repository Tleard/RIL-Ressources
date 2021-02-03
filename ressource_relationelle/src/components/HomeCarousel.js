import React from 'react'

// Material UI import
import Paper from "@material-ui/core/Paper";

// Material UI Carousel library import
import Carousel from "react-material-ui-carousel";

function HomeCarousel(props) {
    
    var items = [
        {
            name: "Bienvenu sur Ressource Relationnelle",
            description: "Une plateforme Citoyenne",
            image: "https://picsum.photos/1400/400"
        },
        {
            name: "Partagez des ressources",
            description: "Renforcez la solidatrité autour de soi",
            image: "https://picsum.photos/1400/400"
        },
        {
            name: "En apprendre plus",
            description: "Augmentez ses compétences",
            image: "https://picsum.photos/1400/400"
        }
    ]

    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

// This determines how the carousel will display
function Item(props)
{
    return (
      <Paper>
        <div
          style={{
            backgroundImage: "url(" + `${props.item.image}` + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h2>{props.item.name}</h2>
          <p>{props.item.description}</p>
        </div>
      </Paper>
    );
}

export default HomeCarousel
