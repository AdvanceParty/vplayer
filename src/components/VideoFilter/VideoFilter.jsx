import React, { Component } from 'react';
import PropTypes from 'prop-types';
import core from './VideoFilterCore.module.css';
import filters from './Filters.module.css';

export class VideoFilter extends Component {
  getFilterClass = filterName => {
    const name = filters[`_filter-${filterName}`] || '';
    if (!Boolean(name)) {
      console.warn(`Filter '${filterName}' not found.`);
    }
    return name;
  };

  render() {
    const { strength, filter } = this.props;
    const style = { '--strength': strength };
    const classes = `${core.videoFilter} ${this.getFilterClass(filter)}`;
    return (
      <div className={classes} style={style}>
        {this.props.children}
      </div>
    );
  }
}

VideoFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  strength: PropTypes.number,
};

VideoFilter.defaultProps = {
  strength: 1,
};

export default VideoFilter;
