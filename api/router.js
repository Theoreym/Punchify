const express = require('express')
const router = express.Router()

const homeController = require("./controllers/homeController");
const eventtypeController = require('./controllers/eventtypeController');
const categoryController = require('./controllers/categoryController');



//*****     routes HomePage     *****//
router.route('/')
    .get(homeController.get)
//***********************************//



//*****     routes eventType     *****//
router.route('/eventType/manage')
    .get(eventtypeController.getList);

router.route('/eventType/create')
    .post(eventtypeController.postCreate);

router.route('/eventType/update/:id_event_type')  
    .post(eventtypeController.postUpdate);

router.route('/eventType/delete/:id_event_type')  
    .post(eventtypeController.postDelete);
//************************************//



//*****     routes category     *****//   
router.route('/category/manage')
    .get(categoryController.getList);

router.route('/category/create')
    .post(categoryController.postCreate);

router.route('/category/update/:id_category')  
    .post(categoryController.postUpdate);

router.route('/category/delete/:id_category')  
    .post(categoryController.postDelete);
//***********************************//  



module.exports = router
