import { createReducer } from '@reduxjs/toolkit';
import * as portfolioActions from '~redux/actions/portfolioActions';
import i18n from '~translations/i18n';
import { DEFAULT_PORTFOLIO_ID } from '~constants/portfolio';
import { EN, RU } from '~constants/languages';
import { IPortfolio } from '~types/portfolio';

export interface IPortfolioState {
  selectedPortfolioId: string;
  data: IPortfolio[];
}

const currentDate = new Date();
const created_at = currentDate.getTime();

export const getDefaultPortfolioState = (): IPortfolioState => ({
  selectedPortfolioId: DEFAULT_PORTFOLIO_ID,
  data: [
    { id: DEFAULT_PORTFOLIO_ID, title: 'Мой портфель', language: RU, created_at, refreshed_at: 0 },
    { id: DEFAULT_PORTFOLIO_ID, title: 'My portfolio', language: EN, created_at, refreshed_at: 0 }
  ]
});

const defaultState = getDefaultPortfolioState();

export default createReducer(defaultState, (builder) => {
  builder
    .addCase(portfolioActions.addPortfolio, (state, action) => {
      state.data = [...state.data, action.payload];
    })
    .addCase(portfolioActions.selectPortfolioId, (state, action) => {
      state.selectedPortfolioId = action.payload;
    })
    .addCase(portfolioActions.selectDefaultPortfolio, (state, action) => {
      state.selectedPortfolioId =
        state.selectedPortfolioId === action.payload ? getDefaultPortfolioState().selectedPortfolioId : state.selectedPortfolioId;
    })
    .addCase(portfolioActions.removePortfolio, (state, action) => {
      state.data = state.data.filter(({ id }) => id !== action.payload);
    })
    .addCase(portfolioActions.updatePortfolioTitle, (state, { payload: { id, title } }) => {
      state.data = state.data.map((portfolio: IPortfolio) =>
        portfolio.language === i18n.language && portfolio.id === id ? { ...portfolio, title } : portfolio
      );
    })
    .addCase(portfolioActions.updatePortfolioLastRefreshedData, (state, { payload: { id, refreshed_at } }) => {
      state.data = state.data.map((portfolio: IPortfolio) =>
        portfolio.language === i18n.language && portfolio.id === id ? { ...portfolio, refreshed_at } : portfolio
      );
    });
});
