import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { FaTimes, FaRegCircle } from "react-icons/fa"

const Container = styled.div`
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eeeeee;
    border: 1px solid #eeeeee;
    margin: 0 5px;
    width: 45px;
    height: 45px;
    border-radius: 7px;
  }

  .status__1,
  .status__2,
  .status__3,
  .status__4 {
    background-color: #fff;
  }

  .status__1 {
    border-color: #aa4465;
    color: #aa4465;
  }

  .status__2,
  .status__4 {
    border-color: #8acb88;
    color: #8acb88;
  }

  .status__3 {
    border-color: #66c7f4;
    border-width: 3px;
  }
`

const XEffectItem = ({ status, onClick }) => (
  <Container onClick={onClick}>
    <div className={`xEffectItem status__${status}`}>
      {(status === 2 || status === 4) && <FaTimes size={40} />}
      {status === 1 && <FaRegCircle size={33} />}
    </div>
  </Container>
)

XEffectItem.propTypes = {
  status: PropTypes.number.isRequired,
  onClick: PropTypes.func,
}

export default XEffectItem
