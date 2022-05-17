import { query } from 'express'
import { Question } from '../models/question.js'
import fetch from 'node-fetch'

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
  // return to this in future for a less hacky approach
  let qList = { one: '', two: '', three: '', four: '', five: '' }
  let questions = []

  try {
    const categories = await Question.distinct('category')
    shuffleArray(categories)

    for(const cat in categories){
      const category = await Question.where('category', categories[cat])
      let qs = []
      if(category.length >= 5) {
        Object.values(qList).forEach((q, i) => {
          while(q === '') {
            let temp = category[Math.floor(Math.random() * category.length)]
            if(temp.difficulty === ((i + 1) * 200)) {
              q = temp._id
              qs.push(temp)
            }
          }
        })
        questions.push(qs)
      }
    }

    while(questions.length < 6) {
      questions.push(await fixData())
    }
    return res.status(201).json(questions)

  } catch(err) {
    return res.status(500).json(err)
  }
}

/* --------------------------------------------------- HELPER FUNCTIONS --------------------------------------------------- */

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

const fixData = async() => {
  let fixedQuestions = []

  if(fixedQuestions.length < 5) {
    await getJeopardy()
      .then(data => {
        data.forEach((question,i) => {
          let tempQ = {
            answer: data[i]?.answer,
            question: data[i]?.question,
            difficulty: data[i]?.value,
            category: data[i]?.category?.title
        }
        fixedQuestions.push(tempQ)
      })
    })
  }
  return fixedQuestions
}

const getJeopardy = async() => {
  let questions = []
  let category = [1,3,4,7,8,9,10,19,35,36,48,49,51,67,83,183,542,513]
  let rand = Math.floor(Math.random() * category.length)

  try{
    let data = await Promise.all([
      fetch(`${API_URL}clues?value=${200}&category=${category[rand]}`),
      fetch(`${API_URL}clues?value=${400}&category=${category[rand]}`),
      fetch(`${API_URL}clues?value=${600}&category=${category[rand]}`),
      fetch(`${API_URL}clues?value=${800}&category=${category[rand]}`),
      fetch(`${API_URL}clues?value=${1000}&category=${category[rand]}`)
    ]) 
    const finalData = await Promise.all(data.map(data => data.json()))
    finalData.forEach(value => {
      questions.push(value[Math.floor(Math.random() * value.length)])
    })
    return questions
  } catch(error) {
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