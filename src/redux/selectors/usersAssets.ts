import { createSelector } from 'reselect';
import { derivePurchases } from '~redux/selectors/purchaseSelector';
import { deriveAssets, getSelectedSuggestedAsset } from '~redux/selectors/assetSelector';
import { IAsset } from '~types/asset';

const getPercentageChange = (averagePrice: number, currentPrice: number) => {
  return (currentPrice / averagePrice) * 100 - 100;
};

export const deriveAssetData = createSelector([derivePurchases, deriveAssets], (purchasesData, assetsData) => {
  const reducedAssetData = assetsData.map((item) => {
    const count = purchasesData
      .filter(({ assetId }) => assetId === item.id)
      .map(({ count }) => count)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const averagePrice =
      count <= 0
        ? 0
        : purchasesData
            .filter(({ assetId }) => assetId === item.id)
            .map(({ price, count }) => price * count)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
          purchasesData
            .filter(({ assetId }) => assetId === item.id)
            .map(({ count }) => count)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const diffInPercent = count <= 0 ? 0 : getPercentageChange(averagePrice, Number(item.currentPrice));
    const diffInValue = count <= 0 ? 0 : Number(item.currentPrice) * count - averagePrice * count;
    const invested = count <= 0 ? 0 : averagePrice * count;

    return {
      ...item,
      averagePrice,
      diffInPercent,
      diffInValue,
      invested,
      count
    };
  });

  return reducedAssetData.map((item) => ({
    ...item,
    share:
      (item.invested / reducedAssetData.map(({ invested }) => invested).reduce((accumulator, currentValue) => accumulator + currentValue, 0)) * 100
  }));
});

export const derivePortfolioTotalMarketCost = createSelector([derivePurchases, deriveAssets], (purchasesData, assetsData) =>
  assetsData
    .map(({ currentPrice, id }) => ({
      currentPrice,
      count: purchasesData
        .filter(({ assetId }) => assetId === id)
        .map(({ count }) => count)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    }))
    .map(({ currentPrice, count }) => Number(currentPrice) * count)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
);

export const derivePortfolioTotalCost = createSelector([deriveAssetData], (assetData) =>
  assetData.map(({ invested }) => invested).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
);

export const deriveProfitValue = createSelector(
  [derivePortfolioTotalMarketCost, derivePortfolioTotalCost],
  (portfolioTotalMarketCost, portfolioTotalCost) => portfolioTotalMarketCost - portfolioTotalCost
);

export const deriveProfitValueInPercents = createSelector([derivePortfolioTotalCost, deriveProfitValue], (portfolioTotalCost, profitValue) =>
  portfolioTotalCost <= 0 ? 0 : (profitValue / portfolioTotalCost) * 100
);

export const deriveAsset = (assetId: string) => createSelector([deriveAssetData], (data) => data.find(({ id }) => id === assetId) as IAsset);

export const deriveExistingAsset = createSelector(
  [deriveAssetData, getSelectedSuggestedAsset],
  (data, selectedAsset) => data.find(({ symbol }) => symbol === selectedAsset.symbol) as IAsset
);
