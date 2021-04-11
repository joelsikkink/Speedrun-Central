import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import { Runs } from '../../api/runs/Runs';
import RunItemAdmin from '../components/RunItemAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AdminDash extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Stuff (Admin)</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Game</Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
                <Table.HeaderCell>VideoLink</Table.HeaderCell>
                <Table.HeaderCell>Owner</Table.HeaderCell>
				<Table.HeaderCell>Approve</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.runs.map((run) => <RunItemAdmin key={run._id} run={run} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
AdminDash.propTypes = {
  runs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Runs');
  const subscription2 = Meteor.subscribe(Stuffs.userPublicationName);
  console.log(subscription);
  console.log(subscription2);
  console.log(Runs.find({approved: false}).fetch());
  console.log(Stuffs.collection.find({}).fetch());
  return {
    runs: Runs.find({approved: false}).fetch(),
    ready: subscription.ready(),
  };
})(AdminDash);