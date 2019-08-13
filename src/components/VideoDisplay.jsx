import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

class VideoDisplay extends React.Component {
  render() {
    console.log(this.props.playing);
    return (
      <ReactPlayer
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
      />
    );
  }
}

const defaultEventLogger = (eType, e = undefined) => {
  const msg = e ? `${eType}\n${JSON.stringify(e)} ` : eType;
  console.log(msg);
};

VideoDisplay.propTypes = {
  src: PropTypes.string.isRequired,
  playing: PropTypes.bool,
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
