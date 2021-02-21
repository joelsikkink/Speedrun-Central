import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const GamesInfo = new Mongo.Collection('GamesInfo');

/** Create a schema to constrain the structure of documents associated with this collection. */
const GameSchema = new SimpleSchema({
  name: String,
  description: String,
  image: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
GamesInfo.attachSchema(GameSchema);

/** Make the collection and schema available to other code. */
export { GamesInfo, GameSchema };