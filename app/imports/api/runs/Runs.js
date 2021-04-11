import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Runs = new Mongo.Collection('Runs');

/** Create a schema to constrain the structure of documents associated with this collection. */
const RunSchema = new SimpleSchema({
  game: {
        type: String,
        allowedValues: ['Minecraft', 'Super Mario 64', 'Roblox: Speed Run 4'],
        defaultValue: 'Super Mario 64',
      },
      time: String,
      owner: String,
	  videoLink: String,
	  approved: {type: Boolean},
    }, { tracker: Tracker });

/** Attach this schema to the collection. */
Runs.attachSchema(RunSchema);
Runs.userPublicationName = `${this.name}.publication.user`;
Runs.adminPublicationName = `${this.name}.publication.admin`;
/** Make the collection and schema available to other code. */
export { Runs, RunSchema };




