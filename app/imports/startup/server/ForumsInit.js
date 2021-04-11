import { Meteor } from 'meteor/meteor';
import { Forums } from '../../api/forums/Forums.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Forums.insert(data);
}

/** Initialize the collection if empty. */
if (Forums.find().count() === 0) {
  if (Meteor.settings.defaultForums) {
    console.log('Creating default data.');
    Meteor.settings.defaultForums.map(data => addData(data));
  }
}

Meteor.publish('Forums', function publish() {
  if (this.userId) {

    return Forums.find({});
  }
  return this.ready();
});

Meteor.methods({
  deleteComment: function(removeId){
	  return Forums.update({_id : removeId}, {$set:{comment : "Post has been removed by an admin"}});
  }
});