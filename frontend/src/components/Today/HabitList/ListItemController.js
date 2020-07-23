import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { ListItem, ListItemMobile } from "./"

const Container = styled.div`
  display: none;
  ${({ mobile }) => mobile && "display: block;"}

  @media only screen and (min-width: 768px) {
    display: block;
    ${({ mobile }) => mobile && "display: none;"}
  }
`

const ListItemController = props => {
  return (
    <>
      <Container>
        <ListItem {...props} />
      </Container>
      <Container mobile>
        <ListItemMobile {...props} />
      </Container>
    </>
  )
}

ListItemController.propTypes = {
  title: PropTypes.string,
  streak: PropTypes.number,
  isNew: PropTypes.bool,
  isChecked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  viewStats: PropTypes.func.isRequired,
  justAdded: PropTypes.bool,
  toggleAnimate: PropTypes.func,
}

ListItemController.defaultProps = {
  justAdded: false,
}

export default ListItemController
