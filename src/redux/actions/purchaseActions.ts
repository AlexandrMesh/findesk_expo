import { createAction } from '@reduxjs/toolkit';
import { IPurchase } from '~types/purchase';

const PREFIX = 'PURACHAES';

export const addPurchase = createAction<IPurchase>(`${PREFIX}/ADD_PURCHASE`);
export const removePurchase = createAction<string>(`${PREFIX}/REMOVE_PURCHASE`);
export const removePurchasesFromAsset = createAction<string>(`${PREFIX}/REMOVE_PURCHASES_FROM_ASSET`);
export const removePurchasesFromPortfolio = createAction<string>(`${PREFIX}/REMOVE_PURCHASES_FROM_PORTFOLIO`);
export const removeAllPurchasesFromTheAsset = createAction<string>(`${PREFIX}/REMOVE_ALL_PURCHASES_FROM_THE_ASSET`);
