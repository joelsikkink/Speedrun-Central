import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

class UserLanding extends React.Component {
  render() {
    return (
        <div>
          <Grid id='landing-page' verticalAlign='middle' textAlign='center'>
            <Grid.Row>
              <Header as='h1'>
                  Live Run
              </Header>
            </Grid.Row>

            <Grid.Row>
              <iframe
                src="https://player.twitch.tv/?channel=biotoxz_&parent=localhost&muted=true"
                height="720"
                width="60%"
                allowFullScreen="true">
              </iframe>
              <iframe src="https://www.twitch.tv/embed/biotoxz_/chat?parent=localhost"
                height="720"
                width="30%">
              </iframe>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default UserLanding;
