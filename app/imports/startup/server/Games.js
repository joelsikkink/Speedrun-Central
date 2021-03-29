import { Meteor } from 'meteor/meteor';
import { GamesInfo } from '../../api/gameinfo/gameinfo.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} `);
  GamesInfo.insert(data);
}

/** Initialize the collection if empty. */
if (GamesInfo.find().count() === 0) {
  if (Meteor.settings.defaultGameCards) {
    console.log('Creating default data.');
    Meteor.settings.defaultGameCards.map(data => addData(data));
  }
}

Meteor.publish('GamesInfo', function publish() {
  if (this.userId) {

    return GamesInfo.find({});
  }
  return this.ready();
});