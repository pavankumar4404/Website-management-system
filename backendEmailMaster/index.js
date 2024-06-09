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

app.get("/emails", (req, res) => {
  const q = "SELECT * FROM email_master";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get('/emails/:email_id', (req, res) => {
  const empId = req.params.emp_id;
  const q = 'SELECT * FROM email_master WHERE email_id = ?';
  
  db.query(q, [empId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.post("/emails", (req, res) => {
  const q = "INSERT INTO email_master(`emp_id`, `email_id`, `email_type`, `email_detail`) VALUES (?)";

  const values = [
    req.body.emp_id,
    req.body.email_id,
    req.body.email_type,
    req.body.email_detail,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/emails/:email_id', (req, res) => {
  const emailId = req.params.email_id;
  const q = 'DELETE FROM email_master WHERE email_id = ?';

  db.query(q, [emailId], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.json({ message: 'Employee deleted successfully', data });
  });
});

app.put("/emails/:email_id", (req, res) => {
  const emailId = req.params.email_id;
  const q = "UPDATE email_master SET `emp_id`= ?, `email_id`= ?, `email_type`= ?, `email_detail`= ? WHERE email_id = ?";

  const values = [
    req.body.emp_id,
    req.body.email_id,
    req.body.email_type,
    req.body.email_detail,
  ];

  db.query(q, [...values, emailId], (err, data) => {
    if (err) return res.send(err);
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
