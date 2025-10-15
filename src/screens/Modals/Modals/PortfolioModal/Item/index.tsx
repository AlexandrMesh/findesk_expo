import React from 'react';
import { Text, View, Pressable, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import RadioButton from '~UI/RadioButton';
import colors from '~styles/colors';
import { DEFAULT_PORTFOLIO_ID } from '~constants/portfolio';
import RemoveIcon from '~assets/remove.svg';
import styles from './styles';

type ItemProps = {
  id: string;
  title: string;
  isSelected: boolean;
  action: () => unknown;
  onRemove: () => unknown;
};

const Item = ({ id, title, isSelected, action, onRemove }: ItemProps) => {
  const { t } = useTranslation(['portfolio', 'common']);

  const createAlert = () =>
    Alert.alert(t('removePortfolioTitle'), t('removePortfolioDescription'), [
      {
        text: t('common:cancel')
      },
      { text: t('common:remove'), onPress: onRemove }
    ]);

  return (
    <Pressable style={styles.menuItem} onPress={action}>
      <View style={styles.labelWrapper}>
        <Text numberOfLines={1} style={styles.menuItemTitle}>
          {title}
        </Text>
        {id !== DEFAULT_PORTFOLIO_ID && (
          <Pressable style={styles.removeIcon} onPress={createAlert}>
            <RemoveIcon fill={colors.neutral_medium} width={20} height={20} />
          </Pressable>
        )}
      </View>
      <RadioButton isSelected={isSelected} />
    </Pressable>
  );
};

export default Item;
