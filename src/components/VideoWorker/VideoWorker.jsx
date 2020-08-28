import React from 'react'
import CanvasWorker from './canvas.worker.js';

// import { useWorker } from 'react-hooks-worker';

function VideoWorker() {

  const canvasWorker = new CanvasWorker();
  canvasWorker.postMessage({ run: true });

  let messageCount = 0;

  canvasWorker.onmessage = event => {
    if (event.data.status) {
      console.log('STATUS', event.data.status);
    }

    if (event.data.message) {
      messageCount += 1;
      console.log('MESSAGE', event.data.message);

      if (messageCount >= 5) {
        canvasWorker.postMessage({ run: false });
      }
    }
  }
  // componentDidMount = () => {
    // this.canvas = this.canvasRef.current;
    // this.offscreenCanvas = this.canvas.transferControlToOffscreen();
    // this.worker.postMessage({canvas: this.offscreenCanvas}, [this.offscreenCanvas]);
    // this.worker.postMessage({message: "FoO BAR"});
  // }

  // update = () => {
  
  
  
  //   console.log(result)
  // }

  return (
    // <canvas 
    //   ref={canvasRef}
    //   width={window.innerWidth}
    //   height={window.innerHeight}
    // />
    <div>Hello</div>
  )
}

export default VideoWorker