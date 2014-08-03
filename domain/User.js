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
    username:string,
    email:string,
    accessToken:string,
    lastSearched : { },
    accounts: [ ],
    profilePicUrl:string
};
