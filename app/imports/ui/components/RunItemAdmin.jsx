import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class RunItemAdmin extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.run.game}</Table.Cell>
          <Table.Cell>{this.props.run.time}</Table.Cell>
          <Table.Cell>{this.props.run.videoLink}</Table.Cell>
          <Table.Cell>{this.props.run.owner}</Table.Cell>
		  <Table.Cell>
		    <Button className="ui green button" onClick={() => Meteor.call("approveRun", this.props.run._id)}>Approve</Button>
			<div className="or" data-text="OR"></div>
			<Button className="ui red button" onClick={() => Meteor.call("deleteRun", this.props.run._id)}>Deny</Button>
		  </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
RunItemAdmin.propTypes = {
  run: PropTypes.object.isRequired,
};


export default RunItemAdmin;
