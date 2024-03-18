const express = require('express')
const router = express.Router()

const homeController = require("./controllers/homeController");
const eventtypeController = require('./controllers/eventtypeController');
const categoryController = require('./controllers/categoryController');
const teamController = require('./controllers/teamController');
const profilController = require('./controllers/profilController');
const adherentController = require('./controllers/adherentController');




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



//*****     routes team     *****//   
router.route('/team/manage')
    .get(teamController.getList);

router.route('/team/create')
    .post(teamController.postCreate);

router.route('/team/update/:id_team')
    .post(teamController.postUpdate);

router.route('/team/delete/:id_team')
    .post(teamController.postDelete);
//***********************************//  



//*****     routes profil     *****//
router.route('/profil/manage')
    .get(profilController.getList);

router.route('/profil/create')
    .post(profilController.postCreate);

router.route('/profil/update/:id_profil')
    .post(profilController.postUpdate);

router.route('/profil/delete/:id_profil')
    .post(profilController.postDelete);
//************************************//

//*****     routes Absences     *****//

router.route('/absence')
    .get(adherentController.get)
    .post(adherentController.post)
    

//************************************//

//*****     routes Profil Boxer     *****//

router.route('/profil/boxer')
    .get(profilController.getProfilBoxer)

//************************************//


module.exports = router