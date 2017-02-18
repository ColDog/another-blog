const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const db = require('knex')({
  client: 'mysql2',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'codingbull'
  }
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('ok')
})

app.post('/api/posts', (req, res) => {
  console.log('insert', req.body)
  db('posts').insert(req.body)
    .then(() => {
      res.json(req.body)
    })
    .catch((err) => {
      res.status(500)
      res.send(err.name)
      console.log(err)
    })
})

app.get('/api/posts', (req, res) => {
  console.log('get posts')
  db.select().from('posts').limit(30).orderBy('id', 'desc')
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.status(500)
      res.send(err.name)
      console.log(err)
    })
})

app.listen(3001, () => {
  console.log('started')
})
