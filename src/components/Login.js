import React from "react"
import { Link } from "gatsby"
import { AuthConsumer } from "../context/auth-context"
import { login } from "../utils/auth"

const Login = () => (
  <AuthConsumer>
    {context => (
      <div style={{ padding: 20 }}>
        <h2>{`You must log in to use the app`}</h2>
        <p>This is a fake login page demonstrating client-only routing</p>

        <h2>
          <Link
            to="/"
            onClick={e => {
              e.preventDefault()
              //call login via src/utils/auth
              const {
                token,
                userId,
                tokenExpiration,
                email,
                data,
                preferences,
              } = login()
              //then call login on the context to complete login
              //the context for login calls onLoginSuccess
              // which will store user data into the cache
              context.login(
                token,
                userId,
                tokenExpiration,
                email,
                data,
                preferences
              )
            }}
          >
            {`(just click here)`}
          </Link>
        </h2>

        <Link to="/">or go home</Link>
      </div>
    )}
  </AuthConsumer>
)

export default Login
