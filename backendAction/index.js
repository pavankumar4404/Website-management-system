import express from "express";
import mysql from "mysql";
import cors from "cors";
import moment from "moment";

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

// Function to generate a new vulnerability ID
const generateVulnerabilityId = () => {
  const now = moment();
  return `VUL${now.format('DDMMYYYYss')}`;
};

// Function to generate a new action ID
const generateActionId = () => {
  const now = moment();
  return `RPL${now.format('DDMMYYYYss')}`;
};

// Endpoint to retrieve vulnerability details
app.get("/vulnerabilities", (req, res) => {
  const q = "SELECT * FROM vulnerability_detail";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// Endpoint to retrieve vulnerability by ID
app.get('/vulnerabilities/:id', (req, res) => {
  const vulnerabilityId = req.params.id;
  const q = 'SELECT * FROM vulnerability_detail WHERE vulnerability_id = ?';
  
  db.query(q, [vulnerabilityId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data[0]);
  });
});

// Endpoint to create a new vulnerability
app.post("/vulnerabilities", (req, res) => {
  const vulnerabilityId = generateVulnerabilityId();
  const q = "INSERT INTO vulnerability_detail(`website_id`, `vulnerability_id`, `vulnerability_source`, `vulnerability_subject`, `reported_date`, `document_path`, `reference_link`, `status`) VALUES (?)";

  const values = [
    req.body.website_id,
    vulnerabilityId,
    req.body.vulnerability_source,
    req.body.vulnerability_subject,
    moment(req.body.reported_date).format('YYYY-MM-DD'),
    req.body.document_path,
    req.body.reference_link,
    req.body.status
  ];

  console.log("Values to insert:", values); // Add this line to log the values being inserted

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error("Error inserting vulnerability:", err); // Log the error
      return res.status(500).send(err);
    }
    return res.json(data);
  });
});

// Endpoint to update a vulnerability by ID
app.put("/vulnerabilities/:id", (req, res) => {
  const vulnerabilityId = req.params.id;
  const q = "UPDATE vulnerability_detail SET `website_id`= ?, `vulnerability_source`= ?, `vulnerability_subject`= ?, `reported_date`= ?, `document_path`= ?, `reference_link`= ?, `status`= ? WHERE vulnerability_id = ?";

  const values = [
    req.body.website_id,
    req.body.vulnerability_source,
    req.body.vulnerability_subject,
    moment(req.body.reported_date).format('YYYY-MM-DD'),
    req.body.document_path,
    req.body.reference_link,
    req.body.status
  ];

  console.log("Values to update:", values); // Add this line to log the values being updated

  db.query(q, [...values, vulnerabilityId], (err, data) => {
    if (err) {
      console.error("Error updating vulnerability:", err); // Log the error
      return res.status(500).send(err);
    }
    return res.json(data);
  });
});

// Endpoint to delete a vulnerability by ID
app.delete('/vulnerabilities/:id', (req, res) => {
  const vulnerabilityId = req.params.id;
  const q = 'DELETE FROM vulnerability_detail WHERE vulnerability_id = ?';

  db.query(q, [vulnerabilityId], (err, data) => {
    if (err) {
      console.error("Error deleting vulnerability:", err); // Log the error
      return res.status(500).send(err);
    }
    return res.json({ message: 'Vulnerability deleted successfully', data });
  });
});

// Endpoint to retrieve common_list items by category name
app.get('/common_names/category/:category', (req, res) => {
  const categoryName = req.params.category;
  const q = 'SELECT common_id, common_name FROM common_list WHERE category_id = ?';
  db.query(q, [categoryName], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Endpoint to create a new vulnerability action
app.post("/vulnerability_action", (req, res) => {
  const q = 'SELECT * FROM vulnerability_action WHERE vulnerability_id = ?';
  db.query(q, [req.body.vulnerability_id], (err, results) => {
    if (err) {
      console.error("Error checking for existing vulnerability action:", err); // Log the error
      return res.status(500).send(err);
    }

    if (results.length > 0) {
      return res.status(400).send({ message: 'Action already exists for this vulnerability' });
    }

    const actionId = generateActionId();
    const insertQuery = "INSERT INTO vulnerability_action(`website_id`,`vulnerability_id`, `action_id`,  `action_detail`, `action_date`, `vulnerability_status`) VALUES (?)";

    const values = [
      req.body.website_id,
      req.body.vulnerability_id,
      actionId,
      req.body.action_detail,
      moment(req.body.action_date).format('YYYY-MM-DD'),
      req.body.vulnerability_status
    ];

    console.log("Values to insert into action:", values); // Add this line to log the values being inserted

    db.query(insertQuery, [values], (err, data) => {
      if (err) {
        console.error("Error inserting vulnerability action:", err); // Log the error
        return res.status(500).send(err);
      }

      // Update the status in the vulnerability_detail table as well
      const updateQuery = "UPDATE vulnerability_detail SET `status` = ? WHERE vulnerability_id = ?";
      db.query(updateQuery, [req.body.vulnerability_status, req.body.vulnerability_id], (updateErr, updateData) => {
        if (updateErr) {
          console.error("Error updating vulnerability status:", updateErr); // Log the error
          return res.status(500).send(updateErr);
        }
        return res.json(data);
      });
    });
  });
});

// Endpoint to retrieve vulnerability action by action ID
app.get('/vulnerability_action/:id', (req, res) => {
  const actionId = req.params.id;
  const q = 'SELECT * FROM vulnerability_action WHERE action_id = ?';

  db.query(q, [actionId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data[0]);
  });
});

// Endpoint to retrieve vulnerability action by vulnerability ID
app.get('/vulnerability_action/vulnerability/:vulnerabilityId', (req, res) => {
  const vulnerabilityId = req.params.vulnerabilityId;
  const q = 'SELECT * FROM vulnerability_action WHERE vulnerability_id = ?';

  db.query(q, [vulnerabilityId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data[0]);
  });
});

// Endpoint to update a vulnerability action by ID
app.put("/vulnerability_action/:id", (req, res) => {
  const actionId = req.params.id;
  const q = "UPDATE vulnerability_action SET `action_detail`= ?, `action_date`= ?, `vulnerability_status`= ? WHERE action_id = ?";

  const values = [
    req.body.action_detail,
    moment(req.body.action_date).format('YYYY-MM-DD'),
    req.body.vulnerability_status
  ];

  console.log("Values to update in action:", values); // Add this line to log the values being updated

  db.query(q, [...values, actionId], (err, data) => {
    if (err) {
      console.error("Error updating vulnerability action:", err); // Log the error
      return res.status(500).send(err);
    }

    // Update the status in the vulnerability_detail table as well
    const updateQuery = "UPDATE vulnerability_detail SET `status` = ? WHERE vulnerability_id = ?";
    db.query(updateQuery, [req.body.vulnerability_status, req.body.vulnerability_id], (updateErr, updateData) => {
      if (updateErr) {
        console.error("Error updating vulnerability status:", updateErr); // Log the error
        return res.status(500).send(updateErr);
      }
      return res.json(data);
    });
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
