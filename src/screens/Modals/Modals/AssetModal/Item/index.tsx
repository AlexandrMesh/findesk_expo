import React from 'react';
import { Text, View, Pressable } from 'react-native';
import RadioButton from '~UI/RadioButton';
import styles from './styles';

type ItemProps = {
  title: string;
  subTitle: string;
  isSelected: boolean;
  action: () => unknown;
};

const Item = ({ title, subTitle, isSelected, action }: ItemProps) => {
  return (
    <Pressable style={styles.menuItem} onPress={action}>
      <View style={styles.labelWrapper}>
        <Text numberOfLines={1} style={styles.menuItemTitle}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.menuItemSubTitle}>
          {subTitle}
        </Text>
      </View>
      <RadioButton isSelected={isSelected} />
    </Pressable>
  );
};

export default Item;
