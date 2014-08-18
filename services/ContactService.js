var EventName = require("../src/enum/EventName");
var fs=require('fs');
exports.sendMailService = function (mailData) {
    var emitter = this;
    var file=fs.readFileSync('/home/intelligrape/Desktop/InstaWeather/web-app/dev/views/mailMessage.ejs',"utf8");
    var html=_ejs.render(file,mailData);
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
        html:html
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