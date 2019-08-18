import React from 'react';
// import VideoDisplay from './components/VideoDisplay';
// import VideoEffect from './components/VideoEffect/VideoEffect';
import VideoCanvas from './components/VideoCanvas/VideoCanvas';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [
        'http://localhost:3000/vids/lala.webm',
        'http://localhost:3000/vids/matrix.webm',
        'http://localhost:3000/vids/sneakers.webm',
      ],
      currentTrackNumber: 0,
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
      // <VideoEffect effect="grid" strength={0.5}>
        // <VideoDisplay src={this.currentTrackUrl()} width="100%" />
      // </VideoEffect>
      <div className='vCan'>
        <VideoCanvas src="vids/matrix.webm" type="video/webm" filter='grayscale(.8) invert(1)' />
      </div>
    );
  }
}

export default App;
