# HabitCheck
Simple Habit Tracker

[![CircleCI](https://circleci.com/gh/bchehraz/HabitCheck/tree/master.svg?style=svg)](https://circleci.com/gh/bchehraz/HabitCheck/tree/master) (CircleCI Frontend)

[![codecov](https://codecov.io/gh/bchehraz/HabitCheck/branch/master/graph/badge.svg?token=E4fl4A6gli)](https://codecov.io/gh/bchehraz/HabitCheck) (Frontend)

[![Netlify Status](https://api.netlify.com/api/v1/badges/c3b3fe58-a438-43e5-8c4e-f59d58ad74e7/deploy-status)](https://app.netlify.com/sites/habitcheck/deploys) (Frontend Deployment)

## Technologies Used

#### Frontend

React with Gatsby for the frontend

#### Backend

Authentication provided by a GraphQL Server hosted on Heroku using Express and Mongoose

Data stored on MongoDB Atlas

## Demo

https://www.habitcheck.netlify.app/

(Server Graphiql) 

https://habit-check.herokuapp.com/graphql

Note: **To take full advantage of the functionality, a full day has to come by to demonstrate how the app updates habit streaks on its own using your device's datetime. On the flip side, after the habit has been checked off at least once, any missed days after this will result in a negative streak value.**

**Also it may not be apparent but each of the habits are clickable on the left side to show stats!**
