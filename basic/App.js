const express = require('express')
const birds = require('./birds')
const app = express()

app.listen(3000,()=>{
  console.log("Listening port",3000)
})

app.get('/', (req, res) => {
  res.sendFile('./data/index.html',{root:__dirname})
})

app.get('/about', (req, res) => {
  res.sendFile('./data/about.html',{root:__dirname})
})

app.get('/about1', (req, res) => {
  res.redirect('about')
})

app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})

const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

const cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])

app.use('/birds', birds)

app.use((req,res)=>{
  res.sendFile('./data/notFound.html',{root:__dirname})
})