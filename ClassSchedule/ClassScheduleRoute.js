const { postClassSchedule, deleteClassSchedule, deleteClassDaySchedule, getSingleClassSchedule } = require('./ClassScheduleController');

const router = require('express').Router();

router.post('/post-class-schedule', postClassSchedule);
router.get('/get-single-class-schedule', getSingleClassSchedule);
router.delete('/delete-class-schedule/:id', deleteClassSchedule);
router.delete('/delete-class-day-schedule/:day', deleteClassDaySchedule);




module.exports = router; 