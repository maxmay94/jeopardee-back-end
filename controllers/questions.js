import { Question } from '../models/question.js'


const API_URL = process.env.API_BASE_URL

const index = async (req, res) => {
  try {

  } catch (err) {
    return res.status(500).json(err)
  }
}

const create = async (req, res) => {
  try {
    const question = await new Question(req.body)
    await question.save()
    return res.status(201).json(question)
  } catch (err) {
    return res.status(500).json(err)
  }
}

export {
  create,
  index
}