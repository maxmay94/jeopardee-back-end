import { Question } from '../models/question.js'

const API_URL = process.env.API_BASE_URL


const create = async(req, res) => {
  try {
    const question = await new Question(req.body)
    await question.save()
    return res.status(201).json(question)
  } catch(err) {
    return res.status(500).json(err)
  }
}

const index = async(req, res) => {
  try {
    console.log('in try')
    const questions = await Question.find({})
      .sort({createdAt: 'desc'})
      return res.status(200).json(questions)
  } catch(err) {
    return res.status(500).json(err)
  }
}

const show = async(req, res) => {
  try {
    const question = await Question.findById(req.params.id)
    return res.status(200).json(question)
  } catch(err) {
    return res.status(500).json(err)
  }
}

export {
  create,
  index,
  show
}