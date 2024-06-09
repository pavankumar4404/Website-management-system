import express from "express";
import { Website } from "../models/vulMasterModel.js";

const router = express.Router();

// Route to save a new website
router.post("/", async (request, response) => {
  try {
    const { website_url, website_name, dept, ip_addr, ssl, sec_audit, hod, os, loc } = request.body;

    if (!website_url || !website_name || !dept || !hod || !os || !loc) {
      return response.status(400).send({ message: "Send all required fields" });
    }

    const newWebsite = new Website({
      website_url,
      website_name,
      dept,
      ip_addr,
      ssl,
      sec_audit,
      hod,
      os,
      loc,
      vulDetails: [],
    });

    const website = await newWebsite.save();

    return response.status(201).send(website);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all websites
router.get("/", async (request, response) => {
  try {
    const websites = await Website.find({});
    return response.status(200).json({ count: websites.length, data: websites });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get a specific website by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const website = await Website.findById(id);

    if (!website) {
      return response.status(404).send({ message: "Record not found" });
    }

    return response.status(200).json(website);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a website's details
router.put("/:id", async (request, response) => {
  try {
    const { website_url, website_name, dept, ip_addr, ssl, sec_audit, hod, os, loc } = request.body;
    const { id } = request.params;

    if (!website_url || !website_name || !dept || !hod || !os || !loc) {
      return response.status(400).send({ message: "Send all required fields" });
    }

    const result = await Website.findByIdAndUpdate(id, {
      website_url,
      website_name,
      dept,
      ip_addr,
      ssl,
      sec_audit,
      hod,
      os,
      loc,
    });

    if (!result) {
      return response.status(404).json({ message: "Record not found" });
    }

    return response.status(200).send({ message: "Record updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to add a new vulnerability to a specific website
router.post("/:id/vulDetails", async (request, response) => {
  try {
    const { id } = request.params;
    const { vul_id, vul_reported_date, vul_subject, vul_report, vul_status, action, action_status } = request.body;

    if (!vul_id || !vul_reported_date || !vul_subject || !vul_report || !vul_status) {
      return response.status(400).send({ message: "Send all required fields" });
    }

    const website = await Website.findById(id);
    if (!website) {
      return response.status(404).send({ message: "Website not found" });
    }

    const newVulDetail = {
      vul_id,
      vul_reported_date,
      vul_subject,
      vul_report,
      vul_status,
      action,
      action_status,
    };

    website.vulDetails.push(newVulDetail);
    await website.save();

    return response.status(201).send(website);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a specific vulnerability of a website
router.put("/:id/vulDetails/:vulDetailId", async (request, response) => {
  try {
    const { id, vulDetailId } = request.params;
    const { vul_id, vul_reported_date, vul_subject, vul_report, vul_status, action, action_status } = request.body;

    if (!vul_id || !vul_reported_date || !vul_subject || !vul_report || !vul_status) {
      return response.status(400).send({ message: "Send all required fields" });
    }

    const website = await Website.findById(id);
    if (!website) {
      return response.status(404).send({ message: "Website not found" });
    }

    const vulDetail = website.vulDetails.id(vulDetailId);
    if (!vulDetail) {
      return response.status(404).send({ message: "Vulnerability detail not found" });
    }

    vulDetail.vul_id = vul_id;
    vulDetail.vul_reported_date = vul_reported_date;
    vulDetail.vul_subject = vul_subject;
    vulDetail.vul_report = vul_report;
    vulDetail.vul_status = vul_status;
    vulDetail.action = action;
    vulDetail.action_status = action_status;

    await website.save();

    return response.status(200).send(website);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;


// import express from 'express';
// import { Book } from '../models/bookModel.js';

// const router = express.Router();

// // Route for Save a new Book
// router.post('/', async (request, response) => {
//   try {
//     if (
//       !request.body.websiteUrl ||!request.body.websiteName ||!request.body.department ||!request.body.ipAddress ||!request.body.ssl ||!request.body.securityAudit ||!request.body.hodName ||!request.body.osName ||!request.body.location ||!request.body.vulTotal ||!request.body.vulOpened ||!request.body.vulClosed
//     ) {
//       return response.status(400).send({
//         message: 'Send all required fields: title, author, publishYear',
//       });
//     }
//     const newBook = {
//       websiteUrl: request.body.websiteUrl,
//       websiteName: request.body.websiteName,
//       department: request.body.department,
//       ipAddress: request.body.ipAddress,
//       ssl: request.body.ssl,
//       securityAudit: request.body.securityAudit,
//       hodName: request.body.hodName,
//       osName: request.body.osName,
//       location: request.body.location,
//       vulTotal: request.body.vulTotal,
//       vulOpened: request.body.vulOpened,
//       vulClosed: request.body.vulClosed,
//     };

//     const book = await Book.create(newBook);

//     return response.status(201).send(book);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// // Route for Get All Books from database
// // router.get('/', async (request, response) => {
// //   try {
// //     const books = await Book.find({});

// //     return response.status(200).json({
// //       count: books.length,
// //       data: books,
// //     });
// //   } catch (error) {
// //     console.log(error.message);
// //     response.status(500).send({ message: error.message });
// //   }
// // });
// router.get('/', async (req, res) => {
//   try {
//     const books = await Book.find({ vulId: null });

//     return res.status(200).json({
//       count: books.length,
//       data: books,
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });


// // Route for Get One Book from database by id
// router.get('/:id', async (request, response) => {
//   try {
//     const { id } = request.params;

//     const book = await Book.findById(id);

//     return response.status(200).json(book);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// router.post('/:id/reportDetail', async (req, res) => {
//   const { id } = req.params;
//   const reportDetails = req.body;

//   try {
//     const book = await Book.findById(id);

//     if (!book) {
//       return res.status(404).send({ message: 'Book not found' });
//     }

//     reportDetails.websiteUrl = book.websiteUrl;

//     const updatedBook = await Book.findByIdAndUpdate(
//       id,
//       { $push: { reportDetails } },
//       { new: true }
//     );

//     res.status(201).json(updatedBook);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: error.message });
//   }
// });

// // Define the GET request route
// // router.get('/:id/filteredReports', async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const reports = await Book.find({ websiteUrl: id, vulId: { $ne: null } });
// //     res.status(200).json(reports);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });
// router.get('/:id/reportDetails', async (req, res) => {
//   try {
//     const books = await Book.find({ vulId: { $ne: null } });

//     return res.status(200).json({
//       count: books.length,
//       data: books,
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

// // Route for Update a Book
// router.put('/:id', async (request, response) => {
//   try {
//     // Check for required fields
//     const requiredFields = [
//       'websiteUrl',
//       'websiteName',
//       'department',
//       'ipAddress',
//       'ssl',
//       'securityAudit',
//       'hodName',
//       'osName',
//       'location',
//       'vulTotal',
//       'vulOpened',
//       'vulClosed',
//     ];
//     const missingFields = requiredFields.filter(field => !request.body[field]);
//     if (missingFields.length > 0) {
//       return response.status(400).send({
//         message: `Missing required fields: ${missingFields.join(', ')}`,
//       });
//     }

//     const { id } = request.params;

//     // Update book using Mongoose
//     const updatedBook = await Book.findByIdAndUpdate(id, request.body, {
//       new: true, // Return the updated book instead of the original
//       runValidators: true, // Validate data before update
//     });

//     if (!updatedBook) {
//       return response.status(404).json({ message: 'Book not found' });
//     }

//     return response.status(200).send({ message: 'Book updated successfully' });
//   } catch (error) {
//     console.error(error.message);

//     // Handle specific errors (e.g., validation errors, database errors)
//     if (error.name === 'ValidationError') {
//       const validationErrors = Object.values(error.errors).map(err => err.message);
//       return response.status(400).send({ message: validationErrors.join(', ') });
//     } else {
//       return response.status(500).send({ message: 'Internal server error' });
//     }
//   }
// });


// // Route for Delete a book
// router.delete('/:id', async (request, response) => {
//   try {
//     const { id } = request.params;

//     const result = await Book.findByIdAndDelete(id);

//     if (!result) {
//       return response.status(404).json({ message: 'Book not found' });
//     }

//     return response.status(200).send({ message: 'Book deleted successfully' });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });


// router.post('/addWebsite', async (req, res) => {
//   try {
//     const newBook = new Book(req.body);
//     const savedBook = await newBook.save();
//     res.status(201).json(savedBook);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Route to get all websites
// router.get('/websites', async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.status(200).json(books);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Route to get vulnerabilities for a specific website by URL
// router.get('/:id/filteredReports', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const reports = await Book.find({ websiteUrl: id, vulId: { $ne: null } });
//     res.status(200).json(reports);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Route to add vulnerability details to a website
// router.post('/:id/addVulnerability', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedBook = await Book.findByIdAndUpdate(id, { $push: req.body }, { new: true });
//     res.status(200).json(updatedBook);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;
