import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { FaCaretLeft, FaCaretRight } from "react-icons/fa"

import { XEffectItem } from "./"

const Container = styled.div`
  margin: 15px auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  .btnPageLeft,
  .btnPageRight {
    opacity: 1;
  }

  .btnDisabled {
    opacity: 0;
  }
`

const RowContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
`

const renderItems = (
  data = [],
  size,
  onCheckHandler,
  onUncheckHandler,
  hasNextPage
) => {
  let rowNum = 0
  let rowData = [[]]
  rowData[0] = []
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    if (data[i] === 0) {
      //If you have reached status 0, check the item before for a status 2 to see if it's uncheckable
      if (data[i - 1] === 2) {
        //if the item before is uncheckable (status 2 and last item in the view),
        // check to see if the previous item lands on a new row,
        if (rowData[rowNum].length - 1 === -1) {
          //if it does, go to the last element in the previous row
          rowData[rowNum - 1][size.row - 1] = 4
        } else {
          //if it's in the same row, simply subtract one from the column index of the same row
          rowData[rowNum][rowData[rowNum].length - 1] = 4
        }
      }
    }

    rowData[rowNum].push(data[i])

    if (i + 1 === data.length && !hasNextPage) {
      if (data[i] === 2) {
        rowData[rowNum][rowData[rowNum].length - 1] = 4
      }
    }

    if ((i + 1) % 5 === 0) {
      if (rowNum + 1 < size.row) {
        rowNum++
        rowData[rowNum] = []
      }
    }
  }

  return rowData.map((row, i) => {
    return (
      <RowContainer key={i} className="xEffectRow">
        {row.map((status, j) => {
          let onClick = () => {}
          console.log(status)
          if (status === 3) {
            onClick = onCheckHandler
          } else if (status === 4) {
            //status 4 indicates today's element is uncheckable
            onClick = onUncheckHandler
            // status = 2
          }
          return <XEffectItem status={status} key={j} onClick={onClick} />
        })}
      </RowContainer>
    )
  })
}

const XEffectCard = ({
  data,
  size,
  onPrevPage,
  onNextPage,
  page,
  pageMax,
  onCheck,
  onUncheck,
}) => {
  const hasPrevPage = pageMax > page
  const hasNextPage = page !== 0

  return (
    <Container className=".xEffectContainer">
      <div
        className={(hasPrevPage && "btnPageLeft") || "btnDisabled"}
        onClick={() => {
          return hasPrevPage && onPrevPage()
        }}
      >
        <FaCaretLeft size={32} />
      </div>
      <div>{renderItems(data, size, onCheck, onUncheck, hasNextPage)}</div>
      <div
        className={(hasNextPage && "btnPageRight") || "btnDisabled"}
        onClick={() => {
          return hasNextPage && onNextPage()
        }}
      >
        <FaCaretRight size={32} />
      </div>
    </Container>
  )
}

XEffectCard.propTypes = {
  data: PropTypes.array.isRequired,
  size: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  pageMax: PropTypes.number.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  onUncheck: PropTypes.func.isRequired,
}

export default XEffectCard
