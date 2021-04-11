import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class ForumItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.forum.owner}</Table.Cell>
          <Table.Cell>{this.props.forum.comment}</Table.Cell>
          <Table.Cell>{this.props.forum.time}</Table.Cell>
		  {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Table.Cell><Button className="ui red button" onClick={() => Meteor.call("deleteComment", this.props.forum._id)}>Delete</Button></Table.Cell>
            ) : ''}
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ForumItem.propTypes = {
  forum: PropTypes.object.isRequired,
};


export default ForumItem;
