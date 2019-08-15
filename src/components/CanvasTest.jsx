import React, { Component } from 'react'
import { relative } from 'path';

export class CanvasTest extends Component {

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
        mixBlendMode: 'overlay'
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
        <video ref={this.state.vRef} loop autoPlay controls  style={this.styles.video}>
          <source src="vids/matrix.webm" type="video/webm" />
        </video>
      </div>
    )
  }
}

export default CanvasTest
