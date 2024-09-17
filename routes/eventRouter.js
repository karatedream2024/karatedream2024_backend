import express from 'express';
import { addEvent, deleteEvent, findEventById, updateEvent, getAllEvents } from '../controller/EventController.js'; // Adjust the import path as needed

const eventrouter = express.Router();

eventrouter.post('/addevent', addEvent);             // Create a new event
eventrouter.get('/getevent', getAllEvents);          // Get all events
eventrouter.delete('/deleteevent/:id', deleteEvent);    // Delete an event by ID
// eventrouter.get('/events/:id', findEventById);     // Find an event by ID
eventrouter.put('/updateevent/:id', updateEvent);       // Update an event by ID

export default eventrouter;
