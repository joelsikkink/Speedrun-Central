import React from 'react';
import { Button } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
            Dream • University of Hawaiʻi at Mānoa • 2500 Campus Road • Honolulu, HI 96822
          </div>
        </footer>
    );
  }
}

export default Footer;
