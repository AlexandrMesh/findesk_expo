/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SEARCH_ASSET_URL, SEARCH_QUOTE_URL, SEARCH_COIN_QUOTE_URL, SEARCH_CRYPTOCURRENCY_URL, TOKEN, COINS_TOKEN } from '~constants/config';
import { IAsset, ISuggestedAsset } from '~types/asset';
import { updatePortfolioLastRefreshedData } from '~redux/actions/portfolioActions';
import { deriveAssetSymbols } from '~redux/selectors/assetSelector';
import { getSelectedPortfolioId } from '~redux/selectors/portfolioSelector';
import { CRYPTOCURRENCY, STOCK } from '~constants/assets';

const PREFIX = 'ASSET';

export const addAsset = createAction<IAsset>(`${PREFIX}/ADD_ASSET`);
export const removeAsset = createAction<string>(`${PREFIX}/REMOVE_ASSET`);
export const removeAllAssetsFromThePortfolio = createAction<string>(`${PREFIX}/REMOVE_ALL_ASSETS_FROM_THE_PORTFOLIO`);
export const clearSuggestedAssets = createAction(`${PREFIX}/CLEAR_SUGGESTED_ASSETS`);
export const selectSuggestedAsset = createAction<ISuggestedAsset>(`${PREFIX}/SELECT_SUGGESTED_ASSET`);
export const updateAsset = createAction<{ assetId: string; currentPrice: number; refreshed_at: number }>(`${PREFIX}/UPDATE_ASSET`);
export const updateLastDataRefreshed = createAction<number>(`${PREFIX}/UPDATE_LAST_DATA_REFRESHED`);

export const loadAsset = createAsyncThunk(
  `${PREFIX}/loadAsset`,
  async (params: { symbol: string; uuid?: string; type: typeof STOCK | typeof CRYPTOCURRENCY }) => {
    const { symbol, type, uuid } = params;
    const response = {
      price: 0
    };
    try {
      if (type === CRYPTOCURRENCY) {
        const { data } = await axios({
          method: 'get',
          url: `${SEARCH_COIN_QUOTE_URL}/${uuid}`,
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': COINS_TOKEN
          }
        });
        response.price = data?.data?.coin?.price;
      } else {
        const { data } = await axios({
          method: 'get',
          url: SEARCH_QUOTE_URL,
          params: {
            symbol,
            token: TOKEN
          }
        });
        response.price = data.c;
      }
      return response.price || 0;
    } catch (err) {
      console.error(err);
    }
  }
);

export const loadAssets = createAsyncThunk(`${PREFIX}/loadAssets`, async (_, { dispatch, getState }: any) => {
  const state = getState();
  const symbols = deriveAssetSymbols(state);
  const selectedPortfolioId = getSelectedPortfolioId(state);
  try {
    await Promise.all(
      symbols.map(async ({ id, symbol, type, uuid }) => {
        const result = await dispatch(loadAsset({ symbol, type, uuid })).unwrap();
        const currentDate = new Date();
        const refreshed_at = currentDate.getTime();
        dispatch(updateAsset({ assetId: id, currentPrice: Number(result), refreshed_at }));
        return result;
      })
    );
    const currentDate = new Date();
    const refreshed_at = currentDate.getTime();
    dispatch(updatePortfolioLastRefreshedData({ id: selectedPortfolioId, refreshed_at }));
  } catch (err) {
    console.error(err);
  }
});

export const searchAssets = createAsyncThunk(
  `${PREFIX}/searchAssets`,
  async (params: { query: string; type: typeof STOCK | typeof CRYPTOCURRENCY }, { dispatch }) => {
    const { query, type } = params;
    dispatch(clearSuggestedAssets());
    try {
      if (type === CRYPTOCURRENCY) {
        const { data } = await axios({
          method: 'get',
          url: SEARCH_CRYPTOCURRENCY_URL,
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': COINS_TOKEN
          },
          params: {
            search: query
          }
        });
        const results = data.data?.coins?.map((item: { symbol: string; name: string; price: string; uuid: string }) => ({
          uuid: item.uuid,
          symbol: item.symbol,
          description: item.name,
          price: item.price,
          type
        }));
        return {
          data: results,
          noResults: results.length === 0 || false
        };
      } else {
        const { data } = await axios({
          method: 'get',
          url: SEARCH_ASSET_URL,
          params: {
            q: query,
            token: TOKEN
          }
        });
        const results = (data?.result?.filter(({ symbol }: { symbol: string }) => !symbol.includes('.')) || []).map(
          (item: { description: string; symbol: string }) => ({
            description: item.description,
            symbol: item.symbol,
            type
          })
        );
        return {
          // filter only US market values
          data: results,
          noResults: results?.length === 0 || false
        };
      }
    } catch (err) {
      console.error(err);
    }
  }
);
