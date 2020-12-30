// Component de NewsLetter

import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Form, FormGroup, Label, Input, Container, Row, Col 
} from 'reactstrap';
import './NewsLetter.css';

const NewsLetter = (props) => {
  return (
    <div className="newsletter">
    <Container>
      <h2>Inscrivez-vous à notre Newsletter</h2>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo mollitia obcaecati provident. Sed, quibusdam voluptatum aspernatur dolores alias reprehenderit sint sequi veniam eaque magnam, porro suscipit dolore quia eos? Eum?</p>
      <Form>
        <FormGroup>
          <Row>
            <Col sm="10">
              <Input type="email" name="email" id="exampleEmail" placeholder="Email"/>
            </Col>
            <Col sm="2">
              <Button color="primary">Submit</Button>
            </Col>           
          </Row>
        </FormGroup>
      </Form>
    </Container>
    </div>
  );
};

export default NewsLetter;
