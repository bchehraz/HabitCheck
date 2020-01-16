import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import XEffect from "./XEffect"

const XEffectView = ({
  data,
  size,
  page,
  onPrevPage,
  onNextPage,
  pageMax,
  onCheck,
  onUncheck,
}) => {
  return (
    <XEffect
      data={data}
      onClickLeft={onPrevPage}
      onClickRight={onNextPage}
      page={page}
      pageMax={pageMax}
      size={size}
      onPrevPage={onPrevPage}
      onNextPage={onNextPage}
      onCheck={onCheck}
      onUncheck={onUncheck}
    />
  )
}

XEffectView.propTypes = {
  data: PropTypes.array.isRequired,
  size: PropTypes.object.isRequired,
  //   page: PropTypes.number.isRequired,
  //   onPrevPage: PropTypes.func.isRequired,
  //   onNextPage: PropTypes.func.isRequired,
  //   pageMax: PropTypes.number.isRequired,
  //   onCheck: PropTypes.func.isRequired,
  //   onUncheck: PropTypes.func.isRequired,
}

export default XEffectView
