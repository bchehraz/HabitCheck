import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import SwitchViewButton from "./SwitchViewButton"
import { CalendarView } from "./Calendar"
import { XEffectView } from "./XEffect"
import StatHighlight from "./StatHighlight"

import AuthContext from "../../context/auth-context"

import { getCalendarData } from "../../utils/HabitStats/Calendar"
import { getXEffectData } from "../../utils/HabitStats/XEffectData"

const Container = styled.div`
  width: 100%;
  text-align: center;
  margin: 0 auto;
  background-color: white;
  padding: 0 0 20px;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.29);

  @media only screen and (min-width: 600px) {
    border-radius: 17px;
  }
`

const StatusContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 300;
  padding: 25px;

  h3 {
    font-size: 1.2em;
    font-weight: 600;
    text-align: left;
    user-select: none;
  }
`

const HabitStats = ({ title }) => {
  const MAX_XEFFECT_SIZE = 25
  const context = useContext(AuthContext)
  const habitMap = context.data.habits.map

  const { checked, unchecked } = context.data.habits
  const viewPref = context.preferences.xEffectView
  const [view, setView] = useState(context.preferences.xEffectView || false)
  const [calendarData, setCalendarData] = useState([])
  const [xEffectData, setXEffectData] = useState([])
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  // const [editMode, setEditMode] = useState(false)
  // const [newTitle, setNewTitle] = useState("")

  useEffect(() => {
    // Get View Preference from Context, Store Into State
    // CalendarView or XEffectView?
    setView(viewPref)

    /* Get Index and isChecked from habitMap from context using title */
    // Note:
    // HabitMap is an object-> "Habit Title": { isChecked: false, index: 3 }
    // where index is where its data is located in its respective checked or unchecked array
    // HabitMap is updated with context actions like checking and unchecking
    const { index, isChecked } = habitMap[title]
    const { progress, bestStreak } =
      (isChecked && checked[index]) || unchecked[index]

    setBestStreak(bestStreak)
    if (progress.length > 0) {
      setStreak(progress[progress.length - 1].streak)
    } else if (progress.length === 0) {
      setStreak(0)
    }

    if (!viewPref) {
      setCalendarData(getCalendarData(progress, isChecked))
    } else {
      setXEffectData(getXEffectData(progress, isChecked, MAX_XEFFECT_SIZE))
    }
  }, [viewPref, habitMap, bestStreak, streak])

  const onCheckHandler = () => {
    context.checkHabit(title)
  }

  const onUncheckHandler = () => {
    context.uncheckHabit(title)
  }

  const toggleView = () => {
    const { index, isChecked } = habitMap[title]
    const { progress } = (isChecked && checked[index]) || unchecked[index]
    if (!view) {
      setXEffectData(getXEffectData(progress, isChecked, MAX_XEFFECT_SIZE))
    } else {
      setCalendarData(getCalendarData(progress, isChecked))
    }
    setView(!view)
    context.toggleXEffectView()
  }

  return (
    <Container>
      <StatusContainer>
        <h3>{title}</h3>
        {/* {!editMode && habitTitle} */}
        {/* {editMode && (
              <input
                type="text"
                value={newTitle}
                onChange={onTitleChange}
                style={{
                  border: "1px solid black",
                  padding: "3px 8px",
                  minWidth: "300px",
                }}
              />
            )} */}
        <SwitchViewButton enabled={view} onClick={toggleView} />
      </StatusContainer>
      {/* <EditButton
          onClick={toggleEditMode}
          enabled={editMode}
          onConfirm={onChangeTitle}
          handleRemove={() => {
            // eslint-disable-next-line no-undef
            const res = confirm("Are you sure you want to remove this habit?")
            console.log("Confirm Response", res)
          }}
        /> */}
      {view ? (
        <XEffectView
          data={xEffectData}
          size={{ col: MAX_XEFFECT_SIZE / 5, row: MAX_XEFFECT_SIZE / 5 }}
          onCheck={onCheckHandler}
          onUncheck={onUncheckHandler}
        />
      ) : (
        <CalendarView
          data={calendarData}
          onCheck={onCheckHandler}
          onUncheck={onUncheckHandler}
        />
      )}
      <StatHighlight
        title="Current Streak"
        statValue={(streak > 0 && streak) || 0}
        primaryColor="rgba(138, 203, 136, 0.25)"
        secondaryColor="#8ACB88"
      />
      <StatHighlight
        title="Best Streak"
        statValue={bestStreak}
        primaryColor="rgba(102, 199, 244, 0.25)"
        secondaryColor="#66C7F4"
      />
    </Container>
  )
}

HabitStats.propTypes = {
  title: PropTypes.string.isRequired,
}

export default HabitStats
