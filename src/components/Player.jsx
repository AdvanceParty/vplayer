import React from 'react';
import ReactPlayer from 'react-player';

class Player extends React.Component {
  render() {
    return <ReactPlayer url={this.props.src} playing={true} height="100vh" width="100%" />;
  }
}

export default Player;
