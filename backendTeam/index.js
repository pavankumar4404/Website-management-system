// import express from 'express';
// import { PORT, mongoDBURL } from './config.js';
// import mongoose from 'mongoose';
// import teamsRoute from './routes/teamsRoute.js';
// import cors from 'cors';

// const app = express();

// app.use(express.json());

// app.use(cors());

// app.get('/', (request, response) => {
//   console.log(request);
//   return response.status(234).send('Welcome To MERN Stack Tutorial');
// });

// app.use('/teams', teamsRoute);

// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log('App connected to database');
//     app.listen(PORT, () => {
//       console.log(`App is listening to port: ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });


import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "wms22",
});


app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/teams", (req, res) => {
  const q = "SELECT * FROM team";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get('/teams/:emp_id', (req, res) => {
  const empId = req.params.emp_id;
  const q = 'SELECT * FROM team WHERE emp_id = ?';
  
  db.query(q, [empId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.post("/teams", (req, res) => {
  const q = "INSERT INTO team(`emp_id`, `team_id`) VALUES (?)";

  const values = [
    req.body.emp_id,
    req.body.team_id,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/teams/:emp_id', (req, res) => {
  const emailId = req.params.emp_id;
  const q = 'DELETE FROM team WHERE emp_id = ?';

  db.query(q, [emailId], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.json({ message: 'Employee deleted successfully', data });
  });
});

app.put('/teams/:emp_id', (req, res) => {
  const empId = req.params.emp_id;
  const q = 'UPDATE team SET emp_id = ?, team_id = ? WHERE emp_id = ?';
  
  const values = [
    req.body.emp_id,
    req.body.team_id,
  ];

  db.query(q, [...values, empId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});



app.get('/common_names/category/16', (req, res) => {
  const query = 'SELECT common_id, common_name FROM common_list WHERE category_id = 16';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


app.get('/common_names/category/7', (req, res) => {
  const query = 'SELECT common_id, common_name FROM common_list WHERE category_id = 7';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


app.listen(8800, () => {
  console.log("Connected to backend.");
});
