const express = require('express')
const router = express.Router()

const YT_Controller = require('../app/controller/YT_Controller')

router.post('/YT_Post',YT_Controller.addData)
router.get('/YT_Get',YT_Controller.getData)
router.get('/YT_Getalldata', YT_Controller.getupdateddata)
router.put('/YT_update/:_id',YT_Controller.YT_updatedata)
router.delete('/YT_deletedata/:_id',YT_Controller.Deletedata)



module.exports = router