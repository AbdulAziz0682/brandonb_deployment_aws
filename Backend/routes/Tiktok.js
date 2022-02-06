const express = require('express')
const router = express.Router()

const TT_Controller = require('../app/controller/TT_Controller')

router.post('/TT_Post',TT_Controller.addData)
router.get('/TT_Get',TT_Controller.getData)
router.get('/TT_Getalldata', TT_Controller.getupdateddata)
router.put('/TT_Updatedata/:_id',TT_Controller.updatedata)
router.delete('/TT_Deletedata/:_id', TT_Controller.Deletedata)



module.exports = router