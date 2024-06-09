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
  password: "pavan4404",
  database: "wms22",
});

app.get("/", (req, res) => {
  res.json("hello");
});

// login page

app.post('/login', (req, res) => {
  const { user_id, password } = req.body;
  const query = 'SELECT * FROM users WHERE user_id = ? AND password = ?';

  db.query(query, [user_id, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    
    if (results.length > 0) {
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});


// website master


app.get("/websitemasters", (req, res) => {
  const q = "SELECT * FROM website_master";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/websitemasters/:website_id", (req, res) => {
  const empId = req.params.website_id;
  const q = "SELECT * FROM website_master WHERE website_id = ?";

  db.query(q, [empId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.post("/websitemasters", (req, res) => {
  const q =
    "INSERT INTO website_master(`website_id`, `website_url`, `website_name`, `website_description`,`dept_id`,`last_audit_status`,`last_audit_date`,`last_audit_validity_date`,`last_ssl_status`,`last_ssl_date`,`last_ssl_validity_date`,`last_pac_category`, `last_pac_no`, `last_pac_date`, `last_pac_status`,`remarks`,`website_status_id`) VALUES (?)";

  const values = [
    req.body.website_id,
    req.body.website_url,
    req.body.website_name,
    req.body.website_description,
    req.body.dept_id,
    req.body.last_audit_status,
    req.body.last_audit_date,
    req.body.last_audit_validity_date,
    req.body.last_ssl_status,
    req.body.last_ssl_date,
    req.body.last_ssl_validity_date,
    req.body.last_pac_category,
    req.body.last_pac_no,
    req.body.last_pac_date,
    req.body.last_pac_status,
    req.body.remarks,
    req.body.website_status_id,
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    return res.json(data);
  });
});

app.delete("/websitemasters/:website_id", (req, res) => {
  const empId = req.params.website_id;
  const q = "DELETE FROM website_master WHERE website_id = ?";

  db.query(q, [empId], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.json({ message: "Website deleted successfully", data });
  });
});

app.put("/websitemasters/:website_id", (req, res) => {
  const empId = req.params.website_id;
  const q =
    "UPDATE website_master SET `website_id`= ?, `website_url`= ?, `website_name`= ?, `website_description`= ?, `dept_id`= ?, `last_audit_status`= ?, `last_audit_date`= ?, `last_audit_validity_date`= ?, `last_ssl_status`= ?, `last_ssl_date`= ?, `last_ssl_validity_date`= ?, `last_pac_category`= ?, `last_pac_no`= ?, `last_pac_date`= ?, `last_ssl_status`= ?, `remarks`= ?, `website_status_id`= ? WHERE emp_id = ?";

  const values = [
    req.body.website_id,
    req.body.website_url,
    req.body.website_description,
    req.body.dept_id,
    req.body.last_audit_status,
    req.body.last_audit_date,
    req.body.last_audit_validity_date,
    req.body.last_ssl_status,
    req.body.last_ssl_date,
    req.body.last_ssl_validity_date,
    req.body.last_pac_category,
    req.body.last_pac_no,
    req.body.last_pac_date,
    req.body.last_pac_status,
    req.body.remarks,
    req.body.website_status_id,
  ];

  db.query(q, [...values, empId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.get("/department", (req, res) => {
  const q = "SELECT dept_id, dept_name FROM department";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/districts", (req, res) => {
  const q = "SELECT district_id, district_name FROM district";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/common_names/category/13", (req, res) => {
  const query =
    "SELECT common_id, common_name FROM common_list WHERE category_id = 13";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/common_names/category/10", (req, res) => {
  const query =
    "SELECT common_id, common_name FROM common_list WHERE category_id = 10";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/common_names/category/19", (req, res) => {
  const query =
    "SELECT common_id, common_name FROM common_list WHERE category_id = 19";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

//Routes for the website document

app.get("/websitedocuments", (req, res) => {
  const q = "SELECT * FROM website_document";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/websitedocuments/:document_id", (req, res) => {
  const empId = req.params.document_id;
  const q = "SELECT * FROM website_document WHERE document_id = ?";

  db.query(q, [empId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.post("/websitedocuments", (req, res) => {
  const q =
    "INSERT INTO website_document(`website_id`, `category_id`, `common_id`, `document_name`,`vendor_name`,`issue_date`,`validity_date`,`pac_no`,`pac_category`,`document_id`,`document_path`) VALUES (?)";

  const values = [
    req.body.website_id,
    req.body.category_id,
    req.body.common_id,
    req.body.document_name,
    req.body.vendor_name,
    req.body.issue_date,
    req.body.validity_date,
    req.body.pac_no,
    req.body.pac_category,
    req.body.document_id,
    req.body.document_path,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/websitedocuments/:document_id", (req, res) => {
  const empId = req.params.document_id;
  const q = "DELETE FROM website_document WHERE document_id = ?";

  db.query(q, [empId], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.json({ message: "Website deleted successfully", data });
  });
});

app.get("/common_names/category/18", (req, res) => {
  const query =
    "SELECT common_id, common_name,document_path FROM common_list WHERE category_id = 18";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

//Routes for the website team

app.get("/websiteteams", (req, res) => {
  const q = "SELECT * FROM website_team";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/websitedocuments/:email_id", (req, res) => {
  const empId = req.params.email_id;
  const q = "SELECT * FROM website_team WHERE email_id = ?";

  db.query(q, [empId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.post("/websiteteams", (req, res) => {
  const q =
    "INSERT INTO website_team(`website_id`, `emp_id`, `emp_role`, `email_id`,`transfer_date`,`transfer_to_emp_email_id`,`transfer_to_emp_id`,`transfer_to_emp_role`,`status`) VALUES (?)";

  const values = [
    req.body.website_id,
    req.body.emp_id,
    req.body.emp_role,
    req.body.email_id,
    req.body.transfer_date,
    req.body.transfer_to_emp_email_id,
    req.body.transfer_to_emp_id,
    req.body.transfer_to_emp_role,
    req.body.status,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/websiteteams/:email_id", (req, res) => {
  const empId = req.params.email_id;
  const q = "DELETE FROM website_team WHERE email_id = ?";

  db.query(q, [empId], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.json({ message: "Website deleted successfully", data });
  });
});

app.get("/common_names/category/18", (req, res) => {
  const query =
    "SELECT common_id, common_name,document_path FROM common_list WHERE category_id = 18";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

//Routes for Team Managemnet(team table in sql)
app.post("/teams", (req, res) => {
  const q = "INSERT INTO team(`emp_id`, `team_id`) VALUES (?)";

  const values = [req.body.emp_id, req.body.team_id];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
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

app.get("/teams/:emp_id", (req, res) => {
  const empId = req.params.emp_id;
  const q = "SELECT * FROM team WHERE emp_id = ?";

  db.query(q, [empId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.delete("/teams/:emp_id", (req, res) => {
  const emailId = req.params.emp_id;
  const q = "DELETE FROM team WHERE emp_id = ?";

  db.query(q, [emailId], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.json({ message: "Employee deleted successfully", data });
  });
});

app.put("/teams/:emp_id", (req, res) => {
  const empId = req.params.emp_id;
  const q = "UPDATE team SET emp_id = ?, team_id = ? WHERE emp_id = ?";

  const values = [req.body.emp_id, req.body.team_id];

  db.query(q, [...values, empId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

//Routes for Employee Management(employee table from sql)
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

app.get("/emps/:emp_id", (req, res) => {
  const empId = req.params.emp_id;
  const q = "SELECT * FROM employee WHERE emp_id = ?";

  db.query(q, [empId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.post("/emps", (req, res) => {
  const q =
    "INSERT INTO employee(`emp_id`, `emp_name`, `designation_id`, `name_based_email_id`,`mobile_no`,`posting_location_id`,`ip_phone`,`emergency_contact_no`,`state_id`,`district_id`,`emp_type`) VALUES (?)";

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
    req.body.emp_type,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/emps/:emp_id", (req, res) => {
  const empId = req.params.emp_id;
  const q = "DELETE FROM employee WHERE emp_id = ?";

  db.query(q, [empId], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.json({ message: "Employee deleted successfully", data });
  });
});

app.put("/emps/:emp_id", (req, res) => {
  const empId = req.params.emp_id;
  const q =
    "UPDATE employee SET `emp_id`= ?, `emp_name`= ?, `designation_id`= ?, `name_based_email_id`= ?, `mobile_no`= ?, `posting_location_id`= ?, `ip_phone`= ?, `emergency_contact_no`= ?, `state_id`= ?, `district_id`= ?, `emp_type`= ? WHERE emp_id = ?";

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
    req.body.emp_type,
  ];

  db.query(q, [...values, empId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.get("/states", (req, res) => {
  const q = "SELECT state_id, state_name FROM state";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/common_names/category/11", (req, res) => {
  const query =
    "SELECT common_id, common_name FROM common_list WHERE category_id = 11";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/common_names/category/7", (req, res) => {
  const query =
    "SELECT common_id, common_name FROM common_list WHERE category_id = 7";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Routes for Frontend Email Master

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

app.get("/emails/:email_id", (req, res) => {
  const empId = req.params.emp_id;
  const q = "SELECT * FROM email_master WHERE email_id = ?";

  db.query(q, [empId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.post("/emails", (req, res) => {
  const q =
    "INSERT INTO email_master(`emp_id`, `email_id`, `email_type`, `email_detail`) VALUES (?)";

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

app.delete("/emails/:email_id", (req, res) => {
  const emailId = req.params.email_id;
  const q = "DELETE FROM email_master WHERE email_id = ?";

  db.query(q, [emailId], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.json({ message: "Employee deleted successfully", data });
  });
});

app.put("/emails/:email_id", (req, res) => {
  const emailId = req.params.email_id;
  const q =
    "UPDATE email_master SET `emp_id`= ?, `email_id`= ?, `email_type`= ?, `email_detail`= ? WHERE email_id = ?";

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

app.get("/common_names/category/16", (req, res) => {
  const query =
    "SELECT common_id, common_name FROM common_list WHERE category_id = 16";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Routes for Frontend vulnerability Action

// Function to generate a new vulnerability ID
const generateVulnerabilityId = () => {
  const now = moment();
  return `VUL${now.format("DDMMYYYYss")}`;
};

// Function to generate a new action ID
const generateActionId = () => {
  const now = moment();
  return `RPL${now.format("DDMMYYYYss")}`;
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
app.get("/vulnerabilities/:id", (req, res) => {
  const vulnerabilityId = req.params.id;
  const q = "SELECT * FROM vulnerability_detail WHERE vulnerability_id = ?";

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
  const q =
    "INSERT INTO vulnerability_detail(`website_id`, `vulnerability_id`, `vulnerability_source`, `vulnerability_subject`, `reported_date`, `document_path`, `reference_link`, `status`) VALUES (?)";

  const values = [
    req.body.website_id,
    vulnerabilityId,
    req.body.vulnerability_source,
    req.body.vulnerability_subject,
    req.body.reported_date,
    req.body.document_path,
    req.body.reference_link,
    req.body.status,
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
  const q =
    "UPDATE vulnerability_detail SET `website_id`= ?, `vulnerability_source`= ?, `vulnerability_subject`= ?, `reported_date`= ?, `document_path`= ?, `reference_link`= ?, `status`= ? WHERE vulnerability_id = ?";

  const values = [
    req.body.website_id,
    req.body.vulnerability_source,
    req.body.vulnerability_subject,
    req.body.reported_date,
    req.body.document_path,
    req.body.reference_link,
    req.body.status,
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
app.delete("/vulnerabilities/:id", (req, res) => {
  const vulnerabilityId = req.params.id;
  const q = "DELETE FROM vulnerability_detail WHERE vulnerability_id = ?";

  db.query(q, [vulnerabilityId], (err, data) => {
    if (err) {
      console.error("Error deleting vulnerability:", err); // Log the error
      return res.status(500).send(err);
    }
    return res.json({ message: "Vulnerability deleted successfully", data });
  });
});

// Endpoint to retrieve common_list items by category name
app.get("/common_names/category/:category", (req, res) => {
  const categoryName = req.params.category;
  const q =
    "SELECT common_id, common_name FROM common_list WHERE category_id = ?";
  db.query(q, [categoryName], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Endpoint to create a new vulnerability action
app.post("/vulnerability_action", (req, res) => {
  const q = "SELECT * FROM vulnerability_action WHERE vulnerability_id = ?";
  db.query(q, [req.body.vulnerability_id], (err, results) => {
    if (err) {
      console.error("Error checking for existing vulnerability action:", err); // Log the error
      return res.status(500).send(err);
    }

    if (results.length > 0) {
      return res
        .status(400)
        .send({ message: "Action already exists for this vulnerability" });
    }

    const actionId = generateActionId();
    const insertQuery =
      "INSERT INTO vulnerability_action(`website_id`,`vulnerability_id`, `action_id`,  `action_detail`, `action_date`, `vulnerability_status`) VALUES (?)";

    const values = [
      req.body.website_id,
      req.body.vulnerability_id,
      actionId,
      req.body.action_detail,
      req.body.action_date,
      req.body.vulnerability_status,
    ];

    console.log("Values to insert into action:", values); // Add this line to log the values being inserted

    db.query(insertQuery, [values], (err, data) => {
      if (err) {
        console.error("Error inserting vulnerability action:", err); // Log the error
        return res.status(500).send(err);
      }

      // Update the status in the vulnerability_detail table as well
      const updateQuery =
        "UPDATE vulnerability_detail SET `status` = ? WHERE vulnerability_id = ?";
      db.query(
        updateQuery,
        [req.body.vulnerability_status, req.body.vulnerability_id],
        (updateErr, updateData) => {
          if (updateErr) {
            console.error("Error updating vulnerability status:", updateErr); // Log the error
            return res.status(500).send(updateErr);
          }
          return res.json(data);
        }
      );
    });
  });
});

// Endpoint to retrieve vulnerability action by action ID
app.get("/vulnerability_action/:id", (req, res) => {
  const actionId = req.params.id;
  const q = "SELECT * FROM vulnerability_action WHERE action_id = ?";

  db.query(q, [actionId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data[0]);
  });
});

// Endpoint to retrieve vulnerability action by vulnerability ID
app.get("/vulnerability_action/vulnerability/:vulnerabilityId", (req, res) => {
  const vulnerabilityId = req.params.vulnerabilityId;
  const q = "SELECT * FROM vulnerability_action WHERE vulnerability_id = ?";

  db.query(q, [vulnerabilityId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data[0]);
  });
});
app.get("/websitemasters1", (req, res) => {
  const q = "SELECT website_id, website_url FROM website_master";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// Endpoint to update a vulnerability action by ID
app.put("/vulnerability_action/:id", (req, res) => {
  const actionId = req.params.id;
  const q =
    "UPDATE vulnerability_action SET `action_detail`= ?, `action_date`= ?, `vulnerability_status`= ? WHERE action_id = ?";

  const values = [
    req.body.action_detail,
    req.body.action_date,
    req.body.vulnerability_status,
  ];

  console.log("Values to update in action:", values); // Add this line to log the values being updated

  db.query(q, [...values, actionId], (err, data) => {
    if (err) {
      console.error("Error updating vulnerability action:", err); // Log the error
      return res.status(500).send(err);
    }

    // Update the status in the vulnerability_detail table as well
    const updateQuery =
      "UPDATE vulnerability_detail SET `status` = ? WHERE vulnerability_id = ?";
    db.query(
      updateQuery,
      [req.body.vulnerability_status, req.body.vulnerability_id],
      (updateErr, updateData) => {
        if (updateErr) {
          console.error("Error updating vulnerability status:", updateErr); // Log the error
          return res.status(500).send(updateErr);
        }
        return res.json(data);
      }
    );
  });
});

// Endpoint to retrieve websites

app.get("/common_names/category/15", (req, res) => {
  const query =
    "SELECT common_id, common_name FROM common_list WHERE category_id = 15";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/getEmployee", (req, res) => {
  const query = "SELECT emp_id, emp_name FROM employee";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});



app.get("/vulnerability_with_website/:id", (req, res) => {
  const vulnerabilityId = req.params.id;
  const q = `
    SELECT 
      vd.vulnerability_id, vd.website_id, vd.vulnerability_source, 
      vd.vulnerability_subject, vd.reported_date, vd.document_path, 
      vd.reference_link, vd.status,
      wm.website_url, wm.website_name
    FROM 
      vulnerability_detail vd
    JOIN 
      website_master wm ON vd.website_id = wm.website_id
    WHERE 
      vd.vulnerability_id = ?
  `;

  db.query(q, [vulnerabilityId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data[0]);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
