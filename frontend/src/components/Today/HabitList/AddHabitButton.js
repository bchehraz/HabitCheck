import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FaPlus } from "react-icons/fa"
import { BsCheck } from "react-icons/bs"

import Backdrop from "../../Backdrop"

const Container = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: ${({ formOpen }) => (formOpen ? "180px" : "53px")};

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  border: 2px solid #2d3142;
  border-radius: 17px;
  background-color: #2d3142;
  color: white;

  transition: all 300ms ease-out;
  z-index: 10;

  @media only screen and (min-width: 450px) {
    height: ${({ formOpen }) => (formOpen ? "119px" : "53px")};
  }

  @media only screen and (min-width: 768px) {
    height: 119px;
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.29);
    background: linear-gradient(97.52deg, #66c7f4 0%, #8acb88 100%);
    border: none;
  }

  @media only screen and (min-width: 1024px) {
    height: 135px;
  }

  @media only screen and (min-width: 1440px) {
    height: 150px;
  }
`

const IconContainer = styled.div`
  position: absolute;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  transition: all 300ms ease-out;
  opacity: ${props => (props.formOpen ? 0 : 1)};

  .icon {
    width: 25px;
    height: 25px;
  }

  @media only screen and (min-width: 768px) {
    .icon {
      width: 40px;
      height: 40px;
    }
  }
`

const FormContainer = styled.form`
  display: flex;
  flex-flow: column nowrap;
  z-index: 10;
  width: 100%;
  padding: 1rem;

  transition: all 150ms ease-out;
  margin: 0 auto;

  transform: translateY(75px);

  opacity: 0;
  visibility: hidden;

  ${props =>
    props.formOpen &&
    `
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
    transform: translateX(0);
    transition: all 300ms ease-out;
  `}

  @media only screen and (min-width: 768px) {
    transform: translateY(0);
    ${props =>
      props.formOpen &&
      `
      visibility: visible;
      opacity: 1;
      transition: all 300ms ease-out;
    `}
  }
`

const FormSection = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 10px;

  @media only screen and (min-width: 450px) {
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
`

const TextInput = styled.input`
  padding: 10px 5px;
  width: 100%;
  background-color: #6f789d;
  color: white;
  border-bottom: 2px solid #8acb88;

  ${({ error }) =>
    error &&
    `
    border-bottom: 3px solid #AA4465;
  `}

  @media only screen and (min-width: 450px) {
    padding: 10px 10px;
    color: #2d3142;
    font-weight: 600;
  }

  @media only screen and (min-width: 768px) {
    font-size: 1.2em;
    background-color: white;
  }
`

const SubmitButton = styled.button`
  color: white;
  background-color: #8acb88;
  width: 100%;
  margin-top: 10px;
  padding: 5px;

  .buttonIcon {
    width: 30px;
    height: 30px;
  }

  @media only screen and (min-width: 450px) {
    width: auto;
    padding: 0;
    margin-top: 0;
    margin-left: 10px;
    background-color: rgba(0, 0, 0, 0);

    .buttonIcon {
      width: 40px;
      height: 100%;
      color: #8acb88;
    }
  }

  @media only screen and (min-width: 768px) {
    .buttonIcon {
      color: #fff;
    }
  }
`

const Header = styled.h4`
  color: white;
  margin: 0;
  text-align: left;
`

const validForm = formInput => {
  const { title } = formInput
  return title && title !== "" && title.length <= 64
}

const AddHabitButton = ({ handleAddHabit, onNewHabitAdded }) => {
  const initState = {
    title: "",
  }

  const [formOpen, setFormOpen] = useState(false)
  const [formInput, setFormInput] = useState(initState)
  const [error, setError] = useState(false)
  const textInput = useRef(null)

  const onFormOpen = () => {
    if (!formOpen) {
      setFormOpen(true)

      // Due to Form goes from hidden to visible,
      // input focus() won't work if the function is run immediately after
      // this is the solution for the time being
      window.setTimeout(() => {
        textInput.current.focus()
      }, 300)
    }
  }

  const onFormClose = () => {
    if (formOpen) {
      setFormOpen(!formOpen)
      setError(false)
      setFormInput(initState)
    }
  }

  const onTextChange = e => {
    const { value } = e.target
    setError(!(value.length <= 64))
    setFormInput({ ...formInput, title: e.target.value })
  }

  return (
    <div>
      <Container
        className="addHabitButton"
        formOpen={formOpen}
        onClick={onFormOpen}
      >
        <FormContainer formOpen={formOpen} className="form">
          <Header formOpen={formOpen}>{"New Habit"}</Header>

          <FormSection>
            <TextInput
              className="habitTitleInput"
              type="text"
              value={formInput.title}
              onChange={onTextChange}
              error={error}
              ref={textInput}
            />

            <SubmitButton
              onClick={e => {
                e.preventDefault()
                if (validForm(formInput)) {
                  handleAddHabit(formInput.title)
                  setError(false)
                  setFormOpen(false)
                  setFormInput(initState)
                  onNewHabitAdded()
                } else {
                  setError(true)
                }
              }}
            >
              <BsCheck className="buttonIcon" />
            </SubmitButton>
          </FormSection>
        </FormContainer>

        <IconContainer
          formOpen={formOpen}
          className={(formOpen && "iconContainerClose") || "iconContainerOpen"}
          data-testid="AddHabitButtonClose"
        >
          <FaPlus className="icon" />
        </IconContainer>
      </Container>
      <Backdrop onClick={onFormClose} enabled={formOpen} zIndex={9} />
    </div>
  )
}

AddHabitButton.propTypes = {
  handleAddHabit: PropTypes.func.isRequired,
  onNewHabitAdded: PropTypes.func.isRequired,
}

export default AddHabitButton
