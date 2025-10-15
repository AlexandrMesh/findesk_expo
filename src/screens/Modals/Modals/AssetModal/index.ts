import { connect } from 'react-redux';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import { getActiveModal } from '~redux/selectors/modalsSelector';
import { getSuggestedAssets, getLoadingSuggestedAssetsStatus, getSuggestedAssetsNoResults } from '~redux/selectors/assetSelector';
import { hideModal } from '~redux/actions/modalsActions';
import { searchAssets, clearSuggestedAssets, selectSuggestedAsset } from '~redux/actions/assetActions';
import { ASSET_MODAL } from '~constants/modalTypes';
import { CRYPTOCURRENCY, STOCK } from '~constants/assets';
import { ISuggestedAsset } from '~types/asset';
import AssetModal from './AssetModal';

const mapStateToProps = (state: RootState) => ({
  isVisible: getActiveModal(state) === ASSET_MODAL,
  suggestedAssets: getSuggestedAssets(state),
  loadingSuggestedAssetsStatus: getLoadingSuggestedAssetsStatus(state),
  suggestedAssetsNoResults: getSuggestedAssetsNoResults(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  hideModal: () => dispatch(hideModal()),
  searchAssets: (params: { query: string; type: typeof STOCK | typeof CRYPTOCURRENCY }) => dispatch(searchAssets(params)),
  clearSuggestedAssets: () => dispatch(clearSuggestedAssets()),
  selectSuggestedAsset: (asset: ISuggestedAsset) => dispatch(selectSuggestedAsset(asset))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetModal);
