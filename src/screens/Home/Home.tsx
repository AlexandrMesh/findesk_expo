import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import showRelativeDate from '~utils/relativeDate';
import { Spinner } from '~UI/Spinner';
import { IPortfolio } from '~types/portfolio';
import numberToLocalString from '~utils/numberToLocalString';
import AnimatedRefreshButton from '~UI/AnimatedRefreshButton';
import { IAsset } from '~types/asset';
import All from './Assets/All';
import styles from './styles';

type HomeProps = {
  assets: IAsset[];
  selectedPortfolio: IPortfolio;
  showPortfolioModal: () => unknown;
  loadAssets: () => unknown;
  portfolioCost: number;
  profitValue: number;
  profitValueInPercents: number;
};

const getValueStyle = (value: number) => (value >= 0 ? styles.increased : styles.decreased);

const Home = ({ assets, selectedPortfolio, showPortfolioModal, portfolioCost, profitValue, profitValueInPercents, loadAssets }: HomeProps) => {
  const { t } = useTranslation(['common', 'portfolio']);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRefreshAssets = useCallback(async () => await loadAssets(), [loadAssets]);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        await handleRefreshAssets();
      } finally {
        setIsLoading(false);
      }
    }
    if (assets.length > 0 || selectedPortfolio?.id) {
      loadData();
    }
  }, [handleRefreshAssets, assets.length, selectedPortfolio.id]);

  return (
    <View style={styles.wrapper}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <View style={styles.header}>
            <View style={styles.titleWrapper}>
              <View style={styles.titleClickableAreaWrapper}>
                <View style={styles.titleClickableArea}>
                  <TouchableHighlight onPress={showPortfolioModal}>
                    <Text numberOfLines={1} style={styles.title}>
                      {selectedPortfolio?.title}
                    </Text>
                  </TouchableHighlight>
                </View>
                <Text style={styles.date}>{t('portfolio:createdAt', { created_at: showRelativeDate(selectedPortfolio.created_at) })}</Text>
              </View>
              {assets.length > 0 ? <AnimatedRefreshButton action={handleRefreshAssets} style={styles.refreshButton} /> : null}
            </View>
            {assets.length > 0 ? (
              <View style={styles.portfolioResult}>
                <View>
                  <Text numberOfLines={1} style={styles.portfolioPrice}>
                    {t('invested')}
                  </Text>
                  <Text numberOfLines={1} style={[styles.portfolioPrice, styles.marketPortfolioPrice]}>
                    {t('price', { price: numberToLocalString(portfolioCost) })}
                  </Text>
                </View>
                <View style={styles.differences}>
                  <Text numberOfLines={1} style={styles.portfolioPrice}>
                    {t('profitability')}
                  </Text>
                  <Text numberOfLines={1} style={[styles.changeRatePercent, getValueStyle(profitValueInPercents)]}>
                    {t('percents', { value: numberToLocalString(profitValueInPercents) })}
                  </Text>
                  <Text numberOfLines={1} style={[styles.changeRateValue, getValueStyle(profitValue)]}>
                    {t('price', { price: numberToLocalString(profitValue) })}
                  </Text>
                  {selectedPortfolio?.refreshed_at ? (
                    <View style={styles.lastRefreshed}>
                      <Text style={styles.date}>{showRelativeDate(selectedPortfolio?.refreshed_at, true)}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            ) : null}
          </View>

          <All />
        </>
      )}
    </View>
  );
};

export default Home;
