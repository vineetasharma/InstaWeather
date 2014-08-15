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
        from: 'contactinstaweather@gmail.com',
        to: 'contactinstaweather@gmail.com',
        subject: mailData.subject,
        html: mailData.message
    };
    transport.sendMail(options, function (err,res) {
        log.info('in contact service  ');
        if (err) {
            log.info('in contact service  err ',err.message);
            emitter.emit("error", err);
        }
        else {
            log.info('in contact service  success',res);
            emitter.emit('success');
        }

    });
}.toEmitter();