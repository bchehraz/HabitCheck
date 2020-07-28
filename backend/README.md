# HabitCheck GraphQL Server

(No workflows set up for CI)

Description:

The purpose of the GraphQL Server for HabitCheck is to allow users to authenticate to gain access to the HabitCheck client app. At a future time, user data will also be saved along with their other data. At this time, data is only saved on the client side, which is insecure.

### Currently Available Endpoints:

As you can see in `/graphql/schema/index.js` I am currently building the data structure for the entire project which include storing habits and their data. However, at the moment only 2 endpoints are successfully working and being utilized by the front-end client.

```
login(email: String!, password: String!): AuthData!
createUser(userInput: { email: String!, password: String! }): AuthData!
```

where AuthData is structured like so-

```
type AuthData {
  userId: ID!
  token: String!
  email: String!
}
```

After authenticating through login or account creation, the generated token will be required as an auth header (as a bearer token) to gain access to other endpoints on the server (which are currently under construction). Token generation and decryption to get userId are working!
