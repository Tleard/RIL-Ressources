// Modèle de carte horizontale pour prendre toute la largeur

import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Container, Row, Col } from "reactstrap";
import './CardHor.css';

const CardVer = (props) => {
  return (
    <div className="cardhor-container">
      <Row>
          <Col xs="4">
            <img src="https://picsum.photos/id/12/350/200" alt="#"/>
          </Col>
          <Col xs="8">
            <p>Esse dolore fugiat deserunt nulla. Laborum eu veniam reprehenderit ipsum veniam anim mollit adipisicing commodo. Commodo fugiat est nisi occaecat incididunt magna proident laborum qui elit ea. Reprehenderit irure fugiat labore commodo esse ullamco nulla mollit reprehenderit aute aliquip dolore esse reprehenderit.</p>
          </Col>
      </Row>
    </div>
  );
};

export default CardVer;
