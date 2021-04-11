import { Meteor } from 'meteor/meteor';
import { Runs } from '../../api/runs/Runs.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Runs.insert(data);
}

/** Initialize the collection if empty. */
if (Runs.find().count() === 0) {
  if (Meteor.settings.defaultRuns) {
    console.log('Creating default data.');
    Meteor.settings.defaultRuns.map(data => addData(data));
  }
}

Meteor.publish('Runs', function publish() {
  if (this.userId) {

    return Runs.find({});
  }
  return this.ready();
});

Meteor.methods({
  deleteRun: function(removeId){
    return Runs.remove(removeId);
  },
  approveRun: function(approveId){
	  return Runs.update({_id : approveId}, {$set:{approved : true}});
  }
});