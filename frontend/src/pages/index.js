import React from "react"

import Layout from "../components/Landing/Layout"
import SEO from "../components/seo"
import Landing from "../components/Landing/Landing"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Landing />
  </Layout>
)

export default IndexPage
