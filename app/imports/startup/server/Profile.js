import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profile.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: (${data.owner})`);
  Profiles.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(data => addData(data));
  }
}