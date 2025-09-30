// controllers/meetingController.js
import mongoose from "mongoose";
import Meeting from "../model/testModel.js";
import dayjs from "dayjs";
import moment from "moment-timezone";

// Recurrence Date Generator (for daily as example)
const generateRecurringDates = (startTime, endTime, type) => {
    const occurrences = [];
    const start = dayjs(startTime);
    const end = dayjs(endTime);
    const duration = end.diff(start, "minute");
    const now = dayjs();
    const endDate = now.add(1, "month"); // Generate for 1 month ahead

    let current = start.startOf("day");

    while (current.isBefore(endDate)) {
        let meetingStart = current.hour(start.hour()).minute(start.minute());
        let meetingEnd = meetingStart.add(duration, "minute");

        occurrences.push({
            startTime: meetingStart.toDate(),
            endTime: meetingEnd.toDate()
        });

        if (type === "daily") current = current.add(1, "day");
        else if (type === "weekly") current = current.add(1, "week");
        else if (type === "monthly") current = current.add(1, "month");
        else break; // Only handle limited recurrence types here
    }

    return occurrences;
};

export const createMeetingTest = async (req, res) => {
    try {
        let { title, startTime, endTime, mode, recurrence } = req.body;

        const startIST = moment.tz(startTime, "YYYY-MM-DD hh:mm A", "Asia/Kolkata");
        const endIST = moment.tz(endTime, "YYYY-MM-DD hh:mm A", "Asia/Kolkata");

        const startUTC = startIST.toISOString();
        const endUTC = endIST.toISOString();

        // Save one-time or generate recurring meetings
        if (mode === "advance" && recurrence?.type) {
            const generatedDates = generateRecurringDates(startUTC, endUTC, recurrence.type);

            const meetingsToInsert = generatedDates.map((date) => ({
                title,
                mode,
                startTime: date.startTime,
                endTime: date.endTime,
                recurrence,
                status: getMeetingStatus(date.startTime, date.endTime)
            }));

            await Meeting.insertMany(meetingsToInsert);
            return res.status(201).json({ success: true, message: "Recurring meetings created", count: meetingsToInsert.length });
        }

        const singleMeeting = new Meeting({
            title,
            mode,
            startTime: startUTC,
            endTime: endUTC,
            status: getMeetingStatus(startUTC, endUTC),
            recurrence: mode === "advance" ? recurrence : undefined,
        });

        await singleMeeting.save();
        res.status(201).json({ success: true, meeting: singleMeeting });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getMeetingStatus = (start, end) => {
    const now = dayjs();
    const s = dayjs(start);
    const e = dayjs(end);

    if (now.isBefore(s)) return "upcoming";
    if (now.isAfter(e)) return "completed";
    return "ongoing";
};


export const getMeetings = async (req, res) => {
    const { page = 1, limit = 10, status = "upcoming" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const now = new Date();

    // Define status filter in MongoDB terms
    let matchCondition = {};
    if (status === 'upcoming') {
        matchCondition = { startTime: { $gt: now } };
    } else if (status === 'completed') {
        matchCondition = { endTime: { $lt: now } };
    } else if (status === 'ongoing') {
        matchCondition = { startTime: { $lte: now }, endTime: { $gte: now } };
    }

    try {
        const meetings = await Meeting.aggregate([
            { $match: matchCondition },
            {
                $addFields: {
                    status: {
                        $switch: {
                            branches: [
                                {
                                    case: { $lt: ["$endTime", now] },
                                    then: "completed"
                                },
                                {
                                    case: {
                                        $and: [
                                            { $lte: ["$startTime", now] },
                                            { $gte: ["$endTime", now] }
                                        ]
                                    },
                                    then: "ongoing"
                                },
                                {
                                    case: { $gt: ["$startTime", now] },
                                    then: "upcoming"
                                }
                            ],
                            default: "unknown"
                        }
                    }
                }
            },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]);

        const totalCount = await Meeting.countDocuments(matchCondition);

        res.status(200).json({
            success: true,
            meetings,
            total: totalCount,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export const deleteAllMeetings = async (req, res) => {
    try {
        await Meeting.deleteMany({});
        res.status(200).json({ success: true, message: "All meetings deleted successfully." });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
