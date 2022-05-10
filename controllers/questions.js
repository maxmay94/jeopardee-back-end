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
      .sort({category: 'desc'})
      .sort({difficulty: 'desc'})
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
  let qList = { one: '', two: '', three: '', four: '', five: '' }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  let questions = []
  try {
    const categories = await Question.distinct('category')
    shuffleArray(categories)

    for(const cat in categories){
      const category = await Question.where('category', categories[cat])
      let qs = []
      if(category.length >= 5) {
        Object.values(qList).forEach((q, i) => {
          console.log((i + 1) * 200)
          while(q === '') {
            let temp = category[Math.floor(Math.random() * category.length)]
            if(temp.difficulty === ((i + 1) * 200)) {
              // console.log(temp)
              q = temp._id
              qs.push(temp)
            }
          }
        })
        questions.push(qs)
      }
    }

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