import React, { useState } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import XEffect from "./XEffect"

const XEffectView = ({ data, size, onCheck, onUncheck }) => {
  const [page, setPage] = useState(0)

  const onNextPage = () => setPage(page - 1)
  const onPrevPage = () => setPage(page + 1)

  return (
    <XEffect
      data={data[page] || []}
      onClickLeft={onPrevPage}
      onClickRight={onNextPage}
      page={page}
      pageMax={data.length - 1}
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
  onCheck: PropTypes.func.isRequired,
  onUncheck: PropTypes.func.isRequired,
}

export default XEffectView
