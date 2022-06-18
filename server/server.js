import express from "express"
import mysql from "mysql"
import bodyParser from "body-parser"
import cors from 'cors'
import multer from "multer"

const app = express()
const port = 3010

const dbc = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'mysql1234',
	database: 'reviewdb'
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	  console.log('실행')
		res.send({ ok: true })
})

app.get('/api/review', (req, res) => {
	dbc.query("SELECT r_title, r_genre, r_score FROM review", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

app.post('/api/login', async(req, res) => {
  const id = req.body.id
  const pw = req.body.pw
	dbc.query("SELECT * FROM user where id = ?", id, (err, result) => {
    if (result.length == 0) {
			res.send(403);
		} else {
			if (pw == result[0].pw) {
				res.send("Login success");
			} else {
				res.send(403);
			}
		}
  });
});

app.post('/api/create', async(req, res) => {
  const name = req.body.name
  const id = req.body.id
  const pw = req.body.pw
  const email = req.body.email
  
  dbc.query(
    "INSERT INTO user (name, id, pw, email) VALUES (?, ?, ?, ?)",
    [name, id, pw, email],
    (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send("Values Inserted");
    }
  });
});


app.listen(port, () => {
	console.log('서버 실행됨')
})