const express = require('express')
const router = express.Router()

const In_Controller = require('../app/controller/In_Controller')

router.post('/In_Post',In_Controller.addData)
router.get('/In_Get',In_Controller.getData)
router.get('/In_Getalldata', In_Controller.getupdateddata)
router.put('/In_update/:_id',In_Controller.updatedata)
router.delete('/In_delete/:_id',In_Controller.Deletedata)


module.exports = router