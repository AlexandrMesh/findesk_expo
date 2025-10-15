import { createReducer } from '@reduxjs/toolkit';
import * as purchaseActions from '~redux/actions/purchaseActions';
import { IPurchase } from '~types/asset';

export interface IPurchasesState {
  data: IPurchase[];
}

export const getDefaultAssetsState = (): IPurchasesState => ({
  data: []
});

const defaultState = getDefaultAssetsState();

export default createReducer(defaultState, (builder) => {
  builder
    .addCase(purchaseActions.addPurchase, (state, action) => {
      state.data = [...state.data, action.payload];
    })
    .addCase(purchaseActions.removePurchase, (state, action) => {
      state.data = state.data.filter(({ id }) => id !== action.payload);
    })
    .addCase(purchaseActions.removePurchasesFromAsset, (state, action) => {
      state.data = state.data.filter(({ assetId }) => assetId !== action.payload);
    })
    .addCase(purchaseActions.removePurchasesFromPortfolio, (state, action) => {
      state.data = state.data.filter(({ portfolioId }) => portfolioId !== action.payload);
    })
    .addCase(purchaseActions.removeAllPurchasesFromTheAsset, (state, action) => {
      state.data = state.data.filter(({ assetId }) => assetId !== action.payload);
    });
});
