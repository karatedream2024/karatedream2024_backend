import express from 'express';
import { addContact, deletecontact, getAllContacts } from '../controller/contactController.js'; // Adjust import path as needed

const contactrouter = express.Router()

contactrouter.post('/addcontact', addContact);    // Create a new contact entry
contactrouter.get('/getcontact', getAllContacts); // Get all contact entries
contactrouter.get('/deletecontact', deletecontact); // Get all contact entries

export default contactrouter;
