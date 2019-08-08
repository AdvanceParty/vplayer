import React from 'react';
import Player from './components/Player';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [
        'http://localhost:3000/vids/lala.webm',
        'http://localhost:3000/vids/matrix.webm',
        'http://localhost:3000/vids/sneakers.webm',
      ],
      currentTrackNumber: 1,
    };
  }

  currentTrackUrl = () => this.state.playlist[this.state.currentTrackNumber];

  render() {
    return (
      <div className="App">
        <Player src={this.currentTrackUrl()} />
      </div>
    );
  }
}

export default App;
