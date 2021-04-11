import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class ProfRunItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.run.game}</Table.Cell>
          <Table.Cell>{this.props.run.time}</Table.Cell>
          <Table.Cell>{this.props.run.videoLink}</Table.Cell>
		  <Table.Cell><Button className="ui red button" onClick={() => Meteor.call("deleteRun", this.props.run._id)}>Delete</Button></Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ProfRunItem.propTypes = {
  run: PropTypes.object.isRequired,
};


export default ProfRunItem;
