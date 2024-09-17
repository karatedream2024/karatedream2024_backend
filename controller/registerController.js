// controllers/registrationController.js

// import RegistrationModel from "../model/registerModel";

import RegistrationModel from '../model/registerModel.js';


// Create a new registration
export const addRegistration = async (req, res) => {
    console.log()
    try {
        const registration = new RegistrationModel(req.body);
        await registration.save();
        res.status(201).json(registration);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all registrations 
export const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await RegistrationModel.find();
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a registration by ID
export const getRegistrationById = async (req, res) => {
    try {
        const registration = await RegistrationModel.findById(req.params.id);
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }
        res.status(200).json(registration);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a registration by ID
export const updateRegistration = async (req, res) => {
    try {
        const registration = await RegistrationModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }
        res.status(200).json(registration);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a registration by ID
export const deleteRegistration = async (req, res) => {
    try {
        const registration = await RegistrationModel.findByIdAndDelete(req.params.id);
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }
        res.status(200).json({ message: 'Registration deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
