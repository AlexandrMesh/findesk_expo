/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Button from '~UI/Button';
import SlideMenu from '~UI/SlideMenu';
import { IPortfolio } from '~types/portfolio';
import { ADD_PORTFOLIO_ROUTE } from '~constants/routes';
import Item from './Item';
import styles from './styles';

type PortfolioModalProps = {
  isVisible: boolean;
  portfolios: IPortfolio[];
  hideModal: () => unknown;
  selectedPortfolio: IPortfolio;
  selectPortfolioId: (id: string) => unknown;
  removePortfolio: (listId: string) => unknown;
};

const PortfolioModal = ({ isVisible, portfolios, hideModal, selectedPortfolio, selectPortfolioId, removePortfolio }: PortfolioModalProps) => {
  const { t } = useTranslation(['portfolio', 'common']);
  const navigation = useNavigation<any>();
  const [newPortfolioId, setNewPortfolioId] = useState<string>(selectedPortfolio?.id);
  const [shouldAutoClose, setShouldAutoClose] = useState<boolean>(false);

  const actionTypes = portfolios.map(({ id, title }) => ({ id, title, isSelected: newPortfolioId === id, action: () => setNewPortfolioId(id) }));

  useEffect(() => {
    if (shouldAutoClose) {
      setShouldAutoClose(false);
    }
  }, [shouldAutoClose]);

  // Проверить чтобы не было 2 вызовы
  useEffect(() => {
    if (isVisible) {
      setNewPortfolioId(selectedPortfolio?.id);
    }
  }, [isVisible, selectedPortfolio?.id]);

  const handleClose = () => {
    hideModal();
  };

  const handleUpdate = () => {
    selectPortfolioId(newPortfolioId);
    setShouldAutoClose(true);
  };

  const handlePressAddPortfolioButton = () => {
    setShouldAutoClose(true);
    navigation.navigate(ADD_PORTFOLIO_ROUTE);
  };

  return (
    <SlideMenu
      onPressHeaderButton={handlePressAddPortfolioButton}
      headerButtonTitle={t('common:create')}
      isVisible={isVisible}
      title={t('portfolio:choosePortfolio')}
      onClose={handleClose}
      shouldAutoClose={shouldAutoClose}
    >
      <FlatList
        data={actionTypes}
        renderItem={({ item }) => (
          <Item id={item.id} title={item.title} onRemove={() => removePortfolio(item.id)} isSelected={item.isSelected} action={item.action} />
        )}
        keyExtractor={({ id }) => id}
      />
      <View style={styles.submitButtonWrapper}>
        <Button style={styles.submitButton} title={t('common:choose')} onPress={handleUpdate} />
      </View>
    </SlideMenu>
  );
};

export default PortfolioModal;
