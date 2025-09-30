// models/Meeting.js
import mongoose from "mongoose";

const recurrenceSchema = new mongoose.Schema({
  type: { type: String, enum: ["daily", "weekly", "monthly", "annually", "weekdays"] },
  dayOfWeek: [Number],  // For weekly: [1] for Monday
  dayOfMonth: Number,   // For monthly or annually
  weekNumber: Number,   // For monthly
  month: Number         // For annually
});

const meetingSchema = new mongoose.Schema({
  title: String,
  mode: { type: String, enum: ["basic", "advance"] },
  startTime: Date,
  endTime: Date,
  recurrence: recurrenceSchema,
  status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" }
});

export default mongoose.model("Meeting", meetingSchema);
