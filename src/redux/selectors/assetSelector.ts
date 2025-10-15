import { createSelector } from 'reselect';
import { RootState } from '~redux/store/configureStore';
import { getSelectedPortfolioId } from '~redux/selectors/portfolioSelector';
import i18n from '~translations/i18n';
import { IAsset } from '~types/asset';

type StateWithAssets = Pick<RootState, 'assets'>;

const getAssets = (state: StateWithAssets) => state.assets;
const getAddAsset = (state: StateWithAssets) => getAssets(state).add;

export const getAssetsData = (state: StateWithAssets) => getAssets(state).data;
export const getSuggestedAssets = (state: StateWithAssets) => getAddAsset(state).data;
export const getLoadingSuggestedAssetsStatus = (state: StateWithAssets) => getAddAsset(state).loadingDataStatus;
export const getSuggestedAssetsNoResults = (state: StateWithAssets) => getAddAsset(state).noResults;
export const getSelectedSuggestedAsset = (state: StateWithAssets) => getAddAsset(state).selectedAsset;

export const deriveAssets = createSelector(
  [getAssetsData, getSelectedPortfolioId],
  (assets, selectedPortfolioId) =>
    assets.filter(({ portfolioId, language }) => portfolioId === selectedPortfolioId && language === i18n.language) as IAsset[]
);
export const deriveAssetSymbols = createSelector([deriveAssets], (data) => data.map(({ id, symbol, type, uuid }) => ({ id, symbol, type, uuid })));
