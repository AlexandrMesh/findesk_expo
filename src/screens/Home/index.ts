import { connect } from 'react-redux';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import { deriveSelectedPortfolio } from '~redux/selectors/portfolioSelector';
import { derivePortfolioTotalCost, deriveProfitValue, deriveProfitValueInPercents } from '~redux/selectors/usersAssets';
import { deriveAssets } from '~redux/selectors/assetSelector';
import { loadAssets } from '~redux/actions/assetActions';
import { showModal } from '~redux/actions/modalsActions';
import { PORTFOLIO_MODAL } from '~constants/modalTypes';
import Home from './Home';

const mapStateToProps = (state: RootState) => ({
  selectedPortfolio: deriveSelectedPortfolio(state),
  portfolioCost: derivePortfolioTotalCost(state),
  profitValue: deriveProfitValue(state),
  profitValueInPercents: deriveProfitValueInPercents(state),
  assets: deriveAssets(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  showPortfolioModal: () => dispatch(showModal(PORTFOLIO_MODAL)),
  loadAssets: () => dispatch(loadAssets())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
