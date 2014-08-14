"use strict";

//Import Enums
var EventName = require("../src/enum/EventName");
var HttpStatusCode = require("../src/enum/HttpStatusCode");

exports.sendMail = function (req,res) {
    ContactService.sendMailService(req.body)
        .on("success", function () {
            log.info('mail sent');

        })
        .on("error", function (err) {
            log.info('error while sending mail',err);

//            done(err);
        });
};
