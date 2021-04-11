import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Image, Table } from 'semantic-ui-react';
import { GamesInfo } from '/imports/api/gameinfo/gameinfo';

class Roblox extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Retrieving Record Data</Loader>;
  }

  renderPage() {
    return (
      <Container>
        <Image centered src={this.props.gameinfo[0].image}/>
        <Table></Table>
      </Container>
    );
  }
}

Roblox.propTypes = {
  gameinfo: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('GamesInfo');
  return {
    gameinfo: GamesInfo.find({ id: "roblox" }).fetch(),
    ready: subscription.ready(),
  };
})(Roblox);