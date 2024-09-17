import ContactModel from '../model/contactModel.js';

// Create a new contact entry
export const addContact = async (req, res) => {
    try {
        const contact = new ContactModel(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all contact entries 
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactModel.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletecontact = async (req, res) => {
    try {
        const registration = await ContactModel.findByIdAndDelete(req.params.id);
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }
        res.status(200).json({ message: 'Registration deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
