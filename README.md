# HabitCheck
Simple Habit Tracker

by Babak Chehraz

[![CircleCI](https://circleci.com/gh/bchehraz/HabitCheck/tree/master.svg?style=svg)](https://circleci.com/gh/bchehraz/HabitCheck/tree/master) (CircleCI Frontend)

[![codecov](https://codecov.io/gh/bchehraz/HabitCheck/branch/master/graph/badge.svg?token=E4fl4A6gli)](https://codecov.io/gh/bchehraz/HabitCheck) (Frontend)

[![Netlify Status](https://api.netlify.com/api/v1/badges/c3b3fe58-a438-43e5-8c4e-f59d58ad74e7/deploy-status)](https://app.netlify.com/sites/habitcheck/deploys) (Frontend Deployment)

## About HabitCheck

HabitCheck is a simple Habit Tracker that allows a user to add daily habits they would like to incorporate, or habits they would like to kick. The app itself will automatically update habits as days go by, so make sure to check in when you accomplish your daily habit!

This has been an ongoing project of mine since November 2019. The plan was to allow for offline functionality as a PWA with various features to help users manage their habits and tasks (planned future updates are listed below). 

The app currently allows user to login or create a user account through the GraphQL Server on Heroku which stores data on MongoDB Atlas. However, habit data for each user is stored solely on the client and cannot be removed unless you clear your browser's cache. Even then, you are able to log into another account and create new habits for that account, independent from other accounts you create and log into.

## Demo

https://www.habitcheck.netlify.app/

(Server Graphiql) 

https://habit-check.herokuapp.com/graphql

Note: **To take full advantage of the functionality, a full day has to come by to demonstrate how the app updates habit streaks on its own using your device's datetime. On the flip side, after the habit has been checked off at least once, any missed days after this will result in a negative streak value.**

**Also it may not be apparent but each of the habits are clickable on the left side to show stats!**

## Technologies Used

#### Frontend

React with Gatsby for the frontend

#### Backend

Authentication provided by a GraphQL Server hosted on Heroku using Express and Mongoose

Data stored on MongoDB Atlas

#### UI Design

Much of the UI was designed using Figma (I highly recommend this)

## Planned Future Updates

1. **Journal Feature** - Allow users to add journal posts to check in on themselves on how they feel, how things are going with their self improvement.

2. **Dark Mode Feature** - Allow users to darken the app to be easier on the eyes, which is especially good for night time.

3. **Backend Updates** - Sync front-end data with back-end so that users will be able to save their data across devices.

4. **Task List Feature** - Allow users to break down large tasks into small managable chunks. Good for one-time-use tasks, as opposed to the daily habits which stay every day.
