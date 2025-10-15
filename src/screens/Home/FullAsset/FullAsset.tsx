/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { View, ScrollView, Text, SectionList, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Button from '~UI/Button';
import AnimatedRefreshButton from '~UI/AnimatedRefreshButton';
import { IAsset, ISuggestedAsset } from '~types/asset';
import i18n from '~translations/i18n';
import { SECONDARY } from '~constants/themes';
import showRelativeDate from '~utils/relativeDate';
import numberToLocalString from '~utils/numberToLocalString';
import { ADD_ASSET_ROUTE } from '~constants/routes';
import { CRYPTOCURRENCY, STOCK } from '~constants/assets';
import { IPurchase } from '~types/purchase';
import styles from './styles';

type FullTaskProps = {
  asset: IAsset;
  removeAsset: (id: string) => unknown;
  loadAsset: (params: { symbol: string; type: typeof STOCK | typeof CRYPTOCURRENCY; uuid: string }) => Promise<number | undefined>;
  updateAsset: (params: { assetId: string; currentPrice: number; refreshed_at: number }) => unknown;
  selectSuggestedAsset: (value: ISuggestedAsset) => unknown;
  clearSuggestedAssets: () => unknown;
  sectionedPurchases: {
    title: string;
    count?: number;
    data: IPurchase[];
  }[];
};

const getValueStyle = (value: number) => (value >= 0 ? styles.increased : styles.decreased);

const FullTask = ({ asset, removeAsset, sectionedPurchases, selectSuggestedAsset, loadAsset, updateAsset, clearSuggestedAssets }: FullTaskProps) => {
  const { t } = useTranslation(['asset', 'common', 'purchase']);
  const navigation = useNavigation<any>();

  const { id, title, type, symbol, uuid, averagePrice, currentPrice, refreshed_at, count, created_at, invested, share, diffInPercent, diffInValue } =
    asset || {};

  const onAssetRemove = () => {
    navigation.goBack();
    removeAsset(id);
  };

  const createRemoveAssetAlert = () =>
    Alert.alert(t('removeAssetTitle'), t('removeAssetDescription'), [
      {
        text: t('common:cancel')
      },
      { text: t('common:remove'), onPress: onAssetRemove }
    ]);

  const handleAddPurchase = () => {
    clearSuggestedAssets();
    selectSuggestedAsset({
      symbol,
      description: title,
      type
    });
    navigation.navigate(ADD_ASSET_ROUTE);
  };

  const handleRefreshAsset = async () => {
    const response = await loadAsset({ symbol, type, uuid });
    const currentDate = new Date();
    const refreshed = currentDate.getTime();
    updateAsset({ assetId: id, currentPrice: Number(response), refreshed_at: refreshed });
  };

  return id ? (
    <View style={styles.content}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <View style={styles.refreshButton}>
            <AnimatedRefreshButton action={handleRefreshAsset} />
          </View>
        </View>

        <ScrollView style={styles.scrollWrapper} keyboardShouldPersistTaps='handled'>
          <View style={styles.contentWrapper}>
            <View style={styles.left}>
              <View>
                <View style={styles.block}>
                  <Text style={[styles.label, styles.bold]}>{`${t('asset:ticker')}: `}</Text>
                  <Text style={[styles.label, styles.coloredLabel]}>{symbol}</Text>
                </View>
              </View>

              <View>
                <View style={styles.block}>
                  <Text style={[styles.label, styles.bold]}>{`${t('common:invested')}: `}</Text>
                  <Text style={[styles.label, styles.coloredLabel]}>{t('common:price', { price: numberToLocalString(invested) })}</Text>
                </View>
              </View>

              <View>
                <View style={styles.block}>
                  <Text style={[styles.label, styles.bold]}>{`${t('asset:share')}: `}</Text>
                  <Text style={styles.label}>{t('common:percents', { value: numberToLocalString(share) })}</Text>
                </View>
              </View>

              <View>
                <View style={styles.block}>
                  <Text style={[styles.label, styles.bold]}>{`${t('asset:countTitle')}: `}</Text>
                  <Text style={styles.label}>{t('common:count', { value: numberToLocalString(count, 5) })}</Text>
                </View>
              </View>

              <View>
                <View style={styles.block}>
                  <Text style={[styles.label, styles.bold]}>{`${t('asset:averagePrice')}: `}</Text>
                  <Text style={styles.label}>{t('common:price', { price: numberToLocalString(averagePrice || 0, averagePrice < 0.1 ? 5 : 2) })}</Text>
                </View>
              </View>

              <View>
                <View style={styles.block}>
                  <Text style={[styles.label, styles.bold]}>{`${t('asset:marketPrice')}: `}</Text>
                  <Text style={styles.label}>{t('common:price', { price: numberToLocalString(currentPrice || 0, currentPrice < 0.1 ? 5 : 2) })}</Text>
                </View>
              </View>

              <View>
                <View style={styles.block}>
                  <Text style={[styles.label, styles.bold]}>{`${t('common:refreshedAt')}: `}</Text>
                  <Text style={styles.label}>{showRelativeDate(refreshed_at, true)}</Text>
                </View>
              </View>

              <View>
                <View style={styles.block}>
                  <Text style={[styles.label, styles.bold]}>{`${t('common:createdAt')}: `}</Text>
                  <Text style={styles.label}>{showRelativeDate(created_at, true)}</Text>
                </View>
              </View>
            </View>
            <View style={styles.right}>
              <View style={styles.info}>
                <Text style={[styles.label, styles.bold]}>{t('common:profitability')}</Text>
                <Text numberOfLines={1} style={[styles.bold, styles.changeRatePercent, getValueStyle(diffInPercent || 0)]}>
                  {t('common:percents', { value: numberToLocalString(diffInPercent || 0) })}
                </Text>
                <Text numberOfLines={1} style={[styles.changeRatePercent, getValueStyle(diffInValue || 0)]}>
                  {t('common:price', { price: numberToLocalString(diffInValue || 0, diffInValue < 0.1 ? 3 : 2) })}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {sectionedPurchases.length > 0 ? (
          <View style={styles.sectionedList}>
            <View style={[styles.purchaseListHeader, styles.mBottom]}>
              <Text style={[styles.label, styles.bold]}>{t('purchase:purchasesSales')}</Text>
              <Button
                titleStyle={styles.addPurchaseButtonTitle}
                style={styles.addPurchaseButton}
                onPress={handleAddPurchase}
                title={t('common:add')}
              />
            </View>
            <SectionList
              initialNumToRender={30}
              sections={sectionedPurchases}
              renderItem={({ item }) => (
                <View style={styles.purchase}>
                  <View style={styles.createdColumn}>
                    <Text style={styles.purchaseItem}>{new Date(item.created_at).toLocaleTimeString(i18n.language)}</Text>
                  </View>
                  <View style={styles.countColumn}>
                    <Text style={[styles.bold, styles.purchaseItem, item.count > 0 ? styles.increased : styles.decreased]}>
                      {t('common:count', { value: numberToLocalString(item.count, 5) })}
                    </Text>
                  </View>
                  <View style={styles.priceColumn}>
                    <Text style={[styles.bold, styles.purchaseItem, item.count > 0 ? styles.increased : styles.decreased]}>
                      {t('common:price', { price: numberToLocalString(item.price || 0, item.price < 0.1 ? 5 : 2) })}
                    </Text>
                  </View>
                </View>
              )}
              renderSectionHeader={({ section }) => (
                <View style={styles.stickyHeader}>
                  <View style={styles.headerTitle}>
                    <Text style={styles.headerTitleText}>{section.title}</Text>
                  </View>
                  <View style={[styles.purchaseCount, styles.headerTitle]}>
                    <Text style={styles.headerTitleText}>{t('common:count', { value: numberToLocalString(section.count || 0, 5) })}</Text>
                  </View>
                </View>
              )}
              stickySectionHeadersEnabled
            />
          </View>
        ) : null}

        <View style={styles.footerButtonsWrapper}>
          <Button theme={SECONDARY} style={styles.footerButton} onPress={() => navigation.goBack()} title={t('common:back')} />
          <Button theme={SECONDARY} style={styles.footerButton} onPress={createRemoveAssetAlert} title={t('common:remove')} />
        </View>
      </View>
    </View>
  ) : null;
};

export default FullTask;
