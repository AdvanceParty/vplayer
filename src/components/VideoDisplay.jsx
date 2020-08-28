import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

class VideoDisplay extends React.Component {

  constructor (props) {
    super(props)

    this.styles = {
      wrapper: {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        minHeight: '100vh'
      },
      canvas: {
        position: 'absolute',
        zIndex: '10',
        left: '0',
        top: '0',

      },
      video: {
        position: 'absolute',
        zIndex: '1',
        width:'100%',
        top: '0',
        left:'0'
      },
    }

    this.state = {
      vRef: React.createRef(),
      cRef: React.createRef(),
      video: null,
      canvas: null,
      context: null,
      width: 0,
      height: 0
    }
      
  }

  componentDidMount = () => {
    const {vRef, cRef } = this.state;    
    
    const video = vRef.current;
    const canvas = cRef.current;
    const context = canvas.getContext('2d');

    this.setState({video, canvas, context});

    video.addEventListener('play', () => this.draw())
  }

  draw = () => {
    const { video, canvas, context, width, height } = this.state;
    if(video.paused || video.ended) return false;
   
    const w = video.clientWidth;
    const h = video.clientHeight;
    if (w !== width || h !== height) {
      canvas.width = w;
      canvas.height = h;
      this.setState({width: w, height: h})
    }

    context.drawImage(video,0,0,w,h);
    setTimeout(this.draw,5);
  }

  render() {
    return (
      <div style={this.styles.wrapper}>
        <canvas ref={this.state.cRef}  style={this.styles.canvas}></canvas>
        <ReactPlayer ref={this.state.vRef} style={this.styles.video}
          url={this.props.src}
          playing={this.props.playing}
          onReady={this.props.onReady}
          onStart={this.props.onStart}
          onPlay={this.props.onPlay}
          onPause={this.props.onPause}
          onBuffer={this.props.onBuffer}
          onEnded={this.props.onEnded}
          onSeek={this.props.onSeek}
          onProgress={this.props.onProgress}
          onDuration={this.props.onDuration}
          width={this.props.width}
          height={this.props.height}
          loop={this.props.loop}
        />
        </div>
    );
  }
}

const defaultEventLogger = (eType, e = undefined) => {
  // const msg = e ? `${eType}\n${JSON.stringify(e)} ` : eType;
  // console.log(msg);
};

VideoDisplay.propTypes = {
  src: PropTypes.string.isRequired,
  playing: PropTypes.bool,
  loop: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onBuffer: PropTypes.func,
  onEnded: PropTypes.func,
  onSeek: PropTypes.func,
  onProgress: PropTypes.func,
  onDuration: PropTypes.func,
};

VideoDisplay.defaultProps = {
  playing: true,
  loop: true,
  height: '100%',
  width: '100%',
  onReady: defaultEventLogger('onReady'),
  onStart: defaultEventLogger('onStart'),
  onPlay: defaultEventLogger('onPlay'),
  onPause: defaultEventLogger('onPause'),
  onBuffer: defaultEventLogger('onBuffer'),
  onEnded: defaultEventLogger('onEnded'),
  onSeek: e => defaultEventLogger('Seek', e),
  onProgress: e => defaultEventLogger('onProgress', e),
  onDuration: e => defaultEventLogger('onDuration', e),
};

export default VideoDisplay;
