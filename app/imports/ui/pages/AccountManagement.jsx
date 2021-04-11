import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import AccItemAdmin from '../components/AccItemAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AccountManagement extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Manage Accounts</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
			{console.log(this.props.accounts)}
              {this.props.accounts.map((accs) => <AccItemAdmin key={accs._id} accs={accs} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
AccountManagement.propTypes = {
  accounts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  console.log(Meteor.users.find({}).fetch());
  const subscription = Meteor.subscribe('userDisplay');
  return {
    accounts: Meteor.users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AccountManagement);
