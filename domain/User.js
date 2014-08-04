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
    username:String,
    email:String,
    accessToken:String,
    fbId: String,
    twitterId: String,
    lastSearched : { },
    profilePicUrl:String
};
