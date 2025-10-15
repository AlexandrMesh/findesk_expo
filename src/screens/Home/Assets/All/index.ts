import { connect } from 'react-redux';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import { deriveAssets } from '~redux/selectors/assetSelector';
import { clearSuggestedAssets, selectSuggestedAsset } from '~redux/actions/assetActions';
import { deriveAssetData } from '~redux/selectors/usersAssets';
import All from './All';

const mapStateToProps = (state: RootState) => ({
  assets: deriveAssets(state),
  assetData: deriveAssetData(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  clearSelectedAsset: () => {
    dispatch(clearSuggestedAssets());
    dispatch(selectSuggestedAsset({ symbol: '', description: '' }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(All);
