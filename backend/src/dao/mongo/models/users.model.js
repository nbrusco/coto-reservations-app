import mongoose from 'mongoose'

const userCollection = 'Users'

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  age: Number,
  password: {
    type: String,
    required: true
  },
  last_connection: Date,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
})

export const userModel = mongoose.model(userCollection, userSchema)
