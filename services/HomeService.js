

var EventName = require("../src/enum/EventName");
var fs=require('fs');

exports.sendMailService = function (mailData) {
  var emitter = this;
  var file=fs.readFileSync(_process.cwd()+'/web-app/dev/views/mailMessage.ejs',"utf8");
  var html=_ejs.render(file,mailData);
  var transport = _nodemailer.createTransport( {
    service: _config.mailService.service,
    auth: {
      user: _config.mailService.email,
      pass: _config.mailService.pass
    }
  });
  var options = {
    from:_config.mailService.email,
    to: _config.mailService.email,
    subject: 'Message from '+mailData.name,
    html:html
  };
  transport.sendMail(options, function (err,res) {

    if (err) {
      log.info('in Home service  err ',err.message);
      emitter.emit(EventName.ERROR, err);
    }
    else {
      emitter.emit(EventName.DONE,res);
    }

  });
}.toEmitter();
exports.getUserSessionDetails=function (req,res) {
  var emitter = this;
    if (req.user) {
        res.loginUser(req.user._id, req.user.username, ['user']);
    }
    var user = req.checkLoggedIn();
    if(user){
        User.findOne({_id: user._id}, function (err, data) {
            if (err) {
                emitter.emit(EventName.ERROR, err);
            }
            else if (data) {
                emitter.emit(EventName.DONE, data);

            }
        });

    }
    else{
        emitter.emit(EventName.NOT_FOUND, req.user);
    }

}.toEmitter();