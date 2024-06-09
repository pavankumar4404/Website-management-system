import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.url ||
      !request.body.department||
      !request.body.frontend ||
      !request.body.backend ||
      !request.body.serverType ||
      !request.body.serverVersion ||
      !request.body.ipv4Local ||
      !request.body.location 
    ) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }
    const newBook = {
        name:request.body.name,
        url:request.body.url,
        description:request.body.description,
        department:request.body.department,
        websiteType:request.body.websiteType,
        frontend:request.body.frontend,
        backend:request.body.backend,
        database:request.body.database,
        webServer:request.body.webServer,
        serverType:request.body.serverType,
        serverOs:request.body.serverOs,
        serverVersion:request.body.serverVersion,
        ipv4Local:request.body.ipv4Local,
        ipv4Public:request.body.ipv4Public,
        ipv6Local:request.body.ipv6Local,
        ipv6Public:request.body.ipv6Public,
        location:request.body.location,
        serverState:request.body.serverState,
        serverDistrict:request.body.serverDistrict,
        teamMember:request.body.teamMember,
        role:request.body.role,
        personalEmail:request.body.personalEmail,
        desigEmail:request.body.desigEmail,
        sslCertificate:request.body.sslCertificate,
        sslValidDate:request.body.sslValidDate,
        sslIssuer:request.body.sslIssuer,
        securityAudit:request.body.securityAudit,
        auditValidDateDate:request.body.auditValidDate,
        auditVendor:request.body.auditVendor,
        pacApproved:request.body.pacApproved,
        pacType:request.body.pacType,
        pacNo:request.body.pacNo,
        pacDate:request.body.pacDate,
        pacDocument:request.body.pacDocument,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.url ||
      !request.body.department||
      !request.body.frontend ||
      !request.body.backend ||
      !request.body.serverType ||
      !request.body.serverVersion ||
      !request.body.ipv4Local ||
      !request.body.location 
    ) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Record not found' });
    }

    return response.status(200).send({ message: 'Record updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
