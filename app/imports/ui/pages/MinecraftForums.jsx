import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Forums } from '../../api/forums/Forums';
import ForumItem from '../components/ForumItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class MinecraftForums extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Minecraft Forums</Header>
		  <Button as={NavLink} activeClassName="active" exact to="/forumComment" key='forumComment'>Make A Comment</Button>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>User</Table.HeaderCell>
                <Table.HeaderCell>Comment</Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
				{Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                  <Table.HeaderCell>Moderation</Table.HeaderCell>
                  ) : ''}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.forums.map((forum) => <ForumItem key={forum._id} forum={forum} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
MinecraftForums.propTypes = {
  forums: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Forums');
  console.log(subscription);
  console.log(Forums.find({}).fetch());
  return {
    forums: Forums.find({game: 'Minecraft'}).fetch(),
    ready: subscription.ready(),
  };
})(MinecraftForums);