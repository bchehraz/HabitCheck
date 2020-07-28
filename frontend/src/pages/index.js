import React from "react"

import Layout from "../components/landing/Layout"
import SEO from "../components/seo"
import Landing from "../components/landing/Landing"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Landing />
  </Layout>
)

export default IndexPage
