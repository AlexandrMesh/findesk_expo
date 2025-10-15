/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from 'react-redux';
import { deriveAsset } from '~redux/selectors/usersAssets';
import { deriveSectionedPurchases } from '~redux/selectors/purchaseSelector';
import { removeAsset, loadAsset, updateAsset, selectSuggestedAsset, clearSuggestedAssets } from '~redux/actions/assetActions';
import { removePurchasesFromAsset } from '~redux/actions/purchaseActions';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import { CRYPTOCURRENCY, STOCK } from '~constants/assets';
import { ISuggestedAsset } from '~types/asset';
import FullAsset from './FullAsset';

const mapStateToProps = (state: RootState, ownProps: any) => ({
  asset: deriveAsset(ownProps.route.params.assetId)(state),
  sectionedPurchases: deriveSectionedPurchases(ownProps.route.params.assetId)(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  removeAsset: (assetId: string) => {
    dispatch(removePurchasesFromAsset(assetId));
    dispatch(removeAsset(assetId));
  },
  selectSuggestedAsset: (value: ISuggestedAsset) => dispatch(selectSuggestedAsset(value)),
  clearSuggestedAssets: () => dispatch(clearSuggestedAssets()),
  loadAsset: (params: { symbol: string; type: typeof STOCK | typeof CRYPTOCURRENCY; uuid: string }) => dispatch(loadAsset(params)).unwrap(),
  updateAsset: (params: { assetId: string; currentPrice: number; refreshed_at: number }) => dispatch(updateAsset(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(FullAsset);
