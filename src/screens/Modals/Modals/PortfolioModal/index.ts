import { connect } from 'react-redux';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import { derivePortfolioData, deriveSelectedPortfolio } from '~redux/selectors/portfolioSelector';
import { getActiveModal } from '~redux/selectors/modalsSelector';
import { hideModal } from '~redux/actions/modalsActions';
import { PORTFOLIO_MODAL } from '~constants/modalTypes';
import { selectPortfolioId, removePortfolio, selectDefaultPortfolio } from '~redux/actions/portfolioActions';
import { removePurchasesFromPortfolio } from '~redux/actions/purchaseActions';
import { removeAllAssetsFromThePortfolio } from '~redux/actions/assetActions';
import PortfolioModal from './PortfolioModal';

const mapStateToProps = (state: RootState) => ({
  isVisible: getActiveModal(state) === PORTFOLIO_MODAL,
  portfolios: derivePortfolioData(state),
  selectedPortfolio: deriveSelectedPortfolio(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  hideModal: () => dispatch(hideModal()),
  selectPortfolioId: (id: string) => dispatch(selectPortfolioId(id)),
  removePortfolio: (portfolioId: string) => {
    dispatch(removePurchasesFromPortfolio(portfolioId));
    dispatch(removeAllAssetsFromThePortfolio(portfolioId));
    dispatch(removePortfolio(portfolioId));
    dispatch(selectDefaultPortfolio(portfolioId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioModal);
