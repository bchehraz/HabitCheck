import React from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
import GraphicSVG from "../../images/undrawGraphic.svg"

const Outer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  margin: 2rem auto 1rem;
  padding: 0 10px;
`

const Container = styled.div`
  display: flex;
  flex-flow: row-reverse nowrap;
  justify-content: center;
  align-items: center;
`

const ImgContainer = styled.div`
  display: none;

  img {
    margin: 0;
    background-size: cover;
  }

  @media only screen and (min-width: 768px) {
    display: block;
    width: 100%;
    padding-right: 1em;
  }
`

const BodyContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  h1 {
    text-align: center;
  }
`

const Header = styled.h1`
  ${props => props.full && "display: none;"}
    ${props => !props.full && "display: block;"}
  @media only screen and (min-width: 768px) {
    ${props => props.full && "display: block;"}
    ${props => !props.full && "display: none;"}
  }
`

const Body = styled.section`
  max-width: 300px;
  min-width: 257px;
  padding: 3rem 0;

  h3 {
    font-size: 24px;
    white-space: nowrap;
  }

  .bold {
    font-weight: bold;
  }

  h5 {
    font-weight: normal;
    font-style: italic;
    margin: 0;
  }

  h5 .bold {
    font-weight: 600;
  }
`

const Desc = styled.div`
  padding: 1em;
`

const ActionContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media only screen and (min-width: 768px) {
    flex-flow: row wrap;

    .secondary {
      margin-left: 1rem;
    }
  }
`

const Button = styled.button`
  height: 50px;
  max-width: 300px;
  min-width: 257px;
  width: 100%;
  border: 2px solid #66C7F4;
  background-color: #66C7F4;
  border-radius: 17px;
  cursor: pointer;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.29);
  transition: background-color 150ms linear;
  margin: 0.25em;
  font-weight: bold;
  color: white;
  font-size: 1.25rem;

  :focus {
    background-color: color(#66C7F4 lightness(-20%));
  }

  &&.secondary {
    background-color: white;
    color: #66C7F4;
  }
`

const Landing = () => (
  <Outer>
    <Header className="landing" full>Change Your Life, One Day at a Time</Header>
    <Header className="landing">Change Your Life,<br />One Day at a Time</Header>
    <Container>
      <BodyContainer>
        <Body>
          <h3>1. <span className="bold">Add Habits</span></h3>
          <Desc>
            <h5><span className="bold">New Habits</span> to learn</h5>
            <h5><span className="bold">Old Habits</span> to kick</h5>
          </Desc>

          <h3>2. <span className="bold">Check In</span></h3>
          <Desc>
            <h5>Each day you accomplish your goal, let the app know!</h5>
          </Desc>

          <h3>3. <span className="bold">View Your Progress</span></h3>
          <Desc>
            <h5>See yourself transform into the person you want to be!</h5>
        </Desc>

          <h3>4. <span className="bold">???</span></h3>
          <Desc></Desc>
          <h3>5. <span className="bold">Profit</span></h3>
        </Body>
      </BodyContainer>
      <ImgContainer>
        <img src={GraphicSVG} alt="graphic" />
      </ImgContainer>
    </Container>
    <ActionContainer>
      <Button
        onClick={() => navigate("/app/sign-up")}
      >
        Get Started
      </Button>
      <Button
        className="secondary"
        onClick={() => navigate("/app/login")}
      >
        Log In
      </Button>
    </ActionContainer>
  </Outer>
)

export default Landing