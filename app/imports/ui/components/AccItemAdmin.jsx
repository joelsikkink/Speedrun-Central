import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class AccItemAdmin extends React.Component {

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.accs.emails[0].address}</Table.Cell>
          <Table.Cell>{this.props.accs.username}</Table.Cell>
          <Table.Cell><Button className="ui red button" onClick={() => Meteor.call("deleteAcc", this.props.accs._id)}>Delete</Button></Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
AccItemAdmin.propTypes = {
  accs: PropTypes.object.isRequired,
};

export default AccItemAdmin;
