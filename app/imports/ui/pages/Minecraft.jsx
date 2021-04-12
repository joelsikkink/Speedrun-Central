import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Image, Table } from 'semantic-ui-react';
import { GamesInfo } from '/imports/api/gameinfo/gameinfo';
import { Runs } from '../../api/runs/Runs';
import RunItem from '../components/RunItem';

class Minecraft extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Retrieving Record Data</Loader>;
  }

  renderPage() {
    return (
      <Container>
        <Image centered src={this.props.gameinfo[0].image}/>
        <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Game</Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
                <Table.HeaderCell>VideoLink</Table.HeaderCell>
                <Table.HeaderCell>Owner</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.runs.map((run) => <RunItem key={run._id} run={run} />)}
            </Table.Body>
          </Table>
      </Container>
    );
  }
}

Minecraft.propTypes = {
  gameinfo: PropTypes.array.isRequired,
  runs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('GamesInfo');
  const subscription2 = Meteor.subscribe('Runs');
  return {
    gameinfo: GamesInfo.find({ id: "minecraft" }).fetch(),
	runs: Runs.find({approved: true, game: 'Minecraft'}).fetch(),
    ready: subscription.ready(),
  };
})(Minecraft);