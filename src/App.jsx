import React from 'react';
// import VideoCanvas from './components/VideoCanvas/VideoCanvas';
// import VideoWorker from './components/VideoWorker/VideoWorker';
import HelloWorker from './canvas.worker.js';


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
      <div>Yo</div>
      // <VideoCanvas src="vids/matrix.webm" type="video/webm" filter='grayscale(.8) invert(1)' />  
      // <VideoWorker src="vids/matrix.webm" type="video/webm" filter='grayscale(.8) invert(1)' />  
      // <VideoEffect effect="x" strength={0.5}>
      // </VideoEffect>
    );
  }
}

const helloWorker = new Worker(HelloWorker);
let messageCount = 0;

helloWorker.postMessage({ run: true });

helloWorker.onmessage = event => {
  if (event.data.status) {
    console.log('STATUS', event.data.status);
  }

  if (event.data.message) {
    messageCount += 1;
    console.log('MESSAGE', event.data.message);

    if (messageCount >= 5) {
      helloWorker.postMessage({ run: false });
    }
  }

}

export default App;
