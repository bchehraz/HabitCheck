import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { FaTimes, FaRegCircle } from "react-icons/fa"

const Container = styled.div`
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #EEEEEE;
  ${({ status }) => status !== 0 && "background-color: #fff;"}
  border: 1px solid #EEEEEE;
  ${({ status }) => status === 1 && "border-color: #AA4465;"}
  ${({ status }) => status === 2 && "border-color: #8ACB88;"}
  ${({ status }) => status === 3 && "border-color: #66C7F4;"}
  border-radius: 7px;
  ${({ status }) => status === 2 && "color: #8ACB88;"}
  ${({ status }) => status === 1 && "color: #AA4465;"}
  width: 45px;
  height: 45px;
  ${({ status }) => status === 3 && "border-width: 3px;"}
`

const XEffectItem = ({ status, onClick }) => (
  <Container status={status} onClick={onClick}>
    {status === 2 && <FaTimes size={40} />}
    {status === 1 && <FaRegCircle size={33} />}
  </Container>
)

XEffectItem.propTypes = {
  status: PropTypes.number.isRequired,
  onClick: PropTypes.func,
}

export default XEffectItem
