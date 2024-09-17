import EventModel from '../model/eventModel.js'; // Adjust the import path as needed

// Create a new event
export const addEvent = async (req, res) => {
    try {
        const newEvent = new EventModel(req.body);
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await EventModel.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Find an event by ID
export const findEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await EventModel.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an event by ID
export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvent = await EventModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const getAllEvents = async (req, res) => {
    try {
        const events = await EventModel.find(); // Retrieves all events from the collection
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};