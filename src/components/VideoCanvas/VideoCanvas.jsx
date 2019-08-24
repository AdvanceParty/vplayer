// ToDo:
// SEE Video/Canvas optimisations at 
// https://stackoverflow.com/questions/21197707/html5-video-to-canvas-playing-very-slow

import React, { Component } from 'react'


export class VideoCanvas extends Component {

  constructor (props) {
    super(props)
    
    this.cRef = React.createRef();
    this.canvas = null;  // set on componentDidMount

    this.state = {
      src: null,
      videoWidth: 0,
      videoHeight: 0,
      ratio: 0,
      imageData: null,
    }
    
    this.video = document.createElement('video');
    this.video.preload = 'auto';
    this.video.addEventListener('play', () => this.draw())
    this.video.addEventListener('canplay', () => this.videoReady());
  }
  
  getSize = () => ({width:this.cRef.width || 0 , height:this.cRef.height || 0});
  getRatio = () => (this.state.ratio);
  getNativeSize = () => ({width:this.state.videoWidth, height:this.state.videoHeight});
  
  componentDidMount = () => {    
    this.canvas = this.cRef.current;
    if (this.props.src) this.load(this.props.src);

  }
  
  load = (src) => {
    // ToDo: test for a currently playing video and unload gracefully
    try {
      this.video.src = src;
    } catch (e) {
      console.log(`Unable to to load ${src}`,e)
    }
  }


  
  // ToDO: Would be better to do this on resize event
  setCanvasSize = (w, h) => {
    const { width, height } = this.canvas;
    
    if (w !== width || h !== height) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
  }

  videoReady = (e) => {
    const {videoWidth, videoHeight} = this.video;
    this.setState({videoWidth, videoHeight, ratio:videoWidth/videoHeight});
    this.video.play();
  }

  draw = () => {
    
    if(this.video.paused || this.video.ended) return false;    
    
    const {width, height} = this.getNativeSize()
    this.setCanvasSize(width,height);
    this.canvas.getContext('2d').drawImage(this.video,0,0,width,height);
    
    // var imageData = context.getImageData(0,0,this.canvas.width,this.canvas.height);
    // this.pixelate(imageData, imageData,{pixelWidth: 8, pixelHeight: 8});
    //context.putImageData(imageData, 0, 0)
    
    requestAnimationFrame(this.draw);
  }

  render() {
    return (
      <div>
        <canvas style={this.styles} ref={this.cRef}></canvas>
      </div>
    )
  }
}

export default VideoCanvas




  // pixelate (src, dst, opt={}) {

  //   var xBinSize = opt.pixelWidth || 8,
  //     yBinSize = opt.pixelHeight || 8;
  
  //   var xSize = src.width,
  //     ySize = src.height,
  //     srcPixels = src.data,
  //     dstPixels = dst.data,
  //     x, y, i;
  
  //   var pixelsPerBin = xBinSize * yBinSize,
  //     red, green, blue, alpha,
  //     nBinsX = Math.ceil(xSize / xBinSize),
  //     nBinsY = Math.ceil(ySize / yBinSize),
  //     xBinStart, xBinEnd, yBinStart, yBinEnd,
  //     xBin, yBin, pixelsInBin;
  
  //   for (xBin = 0; xBin < nBinsX; xBin += 1) {
  //     for (yBin = 0; yBin < nBinsY; yBin += 1) {
        
  //       // Initialize the color accumlators to 0
  //       red = 0;
  //       green = 0;
  //       blue = 0;
  //       alpha = 0;
  
  //       // Determine which pixels are included in this bin
  //       xBinStart = xBin * xBinSize;
  //       xBinEnd = xBinStart + xBinSize;
  //       yBinStart = yBin * yBinSize;
  //       yBinEnd = yBinStart + yBinSize;
  
  //       // Add all of the pixels to this bin!
  //       pixelsInBin = 0;
  //       for (x = xBinStart; x < xBinEnd; x += 1) {
  //         if( x >= xSize ){ continue; }
  //         for (y = yBinStart; y < yBinEnd; y += 1) {
  //           if( y >= ySize ){ continue; }
  //           i = (xSize * y + x) * 4;
  //           red += srcPixels[i + 0];
  //           green += srcPixels[i + 1];
  //           blue += srcPixels[i + 2];
  //           alpha += srcPixels[i + 3];
  //           pixelsInBin += 1;
  //         }
  //       }
  
  //       // Make sure the channels are between 0-255
  //       red = red / pixelsInBin;
  //       green = green / pixelsInBin;
  //       blue = blue / pixelsInBin;
  //       alpha = alpha / pixelsInBin;
  
  //       // Draw this bin
  //       for (x = xBinStart; x < xBinEnd; x += 1) {
  //         if( x >= xSize ){ continue; }
  //         for (y = yBinStart; y < yBinEnd; y += 1) {
  //           if( y >= ySize ){ continue; }
  //           i = (xSize * y + x) * 4;
  //           dstPixels[i + 0] = red;
  //           dstPixels[i + 1] = green;
  //           dstPixels[i + 2] = blue;
  //           dstPixels[i + 3] = alpha;
  //         }
  //       }
  //     }
  //   }
  
  // };