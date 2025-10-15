import { createSelector } from 'reselect';
import { DEFAULT_PORTFOLIO_ID } from '~constants/portfolio';
import { RootState } from '~redux/store/configureStore';
import i18n from '~translations/i18n';
import { IPortfolio } from '~types/portfolio';

type StateWithPortfolio = Pick<RootState, 'portfolio'>;

const getPortfolio = (state: StateWithPortfolio) => state.portfolio;

export const getPortfolioData = (state: StateWithPortfolio) => getPortfolio(state).data;
export const getSelectedPortfolioId = (state: StateWithPortfolio) => getPortfolio(state).selectedPortfolioId;

export const derivePortfolioData = createSelector([getPortfolioData], (data) => data.filter(({ language }) => language === i18n.language));

export const derivePortfolio = (portfolioId: string) => createSelector([derivePortfolioData], (data) => data.find(({ id }) => id === portfolioId));

export const deriveSelectedPortfolio = createSelector(
  [derivePortfolioData, getSelectedPortfolioId],
  (data, selectedPortfolioId) =>
    (data.find(({ id }) => id === selectedPortfolioId) as IPortfolio) || (data.find(({ id }) => id === DEFAULT_PORTFOLIO_ID) as IPortfolio)
);
