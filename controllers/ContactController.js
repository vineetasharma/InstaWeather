"use strict";

//Import Enums
var EventName = require("../src/enum/EventName");
var HttpStatusCode = require("../src/enum/HttpStatusCode");

exports.sendMail = function (req,res) {
    ContactService.sendMailService(req.body)
        .on(EventName.ERROR, function (err) {
            log.error(err);
            res.sendErrorAPIResponse(err.message, HttpStatusCode.SERVER_ERROR);
        })
        .on(EventName.DONE, function (data) {
            log.info(data,'in contact controller');
            res.sendSuccessAPIResponse(data, HttpStatusCode.SUCCESS_READ_OPERATION_PERFORMED);
        });
};
