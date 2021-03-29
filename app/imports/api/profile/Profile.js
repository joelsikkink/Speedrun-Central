import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class ProfilesCollection {
    constructor() {
        this.name = 'ProfilesCollection';
        this.collection = new Mongo.Collection(this.name);
        this.schema = new SimpleSchema({
            username: String,
            image: String,
            owner: String,
          }, { tracker: Tracker });
        this.collection.attachSchema(this.schema);
        this.userPublicationName = `${this.name}.publication.user`;
        this.adminPublicationName = `${this.name}.publication.admin`;
    }
}

/** Make the collection and schema available to other code. */
export const Profiles = new ProfilesCollection();