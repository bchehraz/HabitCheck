import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Emoji } from "./"

import { FiTrendingDown } from "react-icons/fi"

const TagContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  height: 27px;
  ${({ isNew }) => isNew && "background: #66C7F4;"}
  ${({ streak }) => streak < 0 && "background: #AA4465;"}
  ${({ streak }) => streak > 1 && "background: #2D3142;"}
  border-radius: 5px;
  color: white;
  padding: 0;
  margin: 0;

  ${({ tablet }) => tablet && `display: none;`}

  @media only screen and (min-width: 768px) {
    ${({ mobile }) => mobile && "display: none;"}
    ${({ tablet }) => tablet && `display: flex;`}
  }
`

const TagContent = styled.div`
  display: inline-grid;
  grid-template-columns: 50% 50%;
  grid-gap: 5px;
  justify-items: stretch;
  align-items: center;
  justify-content: center;
  height: 100%;
  line-height: 21px;
  margin: 0;
  width: 100%;
  text-align: right;
  white-space: nowrap;
  margin: 0 auto;
  padding: 0 10px;
`

const IconContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Tag = ({ streak, isNew, mobile, tablet, desktop }) => {
  //4 different tags
  // New Tag, No Tag, Up Streak, Down Streak
  let tagContent
  if (streak > 1 || streak < 0) {
    tagContent = (
      <TagContent>
        <p className="number">{streak}</p>
        {streak > 1 && (
          <Emoji symbol="🔥" label="fire" style={{ fontSize: 19 }} />
        )}
        {streak < 0 && (
          <IconContainer>
            <FiTrendingDown size={21} />
          </IconContainer>
        )}
      </TagContent>
    )
  } else if (isNew) {
    tagContent = <p style={{ margin: 0, padding: "0 10px" }}>NEW</p>
  } else {
    return null
  }

  return (
    <TagContainer
      isNew={isNew}
      streak={streak}
      mobile={mobile}
      tablet={tablet}
      desktop={desktop}
    >
      {tagContent}
    </TagContainer>
  )
}

Tag.propTypes = {
  streak: PropTypes.number.isRequired,
  isNew: PropTypes.bool.isRequired,
  mobile: PropTypes.bool,
  tablet: PropTypes.bool,
  desktop: PropTypes.bool,
}

Tag.defaultProps = {
  mobile: false,
  tablet: false,
  desktop: false,
}

export default Tag
