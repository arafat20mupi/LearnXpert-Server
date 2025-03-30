const mongoose = require("mongoose");

const classScheduleSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    classSchedule: [
        {
            day: {
                type: String,
                required: true
            },
            schedules: [{time: String, subject: String}],
        }
    ],
}, {timestamps: true});

const ClassScheduleModel = mongoose.model("classschedule", classScheduleSchema);
module.exports = ClassScheduleModel; 