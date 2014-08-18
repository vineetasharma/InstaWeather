var EventName = require("../src/enum/EventName");
exports.sendMailService = function (mailData) {
    var emitter = this;
    console.log(mailData, 'maildata');
    var transport = _nodemailer.createTransport( {
        service: "Gmail",
        auth: {
            user: "contactinstaweather@gmail.com",
            pass: "igdefault"
        }
    });
    var options = {
        from: mailData.email,
        to: 'contactinstaweather@gmail.com',
        subject: 'message from '+mailData.name,
        html: 'Hi,\n'+mailData.message+' \n From: \n name:'+mailData.name+'\n email:'+mailData.email
    };
    transport.sendMail(options, function (err,res) {
        log.info('in contact service  ');
        if (err) {
            log.info('in contact service  err ',err.message);
            emitter.emit(EventName.ERROR, err);
        }
        else {
            log.info('in contact service  success',res);
            emitter.emit(EventName.DONE,res);
        }

    });
}.toEmitter();