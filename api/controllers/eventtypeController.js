const EventType = require("../models/eventTypeModel");

const { validationResult } = require('express-validator');

module.exports = {
    getList: async (req, res) => {
        const navEventTypeManage = true;
        const eventType = await EventType.findAll({ raw: true });
        //console.log(eventType);
        res.render('eventType_manage', {eventType, navEventTypeManage});
    },

    postCreate: async (req, res) => {
        
        const result = validationResult(req);
        
        if (!result.isEmpty()) {
            const navEventTypeManage = true;
            const eventType = await EventType.findAll({ raw: true });

            const event_type_wording = req.body.event_type_wording;
            res.render('eventType_manage', {eventType, navEventTypeManage, event_type_wording, 'errors': result.errors});
        } else {
            //console.log(req.body);
            await EventType.create({
            event_type_wording: req.body.event_type_wording.toLowerCase()
            }); 

            const navEventTypeManage = true;
            const eventType = await EventType.findAll({ raw: true });
            res.render('eventType_manage', {eventType, navEventTypeManage});   
            // res.redirect('back');
        }  
    },

    postUpdate: async  (req, res) => {
        await EventType.update({
            event_type_wording: req.body.event_type_wording_update.toLowerCase()
            },{where: {id_event_type: req.params.id_event_type}
        });
        const navEventTypeManage = true;
        const eventType = await EventType.findAll({ raw: true });
        res.render('eventType_manage', {eventType, navEventTypeManage});   
        //res.redirect('back');
    },

    postDelete: async  (req, res) => {
        await EventType.destroy({
            where:{id_event_type:req.params.id_event_type}
        });
        const navEventTypeManage = true;
        const eventType = await EventType.findAll({ raw: true });
        res.render('eventType_manage', {eventType, navEventTypeManage});  
        //res.redirect('back');
    }
};