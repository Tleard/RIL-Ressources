// Component Footer

import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Form, FormGroup, Label, Input, Container, Row, Col 
} from 'reactstrap';
import './Footer.css';

const Footer = (props) => {
  return (
    <div>
        <Row>
            <Col>
                <p>Logo</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui possimus, placeat maxime nam numquam natus commodi doloribus voluptatum ipsum est nesciunt fugiat dolorum sed illum earum ullam debitis eveniet! Autem.</p>
            </Col>
            <Col>
                <p>Citation</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur asperiores ullam debitis ducimus doloremque ab in cumque animi. Accusantium iure eligendi, minus voluptatibus molestias distinctio quas tenetur perspiciatis in incidunt!</p>
            </Col>
            <Col>
                <p>Contact</p>
                <Form>
                    <FormGroup>
                        <Input type="email" name="email" id="email" placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="subject" id="subject" placeholder="Subject" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="textarea" name="message" id="message" placeholder="Votre message" />
                    </FormGroup>
                    <Button color="primary">Submit</Button>
                </Form>
            </Col>
        </Row>
    </div>
  );
};

export default Footer;
