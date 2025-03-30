const cloudinary = require('cloudinary').v2;
const OnlineClass = require('./ClassSchema');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploadVideo = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No video files uploaded" });
        }

        if (!req.body.titles || req.files.length !== req.body.titles.length) {
            return res.status(400).json({ message: "The number of titles must match the number of videos." });
        }

        const uploadToCloudinary = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: "video" },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(fileBuffer);
            });
        };

        const parts = await Promise.all(
            req.files.map(async (file, index) => {
                const result = await uploadToCloudinary(file.buffer);
                return {
                    videoUrl: result.secure_url,
                    title: req.body.titles[index],
                };
            })
        );

        const existingClass = await OnlineClass.findOne({ 
            chapter: req.body.chapter, 
            className: req.body.className 
        });

        if (existingClass) {
            existingClass.part.push(...parts);
            await existingClass.save();
            console.log("Videos added to existing chapter and class", existingClass);
            res.status(200).json({ message: "Videos added to existing chapter and class", onlineClass: existingClass });
        } else {
            const onlineClass = new OnlineClass({
                ...req.body,
                part: parts,
            });
            await onlineClass.save();
            console.log("New chapter and class created and videos uploaded", onlineClass);
            res.status(201).json({ message: "New chapter and class created and videos uploaded", onlineClass });
        }
    } catch (error) {
        console.error("Error uploading videos:", error);
        res.status(500).json({ message: "Video upload failed", error: error.message });
    }
};

exports.getAllClasses = async (req, res) => {
    try {
        const classes = await OnlineClass.find()
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch classes", error });
    }
};

exports.getClassByClassName = async (req, res) => {
    try {
        const { className } = req.params;
        //  all collections fetch in parallel className
        const onlineClass = await OnlineClass.find({ className });
        if (!onlineClass || onlineClass.length === 0) {
            return res.status(404).json({ message: "No onlineClass found for this class name" });
        }
        res.status(200).json(onlineClass);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch class", error: error.message });
    }
};

exports.deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const onlineClass = await OnlineClass.findByIdAndDelete(id);
        if (!onlineClass) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json({ message: "Class deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete class", error });
    }
};