import React from "react";
import { Container, Row, Col } from "reactstrap";
import Navigation from "./Navigation";
import MyCarousel from "./MyCarousel";
import ContentContainer from "./ContentContainer";
import CardVer from "./CardVer";
import CardSimple from "./CardSimple";
import CardHor from "./CardHor";
import Newsletter from "./NewsLetter"
import "./Home.css";

function Home() {
  return (
    <>
      <MyCarousel />

      <ContentContainer>
        <Container>
          <Row>
            <Col>
              <CardSimple/>
            </Col>
            <Col>
              <CardSimple/>
            </Col>
            <Col>
              <CardSimple/>
            </Col>
          </Row>
        </Container>
      </ContentContainer>

      <ContentContainer>
        <Container>
          <h2>Populaires</h2>
          <CardHor />
          <CardHor />
          <CardHor />
        </Container>
      </ContentContainer>


      <ContentContainer>
        <Container>
          <h2>Derniers articles</h2>
          <Row>
            <Col>
              <CardVer />
            </Col>
            <Col>
              <CardVer />
            </Col>
            <Col>
              <CardVer />
            </Col>
          </Row>
        </Container>
      </ContentContainer>

      <ContentContainer>
          <Newsletter />
      </ContentContainer>
    </>
  );
}

export default Home;
