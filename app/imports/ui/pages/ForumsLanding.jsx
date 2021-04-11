import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Forums } from '../../api/forums/Forums';
import { withRouter, NavLink } from 'react-router-dom';
/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ForumsLanding extends React.Component {

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
                <Table.HeaderCell>Posts</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
			    <Table.Cell as={NavLink} activeClassName="active" exact to="/generalForums" key='forums'>General Speedrunning</Table.Cell>
                <Table.Cell>{this.props.genforums}</Table.Cell>
			  </Table.Row>
			  <Table.Row>
			    <Table.Cell as={NavLink} activeClassName="active" exact to="/minecraftForums" key='forums'>Minecraft</Table.Cell>
                <Table.Cell>{this.props.mcforums}</Table.Cell>
			  </Table.Row>
			  <Table.Row>
			    <Table.Cell as={NavLink} activeClassName="active" exact to="/superMario64Forums" key='forums'>Super Mario 64</Table.Cell>
                <Table.Cell>{this.props.smforums}</Table.Cell>
			  </Table.Row>
			  <Table.Row>
			    <Table.Cell as={NavLink} activeClassName="active" exact to="/robloxSpeedrun4Forums" key='forums'>Roblox: Speed Run 4</Table.Cell>
                <Table.Cell>{this.props.rbforums}</Table.Cell>
			  </Table.Row>
			  <Table.Row>
			    <Table.Cell as={NavLink} activeClassName="active" exact to="/offTopicForums" key='forums'>Off-Topic</Table.Cell>
                <Table.Cell>{this.props.otforums}</Table.Cell>
			  </Table.Row>
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ForumsLanding.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Forums');
  return {
	genforums: Forums.find({game: 'General Speedrunning'}).count(),
	mcforums: Forums.find({game: 'Minecraft'}).count(),
	smforums: Forums.find({game: 'Super Mario 64'}).count(),
	rbforums: Forums.find({game: 'Roblox: Speed Run 4'}).count(),
	otforums: Forums.find({game: 'Off-Topic'}).count(),
    ready: subscription.ready(),
  };
})(ForumsLanding);
