import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import StuffItem from '../components/StuffItem';
import { withRouter, NavLink } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Forums extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Forums</Header>
          <Table inverted striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Forum</Table.HeaderCell>
                <Table.HeaderCell>Threads</Table.HeaderCell>
                <Table.HeaderCell>Posts</Table.HeaderCell>
				<Table.HeaderCell>Last Post</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
			    <Table.Cell as={NavLink} activeClassName="active" exact to="/forums" key='forums'>General Speedrunning</Table.Cell>
                <Table.Cell>None</Table.Cell>
                <Table.Cell>None</Table.Cell>
				<Table.Cell>None</Table.Cell>
			  </Table.Row>
			  <Table.Row>
			    <Table.Cell as={NavLink} activeClassName="active" exact to="/forums" key='forums'>Game Based Discussion</Table.Cell>
                <Table.Cell>None</Table.Cell>
                <Table.Cell>None</Table.Cell>
				<Table.Cell>None</Table.Cell>
			  </Table.Row>
			  <Table.Row>
			    <Table.Cell as={NavLink} activeClassName="active" exact to="/forums" key='forums'>Off-Topic</Table.Cell>
                <Table.Cell>None</Table.Cell>
                <Table.Cell>None</Table.Cell>
				<Table.Cell>None</Table.Cell>
			  </Table.Row>
			  <Table.Row>
			    <Table.Cell as={NavLink} activeClassName="active" exact to="/forums" key='forums'>Site Feedback</Table.Cell>
                <Table.Cell>None</Table.Cell>
                <Table.Cell>None</Table.Cell>
				<Table.Cell>None</Table.Cell>
			  </Table.Row>
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Forums.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  return {
    stuffs: Stuffs.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Forums);
