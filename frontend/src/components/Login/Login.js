import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import PropTypes from 'prop-types'
import styled from "styled-components"

import { Form } from './'
import AuthContext from "../../context/auth-context"
import { login, createUser } from "../../utils/auth"

const LoginContainer = styled.div`
  margin: 2rem auto 3rem;
  padding: 0 10px;
  max-width: 768px;
`

const LOGIN_ERRORS = {
  loginFail: "Email or password is incorrect",
  signUpFail: "Email already signed up",
  emptyEmail: "Enter your email",
  emptyPassword: "Enter your password",
  emptyFields: "Invalid Login",
}

const SUCCESS_LABEL = {
  signUp: 'Done! Logging in...',
  login: 'Authenticated!',
}

const Login = (props) => {
  const context = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signUp, setSignUp] = useState(props.signUp)
  const [error, setError] = useState(null)
  const [selectable, setSelectable] = useState(true)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleUpdate = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value)
    } else if (e.target.name === "password") {
      setPassword(e.target.value)
    }
  }

  const getLoginError = (emailInput, passwordInput) => {
    if (!emailInput) {
      if (!passwordInput) {
        return LOGIN_ERRORS.emptyFields
      }
      return LOGIN_ERRORS.emptyEmail
    } else if (!passwordInput) {
      return LOGIN_ERRORS.emptyPassword
    }
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const error = getLoginError(email, password)
    setError(error)

    if (error) {
      return false;
    }

    setSelectable(false)
    setLoading(true)

    let authData;
    if (signUp) {
      authData = await createUser(email, password)
    } else {
      authData = await login(email, password);
    }

    if (!authData) {
      setSelectable(true)
      setLoading(false)
      setError(signUp ? LOGIN_ERRORS.signUpFail : LOGIN_ERRORS.loginFail)
      return;
    }

    const { token, userId, data, preferences } = authData;

    setSelectable(true)
    setLoading(false)
    setSuccess(true)

    window.setTimeout(() => context.login(token, userId, email, data, preferences), 1000)
  }

  const switchForm = (e) => {
    e.preventDefault()
    setSignUp(!props.signUp)

    if (!signUp) {
      navigate('/app/sign-up')
    } else {
      navigate('/app/login')
    }
  }

  const getResponse = () => {
    if (error) {
      return <p className="error">{error}</p>
    } else if (success) {
      return <p className="success">{signUp ? SUCCESS_LABEL.signUp : SUCCESS_LABEL.login}</p>
    }
    return null;
  }

  const response = getResponse()

  return (
    <LoginContainer>
      <h2 style={{ textAlign: 'center'}}>{props.signUp ? 'Become a Member' : 'Log In'}</h2>
      <Form
        handleSubmit={e => handleSubmit(e)}
        handleUpdate={e => handleUpdate(e)}
        signUp={props.signUp}
        switchForm={e => switchForm(e)}
        email={email}
        password={password}
        selectable={selectable}
        response={response}
        isLoading={loading}
        success={success}
      />
    </LoginContainer>
  )
}

Login.propTypes = {
  signUp: PropTypes.bool,
}

Login.defaultProps = {
  signUp: false,
}

export default Login
