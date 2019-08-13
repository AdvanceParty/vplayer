import React, { Component } from 'react';
import styles from './VideoFilter.module.css';
import filters from './filters/VideoFilter-Grid.module.css';

// const filters = {
//   grid: './filters/VideoFilter-Grid.module.css',
// };

export class VideoFilter extends Component {
  getFilterClass = filterName => {
    return filters[`filter_${filterName}`] || '';
  };

  render() {
    return (
      <div className={`${styles.videoFilter} ${this.getFilterClass(this.props.filter)}`}>
        {this.props.children}
      </div>
    );
  }
}

export default VideoFilter;
