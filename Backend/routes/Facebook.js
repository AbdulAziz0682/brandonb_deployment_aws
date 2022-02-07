const express = require('express')
const router = express.Router()

const Fb_Controller = require ('../app/controller/FB_Controller')

router.post('/Fb_Post', Fb_Controller.addData)
router.get('/Fb_Getdata', Fb_Controller.getData)
router.get('/Fb_Getalldata', Fb_Controller.getupdateddata)
router.put('/Fb_update/:_id',Fb_Controller.Fb_Updatedata)
router.delete('/Fb_delete/:_id',Fb_Controller.Fb_Deletedata)



module.exports = router