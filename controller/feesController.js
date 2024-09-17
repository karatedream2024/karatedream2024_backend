import feesModel from "../model/feesModel.js";



const createfees = async (req, res) => {
    console.log(req.body, 'fees data');
    try {
        const { amount, date, payment_type, studentId } = req.body;

     const   userId = "66e29193fd7f524fb187a01c"

        if (!amount || !date || !payment_type || !studentId || !userId) {
            return res.status(400).json({ status: "error", message: "Missing required fields" });
        }

        const feesData = await feesModel.findOne({ studentId });

        if (feesData) {
            const feeExists = feesData.fees.some(fee => fee._id.toString() === req.body.feeId);

            if (feeExists) {
                const updatedFeesData = await feesModel.findOneAndUpdate(
                    { studentId, "fees._id": req.body.feeId },
                    { $set: { "fees.$.amount": amount, "fees.$.date": date, "fees.$.payment_type": payment_type, "fees.$.userId": userId } },
                    { new: true }
                );
                return res.status(200).json({ status: "success", data: updatedFeesData, message: "Fees Updated Successfully" });
            } else {
                feesData.fees.push({ amount, date, payment_type, userId });
                const updatedFeesData = await feesData.save();
                return res.status(200).json({ status: "success", data: updatedFeesData, message: "Fee Added Successfully" });
            }
        } else {
            const newFees = new feesModel({
                studentId,
                fees: [{ amount, date, payment_type, userId }]
            });
            const result = await newFees.save();
            return res.status(201).json({ status: "success", data: result, message: "Fees Created Successfully" });
        }
    } catch (error) {
        console.error("Error creating/updating fees:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

const getfees = async (req, res) => {
    console.log(req.body, 'lake pf fsaldjdals')   
    try {
        const atten = await feesModel.find({ studentId: req.body.studentId })
            .populate({
                path: 'studentId',
                select: [`name`, `grade`, 'dob', 'fatherName']
            }).populate({
                path: 'fees.userId', 
                select: 'name' 
            });

            const attendances = atten.reverse();

        res.status(200).json({
            status: "success",
            data: attendances,
            message: "Student attendance retrieved successfully"
        });
    } catch (error) {
        console.error("Error retrieving student attendance:", error); // Log the error for debugging
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};


const deleteFee = async (req, res) => {
    console.log(req.body, 'delete fee data');
    console.log(req.params, 'delete fee data');
    try {
        const { id, studentId} = req.params;
        const feeId = id;

        if (!studentId || !feeId) {
            return res.status(400).json({ status: "error", message: "Missing required fields" });
        }

        // Find the student's fee record
        const feesData = await feesModel.findOne({ studentId });

        if (!feesData) {
            return res.status(404).json({ status: "error", message: "Student not found" });
        }

        // Find and remove the specific fee from the student's fee record
        const updatedFeesData = await feesModel.findOneAndUpdate(
            { studentId },
            { $pull: { fees: { _id: feeId } } }, // Remove the fee with the given feeId
            { new: true }
        );

        if (!updatedFeesData) {
            return res.status(404).json({ status: "error", message: "Fee not found" });
        }

        res.status(200).json({ status: "success", data: updatedFeesData, message: "Fee Deleted Successfully" });
    } catch (error) {
        console.error("Error deleting fee:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};


export { createfees, getfees, deleteFee }