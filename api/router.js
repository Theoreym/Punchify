const express = require('express');
const router = express.Router();

const homeController = require("./controllers/homeController");
const eventtypeController = require('./controllers/eventtypeController');
const categoryController = require('./controllers/categoryController');
const teamController = require('./controllers/teamController');
const profilController = require('./controllers/profilController');
const adherentController = require('./controllers/adherentController');
const loginController = require('./controllers/loginController');
const coachController = require('./controllers/coachController');





//*****     routes HomePage     *****//
router.route('/')
    .get(homeController.get);
//***********************************//



//*****     routes login     *****//
router.route('/login')
    .get(loginController.get);
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


//*****     routes adherent     *****//
router.route('/adherent/inscription')
    .get(adherentController.getInscription);

router.route('/adherent/createbyuser')
    .post(adherentController.postCreateByUser);

router.route('/adherent/create')
    .post(adherentController.postCreate);

router.route('/adherent/manage')
    .get(adherentController.getList);

router.route('/adherent/read/')  
    .get(adherentController.getRead);

router.route('/adherent/read/:id_adherent')  
    .get(adherentController.getRead);

router.route('/adherent/confirmAdhesion/:id_adherent')  
    .post(adherentController.postConfirmAdhesion);

router.route('/adherent/update/:id_adherent')  
    .post(adherentController.postUpdate);

router.route('/adherent/delete/:id_adherent')  
    .post(adherentController.postDelete);

router.route('/adherent/groups')
    .get(adherentController.getGroups);

router.route('/adherent/groupsList')
    .post(adherentController.getGroupsList);

router.route('/adherent/addToGroups/:id_categorySelected/:id_teamSelected')
    .post(adherentController.postAddToGroups);

router.route('/adherent/addToGroups/:id_categorySelected')
    .post(adherentController.postAddToGroups);

router.route('/adherent/addToGroups/:id_teamSelected')
    .post(adherentController.postAddToGroups);
//************************************//


//*****     routes coach dashboard     *****//


router.route('/coach/meeting')
    .get(coachController.addMeeting)
    // .post(coachController.addMeetingPost)
router.route('/coach/injury-notifications')
    .get(coachController.injuryNotification);
router.route('/coach/availability-notifications')
    .get(coachController.meetingNotification);
router.route('/coach/modify-team')
    .get(coachController.modifyTeam)
    .post(coachController.modifyTeamPatch)
router.route('/injury-notification')
    .post(coachController.injuryNotificationPost);

//************************************//


module.exports = router
