### HabitCheck GraphQL Server

(No workflows set up for CI)

Description:

The purpose of the GraphQL Server for HabitCheck is to allow users to authenticate to gain access to the HabitCheck client app. At a future time, user data will also be saved along with their other data. At this time, data is only saved on the client side, which is insecure.

## Currently Available Endpoints:

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

Then the generated token will be used to gain access to other endpoints on the server (which are currently under construction). Token generation and decryption to get userId are working!
