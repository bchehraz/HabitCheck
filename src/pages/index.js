import React from "react"

import Layout from "../components/landing/layout"
import Image from "../components/landing/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div style={{ padding: 20 }}>
      <h2>Early Access Coming Soon!</h2>
      <p>
        - Early access users will have the opportunity to let us know what
        features they would like added and transform the future of HabitCheck!
      </p>
      <br />
      <h2>About the app</h2>
      <p>
        - HabitCheck is transforming into a Progressive Web App to allow for
        availability on all devices that support PWAs
      </p>
      <p>
        - Upon early access the site will run purely on the device, as in we
        will not be syncing data to an account.
      </p>
      <p>- This project is running with pure GatsbyJS</p>
    </div>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
  </Layout>
)

export default IndexPage
