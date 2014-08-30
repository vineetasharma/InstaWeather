/**
 *
 * Model User
 * This model defines the schema of the User Domain.
 *
 * This collection is intended to store User Information .
 * */

/*
 * Define the Schema of the collection (MongooseJS schema definition)
 * */
exports.schema = {
    About:String,
    username:String,
    password:String,
    email:String,
    accessToken:String,
    fbId: String,
    twitterId: String,
    lastSearchedLocation : {},
    profilePicUrl:String,
    profileData:{
        Birthday:String,
        Gender:String,
        Mobile:{type:Number},
    },
    Address:{
        Hometown:String,
        City:String,
        State:String,
        Country:String,
        pin:Number
    }
};
