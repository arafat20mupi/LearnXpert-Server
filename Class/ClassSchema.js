const mongoose = require("mongoose");

const OnlineClassSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        chapter: {
            type: String,
            required: true
        },
        part: [
            {
                videoUrl: {
                    type: String,
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
            }
        ],
        isFree: {
            type: Boolean,
            default: false
        },
        className: {
            type: String,
            required: true
        },
       
    },
    { timestamps: true }
);

module.exports = mongoose.model("OnlineClass", OnlineClassSchema);
