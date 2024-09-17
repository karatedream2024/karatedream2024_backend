import express from 'express';
import { addDojo, getAllDojos, getDojoById, updateDojo, deleteDojo } from '../controller/dojoController.js'; // Adjust import path as needed

const dojorouter = express.Router()

dojorouter.post('/adddojo', addDojo);              // Create a new dojo
dojorouter.get('/getdojo', getAllDojos);           // Get all dojos
dojorouter.get('/onedojo/:id', getDojoById);       // Get a dojo by ID
dojorouter.put('/updatedojo/:id', updateDojo);        // Update a dojo by ID
dojorouter.delete('/deletedojo/:id', deleteDojo);     // Delete a dojo by ID

export default dojorouter;
