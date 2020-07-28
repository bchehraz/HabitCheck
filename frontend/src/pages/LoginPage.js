import React from "react";
import PropTypes from "prop-types"

import Layout from "../components/landing/Layout"
import { Login } from "../components/Login"

const LoginPage = ({ signUp }) => (
  <Layout>
    <Login signUp={signUp} />
  </Layout>
)

LoginPage.propTypes = {
  signUp: PropTypes.bool,
}

export default LoginPage