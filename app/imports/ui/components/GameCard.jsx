import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { GameInfo } from '/imports/api/gameinfo/gameinfo';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class GameCard extends React.Component {
  render() {
    return (
      <Card raised color="blue">
          <Image size='small' centered src={this.props.gameinfo.image}/>
          <Card.Content>
            <Card.Header>
              <div>
                {this.props.gameinfo.name}
              </div>
            </Card.Header>
            <Card.Description>
              <div>
                {this.props.gameinfo.description}
              </div>
            </Card.Description>
          </Card.Content>
        </Card>   
    );
  }
}

/** Require a document to be passed to this component. */
GameCard.propTypes = {
  gameinfo: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(GameCard);
