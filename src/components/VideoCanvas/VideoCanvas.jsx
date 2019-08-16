// ToDo:
// SEE Video/Canvas optimisations at 
// https://stackoverflow.com/questions/21197707/html5-video-to-canvas-playing-very-slow

import React, { Component } from 'react'
import styles from './Styles.module.css';

export class VideoCanvas extends Component {

  constructor (props) {
    super(props)
    
    // ToDo: Why don't refs initialise unless in state?
    // this.vRef = React.createRef();
    // this.cRef = React.createRef();

    this.state = {
      cRef: React.createRef(),
      
      context: null,
      videoWidth: 0,
      videoHeight: 0,
      ratio: 0
    }
    
    this.video = document.createElement('video');
    this.video.preload = 'auto';
    this.video.addEventListener('play', () => this.draw())
    this.video.addEventListener('canplay', () => this.videoReady());
    this.video.src = this.props.src;

    this.canvas = null;

  }

  getSize = () => ({width:this.canvas.width || 0 , height:this.canvas.height || 0});
  getRatio = () => (this.state.ratio);
  getNativeSize = () => ({width:this.state.videoWidth, height:this.state.videoHeight});

  componentDidMount = () => {    
    this.canvas = this.state.cRef.current;
    this.setState({context:this.canvas.getContext('2d')});
  }

  
  // ToDO: Would be better to do this on resize event
  setCanvasSize = (w, h) => {
    const { width, height } = this.canvas;
    if (w !== width || h !== height) {
      console.log("Setting Canvas Size")
      this.canvas.width = w;
      this.canvas.height = h;
    }
  }

  videoReady = () => {
    const {videoWidth, videoHeight} = this.video
    this.setState({videoWidth, videoHeight, ratio:videoWidth/videoHeight});
    this.video.play();
  }

  draw = () => {
    const { context } = this.state;
    if(this.video.paused || this.video.ended) return false;    
    
    const {width, height} = this.getNativeSize()
    this.setCanvasSize(width,height);
    context.drawImage(this.video,0,0,width,height);
    
    setTimeout(this.draw,20);
  }

  render() {
    return (
      <div>
        <canvas ref={this.state.cRef}></canvas>
      </div>
    )
  }
}

export default VideoCanvas
