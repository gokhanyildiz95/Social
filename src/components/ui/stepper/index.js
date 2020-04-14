import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, View, Text } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import _ from 'lodash';

// Style
import style from './style';

class Stepper extends Component {
  getProgressWidth() {
    const { progressState, labels } = this.props;

    return (1 / labels.length) * progressState;
  }

  render() {
    const { labels, progressState } = this.props;
    const progressWidth = this.getProgressWidth();

    return (
      <View style={{ flex: 1 }}>
        <View style={style.progressGhostBorder}>
          <Animated.View style={{ ...style.progressBorder, flex: progressWidth }} />
        </View>
        <Grid style={style.indicatorContent}>
          {_.map(labels, (label, step) => (
            <Col style={style.indicatorCol} key={step}>
              <View
                style={[style.indicator, progressState >= step + 1 ? style.indicatorFinished : {}]}
              >
                <Text style={style.indicatorText}>{label}</Text>
              </View>
            </Col>
          ))}
        </Grid>
      </View>
    );
  }
}

Stepper.defaultProps = {
  labels: []
};

Stepper.propTypes = {
  progressState: PropTypes.number.isRequired,
  labels: PropTypes.array
};

export default Stepper;
