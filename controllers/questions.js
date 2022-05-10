import { query } from 'express'
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
  let qList = {
    one: '',
    two: '',
    three: '',
    four: '',
    five: ''
  }

  let questions = []
  try {
    const category = await Question.where('category', 'wine by the glass')
    console.log('||||||||||||||||', qList)
    

    Object.values(qList).forEach((q, i) => {
      console.log((i + 1) * 200)
      while(q === '') {
        let temp = category[Math.floor(Math.random() * category.length)]
        if(temp.difficulty === ((i + 1) * 200)) {
          console.log(temp)
          q = temp._id
          questions.push(temp)
        }
      }
    })

    // const q1 = await Question.where('difficulty', 200)
    // qList.push(q1[Math.floor(Math.random() * q1.length)])

    // const q2 = await Question.where('difficulty', 400)
    // qList.push(q2[Math.floor(Math.random() * q2.length)])

    // const q3 = await Question.where('difficulty', 600)
    // qList.push(q3[Math.floor(Math.random() * q3.length)])

    // const q4 = await Question.where('difficulty', 800)
    // qList.push(q4[Math.floor(Math.random() * q4.length)])

    // const q5 = await Question.where('difficulty', 1000)
    // qList.push(q5[Math.floor(Math.random() * q5.length)])

    return res.status(201).json(questions)
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