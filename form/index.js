import express from 'express'
import mysql2 from 'mysql2'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const pool = mysql2.createPool({
  host: 'mysql-39799262-santanudas1889-4b71.c.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_JncdAukHlQKDbdq_r9f',
  database: 'defaultdb',
  port: 23110
});

app.get('/api/user', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as id ${connection.threadId}`)

    connection.query('SELECT * from UserDetail', (err, rows) => {
      connection.release()

      if (!err) {
        res.send(rows)
      } else {
        console.log(err);
      }
    })
  })
})

app.get('/api/email/:email', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as id ${connection.threadId}`)

    connection.query('SELECT * from UserDetail WHERE UserEmail = ?', [req.params.email], (err, rows) => {
      connection.release()

      if (!err) {
        res.send(rows)
      } else {
        console.log(err);
      }
    })
  })
})

app.get('/api/user/:UserName', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as id ${connection.threadId}`)

    connection.query('SELECT * from UserDetail WHERE UserName = ?', [req.params.UserName], (err, rows) => {
      connection.release()

      if (!err) {
        res.send(rows)
      } else {
        console.log(err);
      }
    })
  })
})

app.post('/create', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as id ${connection.threadId}`)

    const params = req.body

    connection.query('INSERT INTO UserDetail set ?', params, (err, rows) => {
      connection.release()

      if (!err) {
        res.send(params.email)
      } else {
        console.log(err);
      }
    })
  })
})

app.put('/update', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as id ${connection.threadId}`)
    const { email, password } = req.body

    connection.query('UPDATE UserDetail set UserPassword = ? WHERE UserEmail = ?', [password, email], (err, rows) => {
      connection.release()

      if (!err) {
        res.send("Updated SuccesFull")
      } else {
        console.log(err);
      }
    })
  })
})

app.listen(port, () => {
  console.log(port);
})