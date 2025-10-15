/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TouchableHighlight, Animated, Easing } from 'react-native';
import RefreshIcon from '~assets/refresh.svg';
import colors from '~styles/colors';

type AnimatedRefreshButtonProps = {
  action: () => Promise<any>;
  style?: any;
};

const AnimatedRefreshButton = ({ action, style }: AnimatedRefreshButtonProps) => {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));

  const refreshButtonAnimation = Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    })
  );

  const startRefreshAnimation = () => refreshButtonAnimation.start();

  const stopRefreshAnimation = () => {
    setSpinValue(new Animated.Value(0));
    refreshButtonAnimation.stop();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const handleRefreshAsset = async () => {
    startRefreshAnimation();
    await action();
    stopRefreshAnimation();
  };

  return (
    <TouchableHighlight style={style} onPress={handleRefreshAsset}>
      <Animated.View
        style={{
          transform: [{ rotate: spin }]
        }}
      >
        <RefreshIcon width={24} height={24} stroke={colors.neutral_light} />
      </Animated.View>
    </TouchableHighlight>
  );
};

export default AnimatedRefreshButton;
