import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { FaCaretLeft, FaCaretRight } from "react-icons/fa"

import XEffectItem from "./XEffectItem"

const Container = styled.div`
  margin: 15px auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const RowContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
`

const renderItems = (data = [], size, onCheckHandler, onUncheckHandler) => {
  console.log("<XEffect>")
  console.log(`Data: `, data)
  console.log(`Size: `, size)

  let rowNum = 0
  let rowData = [[]]
  rowData[0] = []
  for (let i = 0; i < data.length; i++) {
    if (data[i] === 0 || i + 1 === data.length) {
      //If you're the last element, check to see if you are checked and set the status to 4 to indicate that it is uncheckable
      if (data[i - 1] === 2) {
        rowData[rowNum][rowData[rowNum].length - 1] = 4
      }
    }
    rowData[rowNum].push(data[i])
    //console.log(rowData);
    if ((i + 1) % 5 === 0) {
      if (rowNum + 1 < size.row) {
        rowNum++
        rowData[rowNum] = []
      }
    }
  }
  console.log("Row Data", rowData)
  console.log("</XEffect>")
  return rowData.map((row, i) => {
    return (
      <RowContainer key={i}>
        {row.map((status, j) => {
          let onClick = () => {}
          if (status === 3) {
            onClick = onCheckHandler
          } else if (status === 4) {
            //status 4 indicates today's element is uncheckable
            onClick = onUncheckHandler
            status = 2
          }
          return <XEffectItem status={status} key={j} onClick={onClick} />
        })}
      </RowContainer>
    )
  })
}

const XEffect = ({
  data,
  size,
  onPrevPage,
  onNextPage,
  page,
  pageMax,
  onCheck,
  onUncheck,
}) => {
  return (
    <Container>
      {pageMax <= page && (
        <div>
          <FaCaretLeft size={32} style={{ opacity: 0 }} />
        </div>
      )}
      {pageMax > page && (
        <div onClick={onPrevPage}>
          <FaCaretLeft size={32} />
        </div>
      )}
      <div>{renderItems(data, size, onCheck, onUncheck)}</div>
      {page === 0 && (
        <div>
          <FaCaretRight size={32} style={{ opacity: 0 }} />
        </div>
      )}
      {page !== 0 && (
        <div onClick={onNextPage}>
          <FaCaretRight size={32} />
        </div>
      )}
    </Container>
  )
}

XEffect.propTypes = {
  data: PropTypes.array.isRequired,
  size: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  pageMax: PropTypes.number.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  onUncheck: PropTypes.func.isRequired,
}

export default XEffect
