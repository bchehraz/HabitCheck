import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const ButtonContainer = styled.div`
  margin-bottom: 14px;
  padding: 10px;
  width: 327px;
  height: ${({ formOpen }) => (formOpen) ? "180px" : "53px"};

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;

  border: 2px solid #2D3142;
  border-radius: 17px;
  background-color: #2D3142;
  color: white;

  -webkit-transition: all 300ms ease-out;
  -moz-transition: all 300ms ease-out;
  -ms-transition: all 300ms ease-out;
  -o-transition: all 300ms ease-out;
  transition: all 300ms ease-out;

  .iconContainerClose {
    -moz-transform: translateX(120px);
    -webkit-transform: translateX(120px);
    -o-transform: translateX(120px);
    -ms-transform: translateX(120px);
    transform: translateX(120px);
  }
`;

const IconContainer = styled.div`
  padding: 10px;
  padding: ${({ formOpen }) => formOpen && '5px 10px' || 0};
  position: absolute;;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  -webkit-transition: all 300ms ease-out;
  -moz-transition: all 300ms ease-out;
  -ms-transition: all 300ms ease-out;
  -o-transition: all 300ms ease-out;
  transition: all 300ms ease-out;

  .icon {
    -webkit-transition: all 300ms ease-out;
    -moz-transition: all 300ms ease-out;
    -ms-transition: all 300ms ease-out;
    -o-transition: all 300ms ease-out;
    transition: all 300ms ease-out;
  }

  .iconClose {
    -moz-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const FormContainer = styled.form`
  margin-top: 2rem;
  padding: 10px 1rem;
  width: 100%;
  opacity: ${({ formOpen }) => formOpen ? 1 : 0};
  -webkit-transition: all ${({ formOpen }) => formOpen ? '600ms' : '300ms'} ease-out;
  -moz-transition: all ${({ formOpen }) => formOpen ? '600ms' : '300ms'} ease-out;
  -ms-transition: all ${({ formOpen }) => formOpen ? '600ms' : '300ms'} ease-out;
  -o-transition: all ${({ formOpen }) => formOpen ? '600ms' : '300ms'} ease-out;
  transition: all ${({ formOpen }) => formOpen ? '600ms' : '300ms'} ease-out;
`;

const TextInput = styled.input`
  padding: 10px 5px;
  width: 100%;
  margin: 0 auto;
  font-weight: 600;
  ${({ error }) => error && 'border: 1px solid red;'}
  ::placeholder {
    ${({ error }) => error && 'color: red;'}
  }
`;

const Button = styled.button`
  color: white;
  background-color: #8ACB88;
  font-weight: bold;
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  border-radius: 6px;

  :active {
    outline: 1;
  }
`;

/*

  TODO: Figure out what is meant to be an onClick listener in this case.
  * For the sake of animating the ButtonContainer to an open state, the ButtonContainer must continue to be what is the container for the form. However, since the onClick container is the entire length/width of the form container once it's open, perhaps the onclick could just return false and only close if a new habit is added or if the X button is pushed

*/

  /*
    TODO: add a form which onClick will trigger a contextual function which will be passed down from parent component(s), either HabitList or Today...

    TODO: Figure out what functions need to be added into context and figure out if AuthContext should be changed out for UserContext which would include all user data in general.
    - functions could be;
      -
  */

const validForm = (formInput) => {
  const { title } = formInput;
  return title && title !== "";
}

const AddHabitButton = ({ handleAddHabit }) => {
  const initState = {
    title: "",
  }

  const [formOpen, setFormOpen] = useState(false);
  const [formInput, setFormInput] = useState(initState);
  const [error, setError] = useState(false);

  console.log(formInput.title);
  return (
    <ButtonContainer formOpen={formOpen} onClick={() => {
      if (!formOpen) {
        console.log("<Action> Add Habit Button was clicked!");
        setFormOpen(true);
      }
    }}>
      <FormContainer formOpen={formOpen}>
        <TextInput type="text"
          value={formInput.title}
          onChange={(e) => {
            setFormInput({ ...formInput, title: e.target.value });
          }}
          placeholder="Habit Title"
          error={error}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            if (validForm(formInput)) {
              handleAddHabit(formInput.title);
              setError(false);
              setFormOpen(false);
              setFormInput(initState);
            } else {
              setError(true);
            }
          }}
        >
          {`Start New Habit`}
        </Button>
      </FormContainer>

      <IconContainer
        formOpen={formOpen}
        className={(formOpen) && "iconContainerClose"}
        onClick={() => {
          if (formOpen) {
            setFormOpen(false);
            setError(false);
            setFormInput(initState);
          }
        }}
      >
        <FaPlus
          size={25}
          className={(formOpen) && "icon iconClose" || "icon"}
        />
      </IconContainer>
    </ButtonContainer>
  );
}

AddHabitButton.propTypes = {
  handleAddHabit: PropTypes.func.isRequired,
}

export default AddHabitButton;
