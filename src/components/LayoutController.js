import React from "react"
import PropTypes from "prop-types"

import Layout from "./landing/layout"
import AppLayout from "./AppLayout";

import { AuthConsumer } from '../context/auth-context.js';

const LayoutController = ({ children }) => {
  return (
    <AuthConsumer>
      {context => (
        (context.token)
        ? (<AppLayout>{children}</AppLayout>)
        : (<Layout>{children}</Layout>)
      )}
    </AuthConsumer>
  )
}

LayoutController.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutController;
