
const ClassScheduleModel = require("./ClassScheduleModel");


const postClassSchedule = async(req, res) => {
    try {
        const {className, year, day, schedules} = req.body;
    
        const exist = await ClassScheduleModel.findOne({className, year});
        
        if(exist){
            const dayExist = await ClassScheduleModel.findOne({"classSchedule.day": day});
            if(dayExist){
                return res.status(400).json({error: true, message: "already exist"})
            }
            const addClassSchedule = await ClassScheduleModel.updateOne({$push: {classSchedule: {day: day, schedules: schedules}}});
            return res.status(200).json({success: true, message: `Class schedule for class ${className} updated`})
        }else{
            const addSchedule = new ClassScheduleModel(data)
            const saveSchedule = await addSchedule.save();
    
            return res.status(200).json({success: true, message: `Class schedule for class ${className} added successfully` , saveSchedule})
        }
       
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
};

const getSingleClassSchedule = async(req, res) => {
    try {
        const {className, year} = req.query;
        const getSchedule = await ClassScheduleModel.findOne({className, year});
        if(!getSchedule){
            return res.status(400).json({error: true});
        }
        
        return res.status(200).json({success: true, getSchedule});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: true, message: error.message });
    }
};


const deleteClassSchedule = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteAllSchedule = await ClassScheduleModel.deleteOne({_id: id}, {new: true});
        res.status(200).json({success: true, message: "Class schedule deleted successfully", deleteAllSchedule});
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
}

const deleteClassDaySchedule = async(req, res) => {
    try {
        const {day} = req.params;
        console.log(day);
        const deleteDayClassSchedule = await ClassScheduleModel.updateOne({"classSchedule.day": day}, {$pull: {classSchedule: {day: day}}});
        if (deleteDayClassSchedule.modifiedCount > 0) {
            res.status(200).json({ message: "Class day schedule deleted successfully." });
        } else {
            res.status(404).json({ message: "Day not found in class schedule." });
        }
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
}


module.exports = {postClassSchedule, getSingleClassSchedule, deleteClassSchedule, deleteClassDaySchedule}