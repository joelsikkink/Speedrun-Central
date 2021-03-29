import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Menu, Loader } from 'semantic-ui-react';
import { GamesInfo } from '/imports/api/gameinfo/gameinfo';
import GameCard from '/imports/ui/components/GameCard';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class GamesDash extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Retrieving Games List</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const spacing = {
      paddingTop: '30px',
      paddingBottom: '30px',
      paddingLeft: '10px',
    };
    const divStyle = { paddingTop: '50px', paddingBottom: '250px' };
    return (
        <div>
          <div>
            <Menu text>
              <Menu.Item>
                <Header as="h1" textAlign="center" inverted>
                  <div style={spacing}>
                    Games Dashboard
                  </div>
                </Header>
                <Header as="h3" textAlign="center" inverted>
                  <div  style={spacing}>
                    List of Games
                  </div>
                </Header>
              </Menu.Item>
            </Menu>
          </div>
          <div>
            <Container>
              <Card.Group centered itemsPerRow={4}>
                {this.props.gameinfo.map((gameinfo, index) => <GameCard key={index}
                                                                                 gameinfo={gameinfo}/>)}
              </Card.Group>
            </Container>
          </div>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
GamesDash.propTypes = {
  gameinfo: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('GamesInfo');
  return {
    gameinfo: GamesInfo.find({}).fetch(),
    ready: subscription.ready(),
  };
})(GamesDash);
