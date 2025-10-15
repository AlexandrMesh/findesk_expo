import React from 'react';
import { TouchableHighlight } from 'react-native';
import colors from '~styles/colors';
import PlusIcon from '~assets/plus.svg';
import styles from './styles';

type AddAssetButtonProps = {
  onPress: () => unknown;
};

const AddAssetButton = ({ onPress }: AddAssetButtonProps) => {
  return (
    <TouchableHighlight style={styles.addAssetButton} onPress={onPress}>
      <PlusIcon width={28} height={28} fill={colors.neutral_light} />
    </TouchableHighlight>
  );
};

export default AddAssetButton;
