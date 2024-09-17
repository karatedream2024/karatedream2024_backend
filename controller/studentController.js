import studentModel from '../model/studentModel.js';

// POST - Insert (Create a new student)
const postStudent = async (req, res) => {
    console.log(typeof req.body.dob, 'larger thane')
    try {
        const userRegister = new studentModel(req.body);
        await userRegister.save();
        
        res.status(200).send({ status: "success", data: userRegister, message: "Student Registered Successfully" });
    } catch (error) {
        res.status(400).send({ message: "Server Internal Error" });
    }
};

// PUT - Update student details
const updateStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedStudent = await studentModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(404).send({ message: "Student Not Found" });
        }
        res.status(200).send({ status: "success", data: updatedStudent, message: "Student Updated Successfully" });
    } catch (error) {
        res.status(400).send({ message: "Server Internal Error" });
    }
};

// DELETE - Remove student from the database
const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudent = await studentModel.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).send({ message: "Student Not Found" });
        }
        res.status(200).send({ status: "success", message: "Student Deleted Successfully" });
    } catch (error) {
        res.status(400).send({ message: "Server Internal Error" });
    }
};

// PUT - Toggle Enable/Disable student (set isActive to true or false)
const toggleStudentActiveStatus = async (req, res) => {
    const { id } = req.params;


    try {

        const findStatus = await studentModel.findById(id);
        const isActive = findStatus.isActive === true ? false : true;

         const updatedStudent = await studentModel.findByIdAndUpdate(id, { status: isActive }, { new: true });
        if (!updatedStudent) {
            return res.status(404).send({ message: "Student Not Found" });
        }
        const statusMessage = isActive ? "Student Enabled Successfully" : "Student Disabled Successfully";
        res.status(200).send({ status: "success", data: updatedStudent, message: statusMessage });
    } catch (error) {
        res.status(400).send({ message: "Server Internal Error" });
    }
};

// GET - Fetch all students
const getAllStudents = async (req, res) => {
    console.log(req.query);
    let { search, dojodata } = req.query;

    try {
        // Create base query object
        const query = { dojo: dojodata };

        // Add search criteria if provided
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } }, // Adjust the field to your search field
            ];
        }

        // Fetch results based on the query
        const students = await studentModel.find(query).exec();

        return res.status(200).json({ status: "success", data: students });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


  

export {
    postStudent,
    updateStudent,
    deleteStudent,
    toggleStudentActiveStatus,
    getAllStudents
};
