import React from "react";
import styled from "styled-components"

const Container = styled.div`
  height: 25px;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    font-weight: 400;
    font-size: 0.75em;
  }

  height: 50px;
  margin-top: -50px;
  clear: both;
  position: relative;
`

const Footer = () => (
  <Container>
    <h3>
      {`Made by Babak Chehraz `}&copy;{` ${new Date().getFullYear()}`}
    </h3>
  </Container>
)

export default Footer;