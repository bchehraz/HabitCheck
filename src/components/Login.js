import React from "react"
import { Link } from "gatsby"
import { AuthConsumer } from "../context/auth-context"
import { login } from "../utils/auth"

const Login = () => (
  <AuthConsumer>
    {context => (
      <div>
        <h2>{`You must be logged in to use the app!`}</h2>

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
            {`Click here to log in!`}
          </Link>
        </h2>

        <Link to="/">Go Home</Link>
      </div>
    )}
  </AuthConsumer>
)

export default Login
