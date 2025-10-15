import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, FlatList, TouchableHighlight } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '~UI/Button';
import SlideMenu from '~UI/SlideMenu';
import Input from '~UI/TextInput';
import { Spinner } from '~UI/Spinner';
import SearchIcon from '~assets/search.svg';
import { ISuggestedAsset } from '~types/asset';
import { LoadingType } from '~types/loading';
import { PENDING } from '~constants/loadingStatuses';
import { CRYPTOCURRENCY, STOCK } from '~constants/assets';
import RadioButton from '~UI/RadioButton';
import colors from '~styles/colors';
import Item from './Item';
import styles from './styles';

type PortfolioModalProps = {
  isVisible: boolean;
  suggestedAssetsNoResults: boolean;
  suggestedAssets: ISuggestedAsset[];
  selectedSuggestedAsset: ISuggestedAsset;
  selectSuggestedAsset: (asset: ISuggestedAsset) => unknown;
  hideModal: () => unknown;
  searchAssets: (params: { query: string; type: typeof STOCK | typeof CRYPTOCURRENCY }) => unknown;
  clearSuggestedAssets: () => unknown;
  loadingSuggestedAssetsStatus: LoadingType;
};

const PortfolioModal = ({
  isVisible,
  hideModal,
  suggestedAssets,
  searchAssets,
  clearSuggestedAssets,
  loadingSuggestedAssetsStatus,
  suggestedAssetsNoResults,
  selectSuggestedAsset
}: PortfolioModalProps) => {
  const { t } = useTranslation(['asset', 'common']);
  const [shouldAutoClose, setShouldAutoClose] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<ISuggestedAsset | undefined>(undefined);
  const [type, setType] = useState<typeof STOCK | typeof CRYPTOCURRENCY>(STOCK);

  const changeAssetType = (assetType: typeof STOCK | typeof CRYPTOCURRENCY) => {
    setSearchQuery('');
    clearSuggestedAssets();
    setType(assetType);
  };

  const types = [
    {
      type: STOCK,
      action: () => changeAssetType(STOCK)
    },
    {
      type: CRYPTOCURRENCY,
      action: () => changeAssetType(CRYPTOCURRENCY)
    }
  ];

  const isLoadingResults = loadingSuggestedAssetsStatus === PENDING;

  useEffect(() => {
    if (shouldAutoClose) {
      setShouldAutoClose(false);
    }
  }, [shouldAutoClose]);

  useEffect(() => {
    if (isVisible) {
      setSearchQuery('');
      setSelectedAsset(undefined);
      clearSuggestedAssets();
      setType(STOCK);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const handleClose = () => {
    hideModal();
  };

  const handleUpdate = () => {
    selectSuggestedAsset(selectedAsset as ISuggestedAsset);
    setShouldAutoClose(true);
  };

  const clearSearchQuery = () => {
    setSelectedAsset(undefined);
    clearSuggestedAssets();
    setSearchQuery('');
  };

  const handleSearchAsset = () => {
    if (loadingSuggestedAssetsStatus === PENDING) {
      return false;
    }
    searchAssets({ query: searchQuery.trim(), type });
    setSelectedAsset(undefined);
    clearSuggestedAssets();
  };

  const emptySearchResult = () =>
    suggestedAssetsNoResults ? (
      <View style={styles.emptyResult}>
        <Text style={styles.emptyLabel}>{t('noAssets')}</Text>
      </View>
    ) : null;

  const renderSuggestedAssets = () => {
    return (
      <FlatList
        keyboardShouldPersistTaps='handled'
        data={suggestedAssets}
        renderItem={({ item }) => (
          <Item
            title={item.description}
            subTitle={item.symbol}
            isSelected={selectedAsset?.symbol === item.symbol}
            action={() => setSelectedAsset(item)}
          />
        )}
        keyExtractor={(item) => item.uuid || item.symbol}
      />
    );
  };

  const disabledSearchButton = !searchQuery || isLoadingResults;

  return (
    <SlideMenu isVisible={isVisible} menuHeight={440} title={t('asset:chooseAsset')} onClose={handleClose} shouldAutoClose={shouldAutoClose}>
      <View style={styles.wrapper}>
        <View style={styles.typesWrapper}>
          {types.map((item) => (
            <Pressable disabled={isLoadingResults} key={item.type} style={styles.radioMenuItem} onPress={item.action}>
              <RadioButton isSelected={type === item.type} />
              <View style={styles.labelWrapper}>
                <Text numberOfLines={1} style={styles.menuItemTitle}>
                  {t(`asset:${item.type}`)}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
        <View style={styles.searchAssetInputWrapper}>
          <Input
            wrapperClassName={styles.assetInputWrapper}
            placeholder={t(type === CRYPTOCURRENCY ? 'asset:enterCryptocurrencyTitle' : 'asset:enterAssetTitle')}
            onChangeText={setSearchQuery}
            value={searchQuery}
            validateable={false}
            shouldDisplayClearButton={!!searchQuery && loadingSuggestedAssetsStatus !== PENDING}
            onClear={clearSearchQuery}
            disabled={isLoadingResults}
          />
          <TouchableHighlight
            onPress={handleSearchAsset}
            disabled={disabledSearchButton}
            style={[styles.searchButton, disabledSearchButton ? styles.disabledSearchButton : null]}
          >
            <SearchIcon fill={colors.neutral_light} width={26} height={26} />
          </TouchableHighlight>
        </View>
        <View style={styles.content}>
          {isLoadingResults ? <Spinner /> : null}
          {suggestedAssets.length > 0 ? renderSuggestedAssets() : emptySearchResult()}
        </View>
        <View style={styles.submitButtonWrapper}>
          <Button disabled={!selectedAsset?.symbol} style={styles.submitButton} title={t('common:choose')} onPress={handleUpdate} />
        </View>
      </View>
    </SlideMenu>
  );
};

export default PortfolioModal;
