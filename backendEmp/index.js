
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

app.get("/emps", (req, res) => {
  const q = "SELECT * FROM employee";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get('/emps/:emp_id', (req, res) => {
  const empId = req.params.emp_id;
  const q = 'SELECT * FROM employee WHERE emp_id = ?';
  
  db.query(q, [empId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.post("/emps", (req, res) => {
  const q = "INSERT INTO employee(`emp_id`, `emp_name`, `designation_id`, `name_based_email_id`,`mobile_no`,`posting_location_id`,`ip_phone`,`emergency_contact_no`,`state_id`,`district_id`,`emp_type`) VALUES (?)";

  const values = [
    req.body.emp_id,
    req.body.emp_name,
    req.body.designation_id,
    req.body.name_based_email_id,
    req.body.mobile_no,
    req.body.posting_location_id,
    req.body.ip_phone,
    req.body.emergency_contact_no,
    req.body.state_id,
    req.body.district_id,
    req.body.emp_type
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/emps/:emp_id', (req, res) => {
  const empId = req.params.emp_id;
  const q = 'DELETE FROM employee WHERE emp_id = ?';

  db.query(q, [empId], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.json({ message: 'Employee deleted successfully', data });
  });
});

app.put("/emps/:emp_id", (req, res) => {
  const empId = req.params.emp_id;
  const q = "UPDATE employee SET `emp_id`= ?, `emp_name`= ?, `designation_id`= ?, `name_based_email_id`= ?, `mobile_no`= ?, `posting_location_id`= ?, `ip_phone`= ?, `emergency_contact_no`= ?, `state_id`= ?, `district_id`= ?, `emp_type`= ? WHERE emp_id = ?";

  const values = [
    req.body.emp_id,
    req.body.emp_name,
    req.body.designation_id,
    req.body.name_based_email_id,
    req.body.mobile_no,
    req.body.posting_location_id,
    req.body.ip_phone,
    req.body.emergency_contact_no,
    req.body.state_id,
    req.body.district_id,
    req.body.emp_type
  ];

  db.query(q, [...values, empId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.get('/states', (req, res) => {
  const q = 'SELECT state_id, state_name FROM state'; 
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});


app.get('/districts', (req, res) => {
  const q = 'SELECT district_id, district_name FROM district'; 
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get('/common_names/category/11', (req, res) => {
  const query = 'SELECT common_id, common_name FROM common_list WHERE category_id = 11';
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
