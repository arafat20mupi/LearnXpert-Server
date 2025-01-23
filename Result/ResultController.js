const ResultSchema = require("./ResultSchema")

exports.postResult = async(req, res) => {
        try {
            const {studentId, name, className, rollNo, marks} = req.body;

            const resultExist = await ResultSchema.findOne({$and: [{className: className}, {rollNo: rollNo}]});

            if(resultExist){
                return res.status(401).json({message: "Result already exists!"});
            }

            const result = new ResultSchema({
                studentId, name, className, rollNo, marks
            });

            if(!result){
                return res.status(401).json({error: true, message: "Result cannot be saved"});
            }

            await result.save();

            res.status(200).json({success: true, message: "Result saved successfully"});
        } catch (error) {
            res.status(500).json({error: true, message: error})
            console.log(error);
        }
}

exports.getSingleResult = async(req, res) => {
    try {
        
        const {className, rollNo} = req.body;

        const result = await ResultSchema.findOne({$and : [{className: className}, {rollNo: rollNo}]});
        
        if(!result){
            return res.status(400).json("Result not found")
        }
        
        res.status(200).json({success: true, message: "result found", result});
    } catch (error) {
        res.status(500).json({error: true, message: error})
        console.log(error);
    }
}

exports.getClassResult = async(req, res) => {
    try {
        
        const {className} = req.body;
        const result = await ResultSchema.find({className: className})
        
        res.status(200).json({success: true, message: "result found", result});
    } catch (error) {
        res.status(500).json({error: true, message: error})
        console.log(error);
    }
}
