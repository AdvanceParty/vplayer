import React, { Component } from 'react'
import styles from './Styles.module.css';

export class VideoCanvas extends Component {

  constructor (props) {
    super(props)
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
   
    // ToDO: Would be better to do this on resize event
    // Rather than checking each time draw() is called
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
      <div>
        <canvas ref={this.state.cRef}></canvas>
        <video ref={this.state.vRef} autoPlay >
          <source src={this.props.src} type={this.props.type} />
        </video>
      </div>
    )
  }
}

export default VideoCanvas
