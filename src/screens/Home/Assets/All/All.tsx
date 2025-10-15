import React, { memo } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IAsset } from '~types/asset';
import AddAssetButton from '~screens/Home/AddAssetButton';
import { ADD_ASSET_ROUTE } from '~constants/routes';
import EmptyList from './EmptyList';
import Asset from './Asset';
import styles from './styles';

type AllProps = {
  assets: IAsset[];
  assetData: IAsset[];
  clearSelectedAsset: () => unknown;
};

const All = ({ assets, assetData, clearSelectedAsset }: AllProps) => {
  const navigation = useNavigation<any>();

  const handleAddAsset = () => {
    clearSelectedAsset();
    navigation.navigate(ADD_ASSET_ROUTE);
  };

  return (
    <View style={styles.wrapper}>
      {assets.length > 0 ? (
        <FlatList
          keyboardShouldPersistTaps='handled'
          data={assetData}
          renderItem={({ item }) => <Asset item={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <EmptyList />
      )}
      <AddAssetButton onPress={handleAddAsset} />
    </View>
  );
};

export default memo(All);
