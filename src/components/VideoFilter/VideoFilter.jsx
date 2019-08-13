import React, { Component } from 'react';
import styles from './VideoFilter.module.css';

export class VideoFilter extends Component {
  getFilterClass = filterName => {
    return styles[`_filter-${filterName}`] || '';
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
