import { createReducer } from '@reduxjs/toolkit';
import { PENDING, SUCCEEDED, IDLE, FAILED } from '~constants/loadingStatuses';
import * as assetActions from '~redux/actions/assetActions';
import { IAsset, ISuggestedAsset } from '~types/asset';
import { LoadingType } from '~types/loading';

export interface IAddAssetState {
  data: ISuggestedAsset[];
  selectedAsset: ISuggestedAsset;
  noResults: boolean;
  loadingDataStatus: LoadingType;
}

export interface IAssetsState {
  data: IAsset[];
  add: IAddAssetState;
}

const getDefaultAddAssetState = (): IAddAssetState => ({
  data: [],
  selectedAsset: {
    description: '',
    symbol: '',
    type: ''
  },
  noResults: false,
  loadingDataStatus: IDLE
});

export const getDefaultAssetsState = (): IAssetsState => ({
  data: [],
  add: getDefaultAddAssetState()
});

const defaultState = getDefaultAssetsState();

export default createReducer(defaultState, (builder) => {
  builder
    .addCase(assetActions.addAsset, (state, action) => {
      state.data = [...state.data, action.payload];
    })
    .addCase(assetActions.removeAsset, (state, action) => {
      state.data = state.data.filter(({ id }) => id !== action.payload);
    })
    .addCase(assetActions.updateAsset, (state, { payload: { assetId, currentPrice, refreshed_at } }) => {
      state.data = state.data.map((item) => (item.id === assetId ? { ...item, currentPrice, refreshed_at } : item));
    })
    .addCase(assetActions.removeAllAssetsFromThePortfolio, (state, action) => {
      state.data = state.data.filter(({ portfolioId }) => portfolioId !== action.payload);
    })
    .addCase(assetActions.searchAssets.pending, (state) => {
      state.add.loadingDataStatus = PENDING;
    })
    .addCase(assetActions.searchAssets.fulfilled, (state, action) => {
      state.add.data = action.payload?.data;
      state.add.noResults = action.payload?.noResults || false;
      state.add.loadingDataStatus = SUCCEEDED;
    })
    .addCase(assetActions.searchAssets.rejected, (state) => {
      state.add.loadingDataStatus = FAILED;
      state.add.noResults = false;
    })
    .addCase(assetActions.selectSuggestedAsset, (state, action) => {
      state.add.selectedAsset = action.payload;
    })
    .addCase(assetActions.clearSuggestedAssets, (state) => {
      state.add.data = [];
      state.add.noResults = false;
    });
});
