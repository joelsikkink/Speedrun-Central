import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Image, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <Grid id='landing-page' verticalAlign='middle' textAlign='center'>
            <Grid.Row>
              <Image
                src='images/image-16by9.png'
              />
              <Header as='h2' verticalAlign='middle'>
                  Insert Banner Here
              </Header>
            </Grid.Row>

            <Grid.Row>
              <Header as='h1'>
                  Live Run
              </Header>
            </Grid.Row>

            <Grid.Row>
              <iframe
                src="https://player.twitch.tv/?channel=hirona&parent=localhost&muted=true"
                height="720"
                width="60%"
                allowFullScreen="true">
              </iframe>
              <iframe src="https://www.twitch.tv/embed/hirona/chat?parent=localhost"
                height="720"
                width="30%">
              </iframe>
            </Grid.Row>

            <Grid.Row>
              <Header as='h1'>
                Games
              </Header>
            </Grid.Row>

            <Grid.Row>
              <Image.Group>
                <Image
                    src='https://static-cdn.jtvnw.net/ttv-boxart/Minecraft-285x380.jpg'
                    height='380'
                    width='285'
                    as={NavLink}
                    exact to='/minecraft'
                  />
                <Image
                    src='https://static-cdn.jtvnw.net/ttv-boxart/Minecraft-285x380.jpg'
                    height='380'
                    width='285'
                    as={NavLink}
                    exact to='/minecraft'
                  />
              </Image.Group>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default Landing;
