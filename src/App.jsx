import React from 'react';
import VideoDisplay from './components/VideoDisplay';
import VideoFilter from './components/VideoFilter/VideoFilter';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [
        'http://localhost:3000/vids/lala.webm',
        'http://localhost:3000/vids/matrix.webm',
        'http://localhost:3000/vids/sneakers.webm',
      ],
      currentTrackNumber: 2,
    };
  }

  currentTrackUrl = () => this.state.playlist[this.state.currentTrackNumber];
  nextTrack = () => {
    const i = this.state.currentTrackNumber + 1;
    const newTrackNum = i >= this.state.playlist.length ? 0 : i;
    this.setState({ currentTrackNumber: newTrackNum });
  };

  render() {
    return (
      <VideoFilter filter="grid">
        <VideoDisplay className="player" src={this.currentTrackUrl()} width="100%" />
      </VideoFilter>
    );
  }
}

export default App;
