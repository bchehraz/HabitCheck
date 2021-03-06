import React, { useState } from "react"
import PropTypes from "prop-types"

import { XEffectCard } from "./"

const XEffectView = ({ data, size, onCheck, onUncheck }) => {
  const [page, setPage] = useState(0)

  const onNextPage = () => setPage(page - 1)
  const onPrevPage = () => setPage(page + 1)

  return (
    <XEffectCard
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
