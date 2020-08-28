import React, { Component } from 'react';
import PropTypes from 'prop-types';
import core from './VideoEffectCore.module.css';
import effects from './Effects.module.css';

export class VideoEffect extends Component {
  getEffectClass = effectName => {
    const name = effects[`_effect-${effectName}`] || '';
    if (!Boolean(name)) {
      console.warn(`Video Effect '${effectName}' not found.`);
    }
    return name;
  };

  render() {
    const { strength, effect } = this.props;
    const style = { '--strength': strength };
    const classes = `${core.videoEffect} ${this.getEffectClass(effect)}`;
    return (
      <div className={classes} style={style}>
        {this.props.children}
      </div>
    );
  }
}

VideoEffect.propTypes = {
  effect: PropTypes.string.isRequired,
  strength: PropTypes.number,
};

VideoEffect.defaultProps = {
  strength: 1,
};

export default VideoEffect;
