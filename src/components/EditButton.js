import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FiEdit } from "react-icons/fi"
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa"

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  padding: 5px;
  margin-top: 5px;

  button {
    -webkit-transition: all 300ms ease-in;
    -moz-transition: all 300ms ease-in;
    -ms-transition: all 300ms ease-in;
    -o-transition: all 300ms ease-in;
    transition: all 300ms ease-in;
  }
`

const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 15px;
  margin: 0 5px 0;
`

const ActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  opacity: 0;
  ${({ enabled }) => enabled && "opacity: 1;"}
  cursor: pointer;
  width: 100%;
  border-radius: 15px;
  margin: 0 5px 0;

  ${({ type }) => type === 1 && "background-color: gray;"}
  ${({ type }) => type === 2 && "background-color: #aa4465;"}
  ${({ type }) => type === 3 && "background-color: #8acb88;"}
`

const EditButton = ({ onClick, enabled, handleRemove, onConfirm }) => {
  return (
    <Container>
      <ActionButton enabled={enabled} onClick={handleRemove} type={2}>
        <FaTrash style={{ color: "white" }} size={25} />
      </ActionButton>
      <ActionButton enabled={enabled} onClick={onConfirm} type={3}>
        <FaCheck style={{ color: "white" }} size={25} />
      </ActionButton>
      <Button onClick={onClick} enabled={enabled}>
        {!enabled && <FiEdit style={{ color: "#2d3142" }} size={25} />}
        {enabled && <FaTimes style={{ color: "#2d3142" }} size={25} />}
      </Button>
    </Container>
  )
}

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired,
  handleRemove: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default EditButton
