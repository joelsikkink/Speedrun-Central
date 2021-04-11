import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Forums = new Mongo.Collection('Forums');

/** Create a schema to constrain the structure of documents associated with this collection. */
const ForumSchema = new SimpleSchema({
  game: {
        type: String,
        allowedValues: ['General Speedrunning','Minecraft', 'Super Mario 64', 'Roblox: Speed Run 4', 'Off-Topic'],
        defaultValue: 'Minecraft',
      },
      time: String,
	  comment: String,
      owner: String,
    }, { tracker: Tracker });

/** Attach this schema to the collection. */
Forums.attachSchema(ForumSchema);
Forums.userPublicationName = `${this.name}.publication.user`;
Forums.adminPublicationName = `${this.name}.publication.admin`;
/** Make the collection and schema available to other code. */
export { Forums, ForumSchema };




