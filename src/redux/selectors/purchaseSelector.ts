import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import { RootState } from '~redux/store/configureStore';
import showRelativeDate from '~utils/relativeDate';
import { getSelectedPortfolioId } from '~redux/selectors/portfolioSelector';
import { IPurchase } from '~types/purchase';
import i18n from '~translations/i18n';

type StateWithPurchases = Pick<RootState, 'purchases'>;

const getPurchases = (state: StateWithPurchases) => state.purchases;

export const getPurchasesData = (state: StateWithPurchases) => getPurchases(state).data;

export const derivePurchases = createSelector([getPurchasesData, getSelectedPortfolioId], (purchases, selectedPortfolioId) =>
  purchases.filter(({ portfolioId, language }) => portfolioId === selectedPortfolioId && language === i18n.language)
);

export const deriveSectionedPurchases = (assetId: string) =>
  createSelector([derivePurchases], (purchases) =>
    map(
      groupBy(
        purchases
          .filter((item) => item.assetId === assetId)
          .sort((a, b) => Number(b.created_at) - Number(a.created_at))
          .map((item) => ({ ...item, date: showRelativeDate(item.created_at) })),
        'date'
      ),
      (value: IPurchase[], key: string) => {
        return {
          title: key,
          count: value.length,
          data: value.sort((a, b) => Number(b.created_at) - Number(a.created_at))
        };
      }
    )
  );
