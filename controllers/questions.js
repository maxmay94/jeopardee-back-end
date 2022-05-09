import { Question } from '../models/question.js'

const API_URL = process.env.API_BASE_URL


const create = async(req, res) => {
  console.log('req.body ----->> ',req.body)
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

const update = async(req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body)
    return res.status(201).json(question)
  } catch(err) {
    return res.status(500).json(err)
  }
}

const deleteQuestion = async(req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id)
    return res.status(204).end()
  } catch(err) {
    return res.status(500).json(err)
  }
}

const getCategories = async(req, res) => {
  try {
    const categories = await Question.distinct('category')
    return res.status(201).json(categories)
  } catch(err) {
    return res.status(500).json(err)
  }
}

const play = async(req, res) => {
  try {
    const categories = await Question.distinct('question')
    console.log(categories)
  } catch(err) {
    return res.status(500).json(err)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteQuestion as delete,
  getCategories,
  play
}