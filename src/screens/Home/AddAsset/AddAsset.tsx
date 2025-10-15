/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { View, Alert, Pressable, ScrollView, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import DatePicker from 'react-native-date-picker';
import i18n from '~translations/i18n';
import Input from '~UI/TextInput';
import Button from '~UI/Button';
import RadioButton from '~UI/RadioButton';
import { getValidationFailure, validationTypes } from '~utils/validation';
import parseNumber from '~utils/parseNumber';
import { IAsset, IPurchase, ISuggestedAsset } from '~types/asset';
import { SECONDARY } from '~constants/themes';
import Spinner from '~UI/Spinner/Spinner';
import { IPortfolio } from '~types/portfolio';
import { showLocalDate } from '~utils/relativeDate';
import numberToLocalString from '~utils/numberToLocalString';
import { HOME_ROUTE } from '~constants/routes';
import { COUNT_MAX_LENGTH, MAX_ADDED_ASSETS_COUNT, PRICE_MAX_LENGTH, PURCHASE_TYPE, SELLING_TYPE } from '~constants/assets';
import styles from './styles';

type AddAssetProps = {
  addAsset: (params: IAsset) => unknown;
  addPurchase: (params: IPurchase) => unknown;
  removeAsset: (assetId: string) => unknown;
  showAssetModal: () => unknown;
  selectedPortfolio: IPortfolio;
  selectedAsset: ISuggestedAsset;
  existingAsset: IAsset;
  assetsLength: number;
};

const AddAsset = ({
  addAsset,
  addPurchase,
  removeAsset,
  assetsLength,
  selectedPortfolio,
  selectedAsset,
  existingAsset,
  showAssetModal
}: AddAssetProps) => {
  const { t } = useTranslation(['asset', 'common', 'errors']);

  const [isAssetAdding, setIsAssetAdding] = useState(false);
  const [type, setType] = useState<typeof PURCHASE_TYPE | typeof SELLING_TYPE>(PURCHASE_TYPE);
  const [price, setPrice] = useState<string>('');
  const [priceError, setPriceError] = useState<string>('');
  const [count, setCount] = useState<string>('');
  const [countError, setCountError] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const onAssetRemove = () => {
    removeAsset(existingAsset?.id);
    navigation.navigate(HOME_ROUTE);
  };

  const createRemoveAssetAlert = () =>
    Alert.alert(t('removeZeroAssetTitle'), t('removeZeroAssetDescription'), [
      {
        text: t('common:cancel')
      },
      { text: t('common:continue'), onPress: onAssetRemove }
    ]);

  const types = [
    { type: PURCHASE_TYPE, action: () => setType(PURCHASE_TYPE) },
    { type: SELLING_TYPE, action: () => setType(SELLING_TYPE) }
  ];

  const showDatePicker = () => setOpenDatePicker(true);

  const hideDatePicker = () => setOpenDatePicker(false);

  const validatePrice = () => {
    const params = {
      minLength: 1,
      maxLength: PRICE_MAX_LENGTH
    };
    const error = getValidationFailure(
      price.trim(),
      [validationTypes.isTooShort, validationTypes.mustMoreThanZero, validationTypes.isTooLong, validationTypes.mustContainOnlyPositiveNumbers],
      params
    );
    setPriceError(error ? t(`errors:${error}`, params) : '');
    return !error;
  };

  const validateCount = () => {
    const countWeHave = existingAsset?.count || 0;
    const params = {
      minLength: 1,
      maxLength: COUNT_MAX_LENGTH,
      value: countWeHave
    };
    const zeroError = countWeHave - Number(count.trim()) >= 0 ? null : 'mustBeLessThan';
    const error =
      getValidationFailure(
        count.trim(),
        [validationTypes.isTooShort, validationTypes.mustMoreThanZero, validationTypes.isTooLong, validationTypes.mustContainOnlyPositiveNumbers],
        params
      ) ||
      (type === SELLING_TYPE && zeroError);
    setCountError(error ? t(`errors:${error}`, params) : '');
    return !error;
  };

  const handleAddAsset = () => {
    const isValid = validateCount() && validatePrice();
    if (isValid) {
      const countWeHave = existingAsset?.count || 0;
      if (type === SELLING_TYPE && countWeHave - Number(count.trim()) <= 0) {
        createRemoveAssetAlert();
        return true;
      }
      setIsAssetAdding(true);
      const created_at = date.getTime();
      const refreshed_at = new Date().getTime();
      const assetId = uuidv4();
      const purchaseId = uuidv4();
      if (!existingAsset) {
        addAsset({
          id: assetId,
          title: selectedAsset?.description || '',
          symbol: selectedAsset?.symbol || '',
          type: selectedAsset?.type,
          uuid: selectedAsset?.uuid || '',
          currentPrice: 0,
          created_at,
          refreshed_at,
          portfolioId: selectedPortfolio?.id || '',
          language: i18n.language,
          averagePrice: 0,
          diffInPercent: 0,
          diffInValue: 0,
          invested: 0,
          share: 0,
          count: 0
        });
      }
      addPurchase({
        id: purchaseId,
        assetId: !existingAsset ? assetId : existingAsset.id,
        portfolioId: selectedPortfolio?.id || '',
        count: type === PURCHASE_TYPE ? parseNumber(count) : -parseNumber(count),
        price: parseNumber(price),
        created_at,
        language: i18n.language
      });
      navigation.goBack();
      setIsAssetAdding(false);
    }
  };

  const handleChangePrice = (value: string) => {
    setPriceError('');
    setPrice(value);
  };

  const handleClearPrice = () => {
    setPriceError('');
    setPrice('');
  };

  const handleChangeCount = (value: string) => {
    setCountError('');
    setCount(value);
  };

  const handleClearCount = () => {
    setCountError('');
    setCount('');
  };

  if (assetsLength >= MAX_ADDED_ASSETS_COUNT) {
    return (
      <View style={styles.content}>
        <View style={styles.wrapper}>
          <View style={styles.warning}>
            <View>
              <Text style={styles.h2}>{t('notAllowedToAddNewAssetTitle')}</Text>
              <Text style={styles.h2}>{t('maxAddedAssetsCount', { maxValue: MAX_ADDED_ASSETS_COUNT })}</Text>
            </View>
          </View>
          <View style={styles.footerButtonsWrapper}>
            <Button
              disabled={isAssetAdding}
              theme={SECONDARY}
              style={styles.footerButton}
              onPress={() => navigation.goBack()}
              title={t('common:back')}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('asset:newAsset')}</Text>
          <Text numberOfLines={1} style={styles.subTitle}>
            {t('common:in')} {selectedPortfolio?.title}
          </Text>
        </View>

        {isAssetAdding ? (
          <View style={styles.scrollWrapper}>
            <Spinner />
          </View>
        ) : (
          <ScrollView style={styles.scrollWrapper} keyboardShouldPersistTaps='handled'>
            <View style={styles.scrollContent}>
              <View>
                <Text style={styles.h2}>
                  {t('asset:asset')}
                  {t('common:required')}
                </Text>
                <View style={styles.blockWrapper}>
                  <Pressable style={[styles.inputBlockWrapper, selectedAsset?.symbol ? styles.activeInputWrapper : null]} onPress={showAssetModal}>
                    {selectedAsset?.description ? (
                      <Text numberOfLines={2} style={[styles.inputLabel, selectedAsset?.symbol ? styles.activeInputLabel : null]}>
                        <View style={styles.labelWrapper}>
                          <Text numberOfLines={1} style={styles.menuItemTitle}>
                            {selectedAsset?.description}
                          </Text>
                          <Text numberOfLines={1} style={styles.menuItemSubTitle}>
                            {selectedAsset?.symbol}
                          </Text>
                        </View>
                      </Text>
                    ) : (
                      <Text numberOfLines={1} style={[styles.inputLabel, selectedAsset?.symbol ? styles.activeInputLabel : null]}>
                        {t('asset:chooseAsset')}
                      </Text>
                    )}
                  </Pressable>
                  <Button style={styles.mainButton} onPress={showAssetModal} title={t('common:choose')} />
                </View>
              </View>

              <View style={styles.block}>
                <View>
                  {types.map((item) => (
                    <Pressable key={item.type} style={styles.radioMenuItem} onPress={item.action}>
                      <View style={styles.labelWrapper}>
                        <Text numberOfLines={1} style={styles.menuItemTitle}>
                          {t(`asset:${item.type}`)}
                        </Text>
                      </View>
                      <RadioButton isSelected={type === item.type} />
                    </Pressable>
                  ))}
                </View>
              </View>

              <View style={styles.block}>
                <View style={styles.headerBlock}>
                  <Text style={styles.h2}>
                    {t('asset:countTitle')}
                    {t('common:required')}
                  </Text>
                  {existingAsset?.count ? (
                    <Text style={styles.h2}>{t('common:count', { value: numberToLocalString(existingAsset.count, 5) })}</Text>
                  ) : null}
                </View>

                <Input
                  placeholder={t('asset:enterCountTitle')}
                  onChangeText={handleChangeCount}
                  value={count}
                  error={countError}
                  shouldDisplayClearButton={!!count}
                  onClear={handleClearCount}
                  inputMode='numeric'
                />
              </View>

              <View>
                <Text style={styles.h2}>
                  {t('asset:priceTitle')}
                  {t('common:required')}
                </Text>
                <Input
                  placeholder={t('asset:enterPriceTitle')}
                  onChangeText={handleChangePrice}
                  value={price}
                  error={priceError}
                  shouldDisplayClearButton={!!price}
                  onClear={handleClearPrice}
                  inputMode='numeric'
                />
              </View>

              <View style={styles.bottomBlock}>
                <Text style={styles.h2}>{t('asset:dateTitle')}</Text>
                <View style={styles.blockWrapper}>
                  <Pressable style={[styles.inputBlockWrapper, selectedAsset?.symbol ? styles.activeInputWrapper : null]} onPress={showDatePicker}>
                    <Text numberOfLines={1} style={[styles.inputLabel, selectedAsset?.symbol ? styles.activeInputLabel : null]}>
                      {showLocalDate(date)}
                    </Text>
                  </Pressable>
                  <Button style={styles.mainButton} onPress={showDatePicker} title={t('common:choose')} />
                </View>
                <DatePicker
                  modal
                  theme='dark'
                  mode='date'
                  title={t('common:selectDate')}
                  confirmText={t('common:confirm')}
                  cancelText={t('common:cancel')}
                  open={openDatePicker}
                  date={date}
                  onConfirm={(selectedDate) => {
                    hideDatePicker();
                    setDate(selectedDate);
                  }}
                  onCancel={hideDatePicker}
                />
              </View>
            </View>
          </ScrollView>
        )}

        <View style={styles.footerButtonsWrapper}>
          <Button
            disabled={isAssetAdding}
            theme={SECONDARY}
            style={styles.footerButton}
            onPress={() => navigation.goBack()}
            title={t('common:back')}
          />
          <Button disabled={isAssetAdding || !selectedAsset?.symbol} style={styles.footerButton} onPress={handleAddAsset} title={t('common:add')} />
        </View>
      </View>
    </View>
  );
};

export default AddAsset;
