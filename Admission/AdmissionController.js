const AdmissionSchema = require("./AdmissionSchema");



exports.submitAdmissionData = async(req, res) => {
    try {
        const {studentName, dob, gender, className, prevSchool, guardianName, guardianContact, guardianEmail, address} = req.body;
        const admissionData = new AdmissionSchema({
            studentName, dob, gender, className, prevSchool, guardianName, guardianContact, guardianEmail, address
        });

        await admissionData.save();
        res.status(200).json({success: true, message: "Admission form submitted successfully", admissionData})
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error.message);
    }
}


exports.getAdmissionData = async(req, res) => {
    try {
        const admission = await AdmissionSchema.find();
        res.status(200).json({message: "admission data found", admission})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.admissionApprove = async(req, res) => {
    try {
        const {id} = req.params;
        const updateStatus = await AdmissionSchema.findOneAndUpdate({_id:id}, {$set:{status: "Approved"}}, {new: true});
        res.status(200).json({message: "status updated" , update:[updateStatus]});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.admissionReject = async(req, res) => {
    try {
        const {id} = req.params;
        const updateStatus = await AdmissionSchema.findOneAndUpdate({_id:id}, {$set:{status: "Rejected"}}, {new: true});
        res.status(200).json({message: "status updated" , update:[updateStatus]});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.deleteAdmissionData = async(req, res) => {
    try {
        const {id} = req.params
        await AdmissionSchema.findOneAndDelete({_id: id});
        res.status(200).json({message: "deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error});
        console.log(error.message);
    }
}