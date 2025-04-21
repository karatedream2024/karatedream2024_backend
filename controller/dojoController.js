
import DojoModel from '../model/dojoModel.js';

// Create a new dojo
export const addDojo = async (req, res) => {

    console.log('working weell')
    try {
        const dojo = new DojoModel(req.body);
        await dojo.save();
        res.status(201).json(dojo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all dojos
export const getAllDojos = async (req, res) => {
    const { limit, page } = req.params;
    console.log("dojo")
    try {
        const count = await DojoModel.find().countDocuments();
        const dojos = await DojoModel.find().skip( parseInt(limit)  * ( parseInt(page)  - 1)).limit(parseInt(limit) );
       
        res.status(200).json({status:"success", data:dojos, count:count});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a dojo by ID
export const getDojoById = async (req, res) => {
    try {
        const dojo = await DojoModel.findById(req.params.id);
        if (!dojo) {
            return res.status(404).json({ message: 'Dojo not found' });
        }
        res.status(200).json(dojo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a dojo by ID
export const updateDojo = async (req, res) => {
    console.log(req.params.id, req.body, 'its me')
    try {
        const dojo = await DojoModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!dojo) {
            return res.status(404).json({ message: 'Dojo not found' });
        }
        res.status(200).json(dojo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a dojo by ID
export const deleteDojo = async (req, res) => {
    try {
        const dojo = await DojoModel.findByIdAndDelete(req.params.id);
        if (!dojo) {
            return res.status(404).json({ message: 'Dojo not found' });
        }
        res.status(200).json({ message: 'Dojo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
