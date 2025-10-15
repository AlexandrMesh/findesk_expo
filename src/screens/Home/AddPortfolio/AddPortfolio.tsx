import 'react-native-get-random-values';
import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import i18n from '~translations/i18n';
import Input from '~UI/TextInput';
import Button from '~UI/Button';
import { getValidationFailure, validationTypes } from '~utils/validation';
import { IPortfolio } from '~types/portfolio';
import { SECONDARY } from '~constants/themes';
import { TITLE_MAX_LENGTH } from '~constants/portfolio';
import styles from './styles';

type AddPortfolioProps = {
  addPortfolio: (params: IPortfolio) => unknown;
  selectPortfolioId: (id: string) => unknown;
  portfolioData: IPortfolio[];
};

const AddPortfolio = ({ addPortfolio, selectPortfolioId, portfolioData }: AddPortfolioProps) => {
  const { t } = useTranslation(['portfolio', 'common', 'errors']);

  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const navigation = useNavigation<any>();

  const validateTitle = () => {
    const params = {
      minLength: 2,
      maxLength: TITLE_MAX_LENGTH
    };
    const portfolioExists = portfolioData.some((item) => item.title.toLocaleLowerCase() === title.trim().toLocaleLowerCase())
      ? 'portfolioExists'
      : null;
    const error = getValidationFailure(title.trim(), [validationTypes.isTooShort, validationTypes.isTooLong], params) || portfolioExists;
    setTitleError(error ? t(`errors:${error}`, params) : '');
    return !error;
  };

  const handleAddList = () => {
    const isValid = validateTitle();
    if (isValid) {
      const currentDate = new Date();
      const created_at = currentDate.getTime();
      const portfolioId = uuidv4();
      addPortfolio({
        id: portfolioId,
        title: title.trim(),
        created_at,
        refreshed_at: created_at,
        language: i18n.language
      });
      selectPortfolioId(portfolioId);
      navigation.goBack();
    }
  };

  const handleChangeTitle = (value: string) => {
    setTitleError('');
    setTitle(value);
  };

  const handleClearTitle = () => {
    setTitleError('');
    setTitle('');
  };

  return (
    <View style={styles.content}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('portfolio:newPortfolio')}</Text>
        </View>

        <ScrollView style={styles.scrollWrapper} keyboardShouldPersistTaps='handled'>
          <View style={styles.block}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>
                {t('portfolio:portfolioTitle')} {t('common:required')}
              </Text>
              <Text style={styles.inputLabel}>{`${title.trim().length}/${TITLE_MAX_LENGTH}`}</Text>
            </View>

            <Input
              placeholder={t('enterPortfolioTitle')}
              onChangeText={handleChangeTitle}
              value={title}
              shouldDisplayClearButton={title.length > 0}
              error={titleError}
              onClear={handleClearTitle}
            />
          </View>
        </ScrollView>
        <View style={styles.footerButtonsWrapper}>
          <Button theme={SECONDARY} style={styles.footerButton} onPress={() => navigation.goBack()} title={t('common:back')} />
          <Button style={styles.footerButton} onPress={handleAddList} title={t('common:add')} />
        </View>
      </View>
    </View>
  );
};

export default AddPortfolio;
