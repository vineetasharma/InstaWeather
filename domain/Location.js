/**
 *
 * Model Location
 * This model defines the schema of the Location Domain.
 *
 * This collection is intended to store Locations which are searched and use to fetch most search Locations.
 * */

/*
 * Define the Schema of the collection (MongooseJS schema definition)
 * */
exports.schema = {
    geoNameId:Number,
    locationName:{type:String},
    latitude:Number,
    longitude:Number,
    searchCount:Number
};
