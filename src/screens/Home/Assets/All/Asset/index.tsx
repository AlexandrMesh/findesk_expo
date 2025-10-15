import React, { memo } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { FULL_ASSET_ROUTE } from '~constants/routes';
import numberToLocalString from '~utils/numberToLocalString';
import { IAsset } from '~types/asset';
import PieChartIcon from '~assets/pie-chart.svg';
import styles from './styles';

type AssetProps = {
  item: IAsset;
};

const Asset = ({ item }: AssetProps) => {
  const { t } = useTranslation(['common', 'asset']);
  const navigation = useNavigation<any>();

  const getValueStyle = (value: number) => (value >= 0 ? styles.increased : styles.decreased);

  return (
    <TouchableHighlight style={styles.asset} onPress={() => navigation.navigate(FULL_ASSET_ROUTE, { assetId: item.id })}>
      <View style={styles.header}>
        <View style={styles.titleWrapper}>
          <View>
            <Text style={styles.assetTitle}>
              {item.title} <Text style={styles.colored}>{item.symbol}</Text>
            </Text>
            <Text style={styles.colored}>{t('price', { price: numberToLocalString(item.currentPrice || 0, item.currentPrice < 0.1 ? 5 : 2) })}</Text>
            <Text style={styles.label}>
              {t('invested')}: <Text style={styles.colored}>{t('price', { price: numberToLocalString(item.invested) })}</Text>
            </Text>
            <Text style={styles.label}>
              {t('count', { value: numberToLocalString(item.count, 5) })} /{' '}
              {t('price', { price: numberToLocalString(item.averagePrice || 0, item.averagePrice < 0.1 ? 5 : 2) })}
            </Text>
          </View>
        </View>
        <View style={styles.info}>
          <Text numberOfLines={1} style={[styles.bold, styles.changeRate, getValueStyle(item.diffInPercent)]}>
            {t('percents', { value: numberToLocalString(item.diffInPercent || 0) })}
          </Text>
          <Text numberOfLines={1} style={[styles.changeRate, getValueStyle(item.diffInValue)]}>
            {t('price', { price: numberToLocalString(item.diffInValue || 0, item.diffInValue < 0.1 ? 3 : 2) })}
          </Text>
          <View style={[styles.share, styles.mTop]}>
            <View style={styles.chartIcon}>
              <PieChartIcon width={16} height={16} />
            </View>
            <Text style={styles.colored}>{t('percents', { value: numberToLocalString(item.share) })}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default memo(Asset, (prevProps, nextProps) => {
  return (
    prevProps.item.title === nextProps.item.title &&
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.symbol === nextProps.item.symbol &&
    prevProps.item.currentPrice === nextProps.item.currentPrice &&
    prevProps.item.invested === nextProps.item.invested &&
    prevProps.item.count === nextProps.item.count &&
    prevProps.item.averagePrice === nextProps.item.averagePrice &&
    prevProps.item.diffInPercent === nextProps.item.diffInPercent &&
    prevProps.item.diffInValue === nextProps.item.diffInValue &&
    prevProps.item.share === nextProps.item.share
  );
});
