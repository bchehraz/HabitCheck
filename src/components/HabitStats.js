import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import AppLayout from "./AppLayout"
import SwitchViewButton from "./HabitStats/SwitchViewButton"
import DropDown from "components/DropDown"
import CalendarView from "./HabitStats/CalendarView"
import XEffectView from "./HabitStats/XEffectView"
import StatHighlight from "./HabitStats/StatHighlight"
import Spinner from "./Spinner"

import AuthContext from "../context/auth-context"

import { getCalendarData } from "utils/HabitStats/CalendarData"
import { getXEffectData } from "utils/HabitStats/XEffectData"

const StatusContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const HabitStats = ({ path }) => {
  const MAX_XEFFECT_SIZE = 25
  const context = useContext(AuthContext)
  const { checked, unchecked } = context.data.habits
  const habitMap = context.data.habits.map
  const viewPreference = context.preferences.xEffectView
  const userSelected = context.preferences.selected

  const [view, setView] = useState(false)
  const [selected, setSelected] = useState(0)
  const [page, setPage] = useState(0)
  const todaysDate = new Date()
  //const todaysDate = new Date("12/23/2019");
  const [date, setDate] = useState(todaysDate)
  const [habitData, setHabitData] = useState([])
  const [calendarData, setCalendarData] = useState([])
  const [xEffectData, setXEffectData] = useState([])

  useEffect(() => {
    let data = []
    if (checked) {
      data = [...data, ...checked]
    }
    if (unchecked) {
      data = [...data, ...unchecked]
    }
    data = data.sort((a, b) => a.title.localeCompare(b.title))
    setHabitData([...data])
    console.log(`Habit Stats : useEffect => `)
    console.log(data)

    // CalendarView or XEffectView ?
    setView(viewPreference)

    let selectedIndex = selected
    if (userSelected) {
      setSelected(userSelected)
      selectedIndex = userSelected
    }

    if (!viewPreference) {
      if (Object.keys(habitMap).length > 0 && data.length !== 0) {
        const { index, isChecked } = habitMap[data[selectedIndex].title]
        const { progress } = (isChecked && checked[index]) || unchecked[index]
        setCalendarData(getCalendarData(progress, isChecked))
      }
    } else {
      if (Object.keys(habitMap).length > 0 && data.length !== 0) {
        const { index, isChecked } = habitMap[data[selectedIndex].title]
        const { progress } = (isChecked && checked[index]) || unchecked[index]
        setXEffectData(getXEffectData(progress, isChecked, MAX_XEFFECT_SIZE))
      }
    }
    console.log(`=> End of useEffect`)
  }, [checked, unchecked, viewPreference, userSelected])

  if (habitData.length === 0) {
    return (
      <AppLayout path={path}>
        <Spinner />
        <h3>{`Add a habit to begin tracking data`}</h3>
      </AppLayout>
    )
  }

  const onNextPage = () => {
    const newPage = page - 1
    setPage(newPage)

    //if CalendarView...
    if (!view) {
      //Adjust the date value in state to reflect a changing page
      if (newPage === 0) {
        setDate(todaysDate)
      } else {
        date.setDate(32)
        date.setDate(32)
        date.setDate(0)
        setDate(date)
      }
    }
  }

  const onPrevPage = () => {
    const newPage = page + 1
    setPage(newPage)

    //if CalendarView
    if (view) {
      if (newPage === 0) {
        setDate(todaysDate)
      } else {
        date.setDate(0)
        setDate(date)
      }
    }
  }

  const onCheckHandler = () => {
    const { index } = habitMap[habitData[selected].title]
    context.checkHabit(index)
  }

  const onUncheckHandler = () => {
    const { index } = habitMap[habitData[selected].title]
    context.uncheckHabit(index)
  }

  const toggleView = () => {
    setPage(0)

    const { index, isChecked } = habitMap[habitData[selected].title]
    const { progress } = (isChecked && checked[index]) || unchecked[index]
    if (!view) {
      setXEffectData(getXEffectData(progress, isChecked, MAX_XEFFECT_SIZE))
    } else {
      setCalendarData(getCalendarData(progress, isChecked))
    }
    setView(!view)
    context.toggleXEffectView()
  }

  const { progress, bestStreak } = habitData[selected]
  const { length } = progress
  let streak = 0
  if (length > 0) {
    streak = progress[length - 1].streak
  }

  return (
    <AppLayout path={path}>
      <StatusContainer>
        <h3>
          <DropDown
            selected={selected}
            onSelect={e => {
              setSelected(e.target.value)
              context.setSelectedHabit(e.target.value)
              setPage(0)
              setDate(todaysDate)

              const { index, isChecked } = habitMap[
                habitData[e.target.value].title
              ]
              const { progress } =
                (isChecked && checked[index]) || unchecked[index]

              // Get Data based on the view the user is on
              if (view) {
                setXEffectData(
                  getXEffectData(progress, isChecked, MAX_XEFFECT_SIZE)
                )
              } else {
                setCalendarData(getCalendarData(progress, isChecked))
              }
            }}
            list={habitData}
          />
        </h3>
        <SwitchViewButton enabled={view} onClick={toggleView} />
      </StatusContainer>
      {view ? (
        <XEffectView
          //aaaaaahhhh
          data={xEffectData[page] || []}
          size={{ col: MAX_XEFFECT_SIZE / 5, row: MAX_XEFFECT_SIZE / 5 }}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
          page={page}
          pageMax={xEffectData.length - 1}
          onCheck={onCheckHandler}
          onUncheck={onUncheckHandler}
        />
      ) : (
        <CalendarView
          date={date}
          data={calendarData[page] || []}
          page={page}
          pageMax={calendarData.length - 1}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
          onCheck={onCheckHandler}
          onUncheck={onUncheckHandler}
        />
      )}
      <div>
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
      </div>
    </AppLayout>
  )
}

HabitStats.propTypes = {
  path: PropTypes.string.isRequired,
}

export default HabitStats
