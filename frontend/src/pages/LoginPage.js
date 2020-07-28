import React from "react";

import Layout from "../components/Landing/Layout"
import { Login } from "../components/Login"

const LoginPage = ({ signUp }) => (
  <Layout>
    <Login signUp={signUp} />
  </Layout>
)

export default LoginPage