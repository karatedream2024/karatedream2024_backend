import mongoose from 'mongoose';

const attendanceRecordSchema = new mongoose.Schema({

        status: {
            type: String,
            enum: ["present", "absent", "late"],
        },
        date: {
            type: Date
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
});

const studentAttendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    attendance: [attendanceRecordSchema]
})



const attendanceModel = mongoose.model('attendence', studentAttendanceSchema);

export default attendanceModel;
