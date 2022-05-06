import mongoose from 'mongoose'

const Schema = mongoose.Schema

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    difficulty: {
      type: Number,
      required: true,
      enum: [
        200,
        400,
        600,
        800,
        1000
      ]
    },
    URL: { type: String },
  },
  { timestamps: true }
)

const Question = mongoose.model('Question', questionSchema)

export { Question }