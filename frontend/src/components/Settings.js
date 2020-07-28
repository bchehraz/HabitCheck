import React from "react"
import { Link } from "gatsby"
import styled from "styled-components";

import { AuthConsumer } from "../context/auth-context"

import { logout } from "../utils/auth"

const SettingsItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #66C7F4;

  width: 100%;
  padding: 2rem;
  color: #2d3142;

  a {
    text-decoration: none;
    color: #6CC7F4;
  }
`

const SettingsListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const Settings = () => (
  <AuthConsumer>
    {context => (
      <SettingsListContainer>
        <SettingsItem>
        <h2>
          <Link
            to="/"
            onClick={e => {
              e.preventDefault()
              logout(() => context.logout())
            }}
          >
            {`Log Out`}
          </Link>
        </h2>
        </SettingsItem>
      </SettingsListContainer>
    )}
  </AuthConsumer>
)

export default Settings;