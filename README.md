# HabitCheck
Simple Habit Tracker

by Babak Chehraz

[![CircleCI](https://circleci.com/gh/bchehraz/HabitCheck/tree/master.svg?style=svg)](https://circleci.com/gh/bchehraz/HabitCheck/tree/master) (CircleCI Frontend)

[![codecov](https://codecov.io/gh/bchehraz/HabitCheck/branch/master/graph/badge.svg?token=E4fl4A6gli)](https://codecov.io/gh/bchehraz/HabitCheck) (Frontend)

[![Netlify Status](https://api.netlify.com/api/v1/badges/c3b3fe58-a438-43e5-8c4e-f59d58ad74e7/deploy-status)](https://app.netlify.com/sites/habitcheck/deploys) (Frontend Deployment)

##### Table of Contents  
[About HabitCheck](#about-habitcheck)

[Demo](#demo)

[Technologies Used](#technologies-used)

[Dependencies Used](#dependencies-used)

[How to Deploy](#how-to-deploy)

[Planned Future Updates](#planned-future-updates)

## About HabitCheck

HabitCheck is a simple Habit Tracker that allows a user to add daily habits they would like to incorporate, or habits they would like to kick. The app itself will automatically keep track of your habits, but beware as the app will mark missed days toward a negative streak so be sure to check in! Habits can also be viewed in a Calendar and "X Effect" format by clicking the left-hand side of a habit!). 

This has been an ongoing project of mine since November 2019. The plan was to allow for offline functionality as a PWA with various features to help users manage their habits and tasks (planned future updates are listed below). 

The app currently allows user to login or create a user account through the GraphQL Server on Heroku which stores data on MongoDB Atlas. However, habit data for each user is stored solely on the client and cannot be removed unless you clear your browser's cache. Even then, you are able to log into another account and create new habits for that account, independent from other accounts you create and log into.



## Demo

https://habitcheck.netlify.app/ (App Frontend)

https://habit-check.herokuapp.com/graphql (Backend Server Endpoint) 

Note: **To take full advantage of the functionality, a full day has to come by to demonstrate how the app updates habit streaks on its own using your device's datetime. On the flip side, after the habit has been checked off at least once, any missed days after this will result in a negative streak value.**

**Also, it may not be apparent but each of the habits are clickable on the left side to show stats!**

## Technologies Used

#### Frontend

React with Gatsby for the frontend

#### Frontend Testing

I had created some initial Cypress tests which ran the app through 30 days of use with random input to make sure the functionality works up until that point. However since making some big updates over the last couple of weeks, these tests now need updating in order to be run.

There are also some unit tests and snapshot tests on various components in the app.

#### Backend

Authentication provided by a GraphQL Server hosted on Heroku using Express and Mongoose

Data stored on MongoDB Atlas

#### UI Design

Much of the UI was designed using Figma (I highly recommend this)

## Dependencies Used

There are many dependencies I decided to use for this project and it would be awesome for me to sit down and write about all of them, but instead I will talk about some of the more notable ones.

#### Gatsby (learn more at https://GatsbyJS.org)

As they say on their page, "Gatsby is a free and open source framework based on React that helps developers build blazing fast websites and apps"

Gatsby is a static site generator, making it really easy to deploy to sites like Netlify. Gatsby also makes it really easy to set up offline functionality to create a Progressive Web App. A lot of its functionality come right out of the box and it's just nice to use, easy to get the hang of. I highly recommend it, even for production apps.

#### Styled Components

Styled components allows for "css-in-js" which eliminates the need to have seperate .css files for each component, allowing for your css code to be inserted directly into the component JS file. 

One big advantage is that any props passed to these styled components can be used to manipulate the css, rather than having css class names that change based on state.

#### Husky

Husky is a cool dependency based around the usage of git and commits. Husky allows for pre-commit hooks that can take a look at the code right before commiting. On this project, I am using Husky to run `jest` as well as `prettier` to run local tests and to clean up my code and format it. Whenever something is wrong, husky will stop me from committing, allowing me to fix an issue before I commit!

#### Cypress

Cypress is an awesome and powerful UI testing tool that allows me to test my app on a live chrome-based browser. It allows for running your app on multiple viewports as well to test for responsiveness. I have yet to learn all the potential from this great tool and I hope to put it to better use in the future. 

## How to Deploy

Make sure to have Node/npm installed on your machine.

#### Frontend Deploy Instructions

1. After forking the repository, go to `/frontend` subdirectory inside the repository folder and install the package core dependencies

`npm install`

2. The project uses `gatsby-cli` to run so please make sure to have this installed as well-

`npm install -g gatsby-cli`

3. Now you are ready to run the project. You have the choice to run either of the following to run locally:

```
npm start
OR
gatsby develop
```

4. The project should now be deployed and accessible through `http://localhost:8000/`

** By default the frontend project is set to connect with the Heroku endpoint for authentication. **

#### Backend Deploy Instructions

Backend deployment is a bit more tricky and more involved. The backend wants to connect to MongoDB upon even local deployment which requires you to set up a MongoDB Atlas account with a database. 

Personally what I did to deploy the backend was create a `nodemon.json` file in the `/backend` directory which stores environment variables like the mongodb admin username and passwords which are used to login with MongoDB Atlas and  are not pushed to github for security reasons.

## Planned Future Updates

1. **Journal Feature** - Allow users to add journal posts to check in on themselves on how they feel, how things are going with their self improvement.

2. **Dark Mode Feature** - Allow users to darken the app to be easier on the eyes, which is especially good for night time.

3. **Backend Updates** - Sync front-end data with back-end so that users will be able to save their data across devices.

4. **Task List Feature** - Allow users to break down large tasks into small managable chunks. Good for one-time-use tasks, as opposed to the daily habits which stay every day.
