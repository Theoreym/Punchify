const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const homeController = require("./controllers/homeController");
const eventtypeController = require('./controllers/eventtypeController');
const categoryController = require('./controllers/categoryController');
const teamController = require('./controllers/teamController');
const profilController = require('./controllers/profilController');
const adherentController = require('./controllers/adherentController');
const coachController = require('./controllers/coachController');
const userController = require('./controllers/userController');



//*****     routes HomePage     *****//
router.route('/')
    .get(homeController.get);
//***********************************//

router.route('/register')
    .get(userController.get)
    .post(userController.post);


//*****     routes login     *****//
router.route('/login')
    .get(userController.getLogin)
    .post(userController.postLogin);


router.route('/logout')
    .get(userController.logout)
//*****     routes login     *****//
//***********************************//



//*****     routes eventType     *****//
router.route('/eventType/manage')
    .get(eventtypeController.getList);

router.route('/eventType/create')
    .post(
        body('event_type_wording')
            .exists()
            .isLength({ min: 2, max: 100 }).withMessage('Le champ doit contenir plus de 2 caractères ou moins de 100')
            .notEmpty().withMessage('Ce champ ne doit pas être vide'),
        eventtypeController.postCreate);

router.route('/eventType/update/:id_event_type')
    .post(eventtypeController.postUpdate);

router.route('/eventType/delete/:id_event_type')
    .post(eventtypeController.postDelete);
//************************************//



//*****     routes category     *****//   
router.route('/category/manage')
    .get(categoryController.getList);

router.route('/category/create')
    .post(
        body('category_wording')
            .exists()
            .isLength({ min: 2, max: 100 }).withMessage('Le champ doit contenir plus de 2 caractères ou moins de 100')
            .notEmpty().withMessage('Ce champ ne doit pas être vide'),
        body('age_min')
            .exists()
            .notEmpty().withMessage('Ce champ ne doit pas être vide')
            .isNumeric().withMessage('Format incorrect'),
        body('age_max')
            .exists()
            .notEmpty().withMessage('Ce champ ne doit pas être vide')
            .isNumeric().withMessage('Format incorrect'),
        categoryController.postCreate);

router.route('/category/update/:id_category')
    .post(categoryController.postUpdate);

router.route('/category/delete/:id_category')
    .post(categoryController.postDelete);
//***********************************//  



//*****     routes team     *****//   
router.route('/team/manage')
    .get(teamController.getList);

router.route('/team/create')
    .post(
        body('team_wording')
            .exists()
            .isLength({ min: 2, max: 100 }).withMessage('Le champ doit contenir plus de 2 caractères ou moins de 100')
            .notEmpty().withMessage('Ce champ ne doit pas être vide'),
        body('weight_min')
            .exists()
            .notEmpty().withMessage('Ce champ ne doit pas être vide')
            .isNumeric().withMessage('Format incorrect'),
        body('weight_max')
            .exists()
            .notEmpty().withMessage('Ce champ ne doit pas être vide')
            .isNumeric().withMessage('Format incorrect'),
        teamController.postCreate);

router.route('/team/update/:id_team')
    .post(teamController.postUpdate);

router.route('/team/delete/:id_team')
    .post(teamController.postDelete);
//***********************************//  



//*****     routes profil     *****//
router.route('/profil/manage')
    .get(profilController.getList);

router.route('/profil/create')
    .post(
        body('profil_code')
            .exists()
            .isLength({ min: 2, max: 3 }).withMessage('Le champ doit contenir entre 2 et 3 caractères')
            .notEmpty().withMessage('Ce champ ne doit pas être vide'),
        body('profil_wording')
            .exists()
            .isLength({ min: 2, max: 100 }).withMessage('Le champ doit contenir plus de 2 caractères ou moins de 255')
            .notEmpty().withMessage('Ce champ ne doit pas être vide'),
        body('profil_isAdmin')
            .exists()
            .isBoolean()
            .notEmpty().withMessage('Ce champ ne doit pas être vide'),
        profilController.postCreate);

router.route('/profil/update/:id_profil')
    .post(profilController.postUpdate);

router.route('/profil/delete/:id_profil')
    .post(profilController.postDelete);
//************************************//


//*****     routes adherent     *****//
router.route('/adherent/inscription')
    .get(adherentController.getInscription);

router.route('/adherent/createbyuser')
    .post(
        body('lastname')
            .exists().withMessage('1')
            .notEmpty().withMessage('2 - Ce champ ne doit pas être vide')
            .isLength({ min: 2, max: 100 }).withMessage('3 - Le champ doit contenir plus de 2 caractères ou moins de 100')
            .trim().escape(),
        body('firstname')
            .exists().withMessage('4 - Ce champ ne doit pas être vide')
            .notEmpty().withMessage('5 - Ce champ ne doit pas être vide')
            .isLength({ min: 2, max: 100 }).withMessage('6 - Le champ doit contenir plus de 2 caractères ou moins de 100')
            .trim().escape(),
        body('radioGenre')
            .exists().withMessage('7'),
        body('birthdate')
            .exists().withMessage('8')
            .notEmpty().withMessage('9 - Veuillez renseigner une date de naissance')
            .isDate().withMessage('10 - Format incorrect'),
        body('size')
            .exists().withMessage('11')
            .notEmpty().withMessage('12 - Ce champ ne doit pas être vide')
            .isNumeric().withMessage('13 - Format incorrect'),
        body('weight')
            .exists().withMessage('14')
            .notEmpty().withMessage('15 - Ce champ ne doit pas être vide')
            .isNumeric().withMessage('16 - Format incorrect'),
        body('address_wording')
            .exists().withMessage('17')
            .notEmpty().withMessage('18 - Ce champ ne doit pas être vide')
            .isLength({ min: 2, max: 255 }).withMessage('19 - Le champ doit contenir plus de 2 caractères ou moins de 255'),
        body('postal_code')
            .exists().withMessage('20')
            .notEmpty().withMessage('21 - Ce champ ne doit pas être vide')
            .isLength({ min: 5, max: 5 }).withMessage('22 - Le champ doit contenir 5 caractères')
            .isNumeric().withMessage('23 - Format incorrect'),
        body('city')
            .exists().withMessage('24')
            .notEmpty().withMessage('25 - Ce champ ne doit pas être vide')
            .isLength({ min: 2, max: 100 }).withMessage('26 - Le champ doit contenir plus de 2 caractères ou moins de 100'),
        adherentController.postCreateByUser);

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
//************************************//


//*****     routes coach dashboard     *****//
router.route('/coach/meeting')
    .get(coachController.addMeeting)
    .post(coachController.addMeetingPost)
router.route('/coach/injury-notifications')
    .get(coachController.injuryNotification);
router.route('/coach/availability-notifications')
    .get(coachController.meetingNotification);
router.route('/coach/modify-team')
    .get(coachController.modifyTeam)
    .post(coachController.modifyTeamPost)
router.route('/injury-notification')
    .post(coachController.injuryNotificationPost);
//************************************//

//*****     routes Absences     *****//
router.route('/absence')
    .get(adherentController.getBlessure)
    .post(adherentController.postBlessure)
//************************************//

//*****     routes Profil Boxer     *****//
router.route('/profil/boxer')
    .get(adherentController.getProfilBoxer)

router.route('/profil/boxer/:id_adherent')
    .post(adherentController.postProfilUpdate)


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

// router.route('/profil/boxer/id')
//     .get(adherentController.getProfilUpdate)
//     .post(adherentController.postProfilUpdate)
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
router.route('/coach-events')
    .get(coachController.SendEvents)
    .post(coachController.SendEventsPost)

//************************************//


module.exports = router
