const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/user')
const HabitState = require('../../models/habitstate')
const Preference = require('../../models/preference')

module.exports = {
  createUser: async ({ userInput: { email, password } }) => {
    try {
      //check for existing user before creating one
      const existingUser = await User.findOne({ email })

      if (existingUser) {
        throw new Error("User email is already signed up")
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = new User({
        email,
        password: hashedPassword,
      })

      const habitState = new HabitState({
        checked: [],
        unchecked: [],
      })
      await habitState.save()
      user.habits = habitState

      const preferences = new Preference({
        darkMode: false,
        xEffectView: false,
      })
      await preferences.save()
      user.preferences = preferences;

      const newUser = await user.save()

      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.AUTH_SECRET,
      )

      return { userId: newUser.id, token, email }
    } catch (err) {
      throw err
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error("User does not exist!")
      }

      const isEqual = await bcrypt.compare(password, user.password)
      if (!isEqual) {
        throw new Error("Password is incorrect!")
      }

      //success!
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.AUTH_SECRET,
      )

      return { userId: user.id, token, email: user.email }
    } catch (err) {
      throw err
    }
  }
}
