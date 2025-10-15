import { connect } from 'react-redux';
import { deriveSelectedPortfolio } from '~redux/selectors/portfolioSelector';
import { deriveAssets, getSelectedSuggestedAsset } from '~redux/selectors/assetSelector';
import { addAsset, removeAsset } from '~redux/actions/assetActions';
import { deriveExistingAsset } from '~redux/selectors/usersAssets';
import { addPurchase, removePurchasesFromAsset } from '~redux/actions/purchaseActions';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import { IAsset, IPurchase } from '~types/asset';
import AddAsset from './AddAsset';
import { showModal } from '~redux/actions/modalsActions';
import { ASSET_MODAL } from '~constants/modalTypes';

const mapStateToProps = (state: RootState) => ({
  assetsLength: deriveAssets(state)?.length,
  selectedPortfolio: deriveSelectedPortfolio(state),
  selectedAsset: getSelectedSuggestedAsset(state),
  existingAsset: deriveExistingAsset(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addAsset: (params: IAsset) => dispatch(addAsset(params)),
  addPurchase: (params: IPurchase) => dispatch(addPurchase(params)),
  showAssetModal: () => dispatch(showModal(ASSET_MODAL)),
  removeAsset: (assetId: string) => {
    dispatch(removePurchasesFromAsset(assetId));
    dispatch(removeAsset(assetId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAsset);
