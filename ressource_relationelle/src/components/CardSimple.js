// Carte simple pour placer une image avec Overlay d'un texte

import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './CardSimple.css';

const CardSimple = (props) => {
  return (
    <div className="card-simple-wrap">
      <Card>
        <CardImg top width="100%" src="https://picsum.photos/id/8/200/150" alt="Card image cap" className=""/>
            <div className="card-simple-description">
                <span className="card-simple-description-text">Ma Catégorie</span>
            </div>
      </Card>
    </div>
  );
};

export default CardSimple;