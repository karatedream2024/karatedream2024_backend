import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';

// Create a new user
const postUser = async (req, res) => {
    try {
        const userRegister = new User(req.body);
        await userRegister.save();
        res.status(201).send({
            status: "success",
            data: userRegister,
            message: "User Registered Successfully"
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Retrieve a user
 
const getUser = async (req, res) => {
    const { email } = req.body; // Assuming you're using email to find the user

    // Generate token for demonstration (this should typically be done in login)
    const token = jwt.sign(
        { data: 'foobar' }, 
        'secret', 
        { expiresIn: '1m' }
    );

    // Log the token for debugging
    console.log(token, 'rangerthings');

    // Example of token verification (for testing purposes)
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            console.log(err, 'Token verification failed');
            return res.status(401).send({ message: 'Invalid token' });
        }
        console.log(decoded, 'Token decoded');
    });

    try {
        const userRegister = await User.find({ email });
        if (!userRegister) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ 
            status: 'success', 
            data: userRegister, 
            token, 
            message: 'User Registered Successfully' 
        });
    } catch (error) {
        res.status(500).send({ message: 'Server Internal Error' });
    }
};


const getfulluser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).send({
            status: "success",
            data: user
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Update a user
const updateUser = async (req, res) => {
    const { email } = req.body;
    const updateFields = req.body;

    if (!email) {
        return res.status(400).send({
            message: "Email is required to update the user."
        });
    }

    try {
        const user = await User.findOneAndUpdate({ email }, updateFields, { new: true });

        if (!user) {
            return res.status(404).send({
                message: "User not found."
            });
        }

        res.status(200).send({
            status: "success",
            data: user,
            message: "User Updated Successfully"
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Delete a user
const deleteUser = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({
            message: "Email is required to delete the user."
        });
    }

    try {
        const user = await User.findOneAndDelete({ email });

        if (!user) {
            return res.status(404).send({
                message: "User not found."
            });
        }

        res.status(200).send({
            status: "success",
            message: "User Deleted Successfully"
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export { postUser, getUser, updateUser, deleteUser, getfulluser };
 