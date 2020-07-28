import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";

import Spinner from "../Spinner/"

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-start;
  
  @media only screen and (min-width: 500px) {
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: center;
  }

  input {
    font-size: 1rem;
    padding: 0.5rem;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  input[type="submit"],
  button {
    background-color: #66C7F4;
    border-radius: 17px;
    border: 2px solid #66C7F4;
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0.5rem auto 0;
    padding: 0.25rem 1rem;
    padding: 0.5rem 1rem;
    transition: background-color 150ms linear;
    width: 100%;
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.29);
    cursor: pointer;
  }

  input[type="submit"]:active,
  input[type="submit"]:hover,
  input[type="submit"]:focus,
  button:active,
  button:hover,
  button:focus {
    background-color: color(#66C7F4 lightness(-20%));
  }
`

const Column = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  min-width: 50%;

  :nth-child(2) {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    div {
      padding: 2.5rem;
    }
  }
`

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 0 0;
`;

const ResponseMessage = styled.div`
  width: 100%;
  text-align: center;

  .success, .error {
    color: #8ACB88;
    width: 100%;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    border-radius: 17px;
  }

  .error {
    color: #AA4465;
  }
`;

const CustomForm = styled.form`
  margin: 0 auto;
  width: 100%;

  label {
    display: block;
    font-size: 67.5%;
    letter-spacing: 0.125em;
    text-transform: uppercase;
  }

  label + label {
    margin-top: 0.5rem;
  }
`

const Form = ({
  handleSubmit,
  handleUpdate,
  signUp,
  switchForm,
  email,
  password,
  selectable,
  response,
  isLoading,
  success,
}) => {
  return (
    <Container>
      <Column>
        <CustomForm
          method="post"
          onSubmit={e => handleSubmit(e)}
        >
          <label>
            Email
            <input
              type="email"
              name="email"
              onChange={handleUpdate}
              value={email}
              disabled={!selectable}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              onChange={handleUpdate}
              value={password}
              disabled={!selectable}
            />
          </label>

          <SubmitContainer>
            {!isLoading ? (
              !success && (
                <input
                  type="submit"
                  value={(signUp) ? 'Sign Up' : 'Log In'}
                />
              )
            ) : (
              <Spinner style={{ margin: '0 auto' }} />
            )}
            <ResponseMessage>
              {response}
            </ResponseMessage>
          </SubmitContainer>
        </CustomForm>
      </Column>
      <Column>
        <div style={{ whiteSpace: 'nowrap' }}>
          {(signUp) ? "Already a member? " : "Still not a member? "}
        </div>

        <button
          onClick={switchForm}
        >
          {(signUp) ? 'Login' : `Sign Up`}
        </button>
      </Column>
    </Container>
  )
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  signUp: PropTypes.bool.isRequired,
  switchForm: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  selectable: PropTypes.bool.isRequired,
  response: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
}

export default Form;