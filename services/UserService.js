var EventName = require("../src/enum/EventName");
var fs = require('fs');


exports.findOrCreateTwitterAccountService = function (profile) {
    var emitter = this;
    User.findOne({twitterId: profile.id}, function (err, data) {
        if (err) {
            emitter.emit("error", err);
        } else if (!data) {
            new User({
                username: profile.displayName,
                twitterId: profile.id,
                profilePicUrl: profile.photos[0].value,
                About: "",
                profileData: {
                    Birthday: "",
                    Gender: "",
                    Mobile: "",
                    CurrentCity: ""
                },
                Address: {
                    Hometown: "",
                    City: "",
                    State: "",
                    Country: "",
                    pin: ""
                }
            }).save(function (err, user) {
                    if (err) {
                        log.error(err);
                        emitter.emit('error', err);
                    }
                    else {
                        emitter.emit('success', user);
                    }
                });
        }
        if (data) {
            emitter.emit('success', data);
        }
    })
}.toEmitter();

exports.findOrCreateFacebookAccountService = function (accessToken, profile) {
    var emitter = this;
    User.findOne({email: profile.emails[0].value}, function (err, data) {
        if (err) {
            emitter.emit("error", err);
        }
        else if (!data) {
            new User({
                username: profile.displayName,
                email: profile.emails[0].value,
                fbId: profile.id,
                accessToken: accessToken,
                profilePicUrl: 'https://graph.facebook.com/' + profile.id + '/picture?type=large',
                About: "",
                profileData: {
                    Birthday: "",
                    Gender:profile.gender,
                    Mobile: "",
                    CurrentCity: ""
                },
                Address: {
                    Hometown: "",
                    City: "",
                    State: "",
                    Country: "",
                    pin: ""
                }
            }).save(function (err, user) {
                    if (err) {
                        log.error(err);
                        emitter.emit("error", err);
                    }
                    else {
                        log.info('user is created');
                        emitter.emit("success", user)
                    }
                });
        }
        else if (data) {
            emitter.emit('success', data);
        }
    })
}.toEmitter();


exports.addLastSearchedLocation = function (userId, lastSearchedLocation) {
    var emitter = this;
    var location = {
        geoNameId: lastSearchedLocation.geoNameId,
        locationName: lastSearchedLocation.locationName,
        fullName: lastSearchedLocation.fullName,
        latitude: lastSearchedLocation.latitude,
        longitude: lastSearchedLocation.longitude
    };
    User.update({_id: userId}, {$set: {lastSearchedLocation: location}}, function (err, data) {
        if (err) {
            log.info("Error in update lastSearchedLocation");
            emitter.emit("error", err);
        }
        else {
            emitter.emit('success', data);
        }
    })
}.toEmitter();

exports.getProfileData = function (userId) {
    var emitter = this;
    User.findOne({_id: userId}, {username: 1, email: 1, profileData: 1, Address: 1, About: 1, profilePicUrl: 1, lastSearchedLocation:1}, function (err, data) {
        if (err) {
            emitter.emit(EventName.ERROR, err);
        }
        else {
            emitter.emit(EventName.DONE, data);
        }
    })
}.toEmitter();

exports.updateProfileInfo = function (fields) {
    var emitter = this;
    User.update({email: fields.Email}, {$set: {
        'username': fields.Name,
        'About': fields.About,
        'profileData.Birthday': fields.Birthday,
        'profileData.Gender': fields.Gender,
        'profileData.Mobile': fields.Mobile,
        'profileData.CurrentCity': fields.CurrentCity,
        'Address.Hometown': fields.Hometown,
        'Address.City': fields.City,
        'Address.State': fields.State,
        'Address.Country': fields.Country,
        'Address.pin': fields.Pin
    }}, {upsert: true }, function (err, data) {
        if (err) {
            emitter.emit(EventName.ERROR, err);
        }
        else {
            emitter.emit(EventName.DONE, data);
        }
    });
}.toEmitter();

exports.uploadProfilePic = function (email, profilePicUrl) {
    var emitter = this;
    User.update({email: email}, {$set: {
        'profilePicUrl': profilePicUrl
    }}, {upsert: true }, function (err, data) {
        if (err) {
            emitter.emit(EventName.ERROR, err);
        }
        else {
            emitter.emit(EventName.DONE, data);
        }
    });
}.toEmitter();

exports.valiDateProfileInfo = function (req, res) {
    var emitter = this;
    var form = new _formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err)
            emitter.emit(EventName.ERROR, err);
        else
            emitter.emit(EventName.DONE, {fields: fields});
    });
}.toEmitter();

exports.valiDateUploadProfilePic = function (req, res) {
    var emitter = this;
    var form = new _formidable.IncomingForm();
    form.keepExtensions = true;     //keep file extension
    form.uploadDir = __appBaseDir + "/web-app/dev/images/upload";       //set upload directory

    form.parse(req, function (err, fields, files) {
        var fileType = files.uploadPic.type.split('/')[1].toLowerCase().trim();
        var curr_date = new Date();
        var dd = curr_date.getDate();
        var mm = curr_date.getMonth();
        var yy = curr_date.getFullYear();
        var m = curr_date.getMinutes();
        var h = curr_date.getHours();
        var fileName = '/' + m + h + dd + mm + yy + files.uploadPic.name;
        var uploadDirPath = form.uploadDir + fileName;
        if (files.uploadPic.size > 0) {
            if (fileType != 'jpeg' && fileType != 'jpg' && fileType != 'png' && fileType != 'gif') {
                fs.unlink(files.uploadPic.path);
                emitter.emit(EventName.ERROR, 'File type as  jpeg, gif or png Should be required');
            }
            else {
                fs.rename(files.uploadPic.path, uploadDirPath, function (err) {
                    if (err)
                        emitter.emit(EventName.ERROR, err);
                    else
                        emitter.emit(EventName.DONE, {email: fields.email,
                            profilePicUrl: "/images/upload/" + fileName
                        });
                });
            }
        }
        else {
            fs.unlink(files.uploadPic.path);
            emitter.emit(EventName.ERROR, "File not found");
        }
    });
}.toEmitter();

