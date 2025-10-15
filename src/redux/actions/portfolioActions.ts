import { createAction } from '@reduxjs/toolkit';
import { IPortfolio } from '~types/portfolio';

const PREFIX = 'PORTFOLIO';

export const addPortfolio = createAction<IPortfolio>(`${PREFIX}/ADD_PORTFOLIO`);
export const selectPortfolioId = createAction<string>(`${PREFIX}/SELECT_PORTFOLIO_ID`);
export const selectDefaultPortfolio = createAction<string>(`${PREFIX}/SELECT_DEFAULT_PORTFOLIO`);
export const removePortfolio = createAction<string>(`${PREFIX}/REMOVE_PORTFOLIO`);
export const updatePortfolioTitle = createAction<{ id: string; title: string }>(`${PREFIX}/UPDATE_PORTFOLIO_TITLE`);
export const updatePortfolioLastRefreshedData = createAction<{ id: string; refreshed_at: number }>(`${PREFIX}/UPDATE_PORTFOLIO_LAST_REFRESHED_DATA`);
