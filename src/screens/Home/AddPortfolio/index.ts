import { connect } from 'react-redux';
import { addPortfolio, selectPortfolioId } from '~redux/actions/portfolioActions';
import { derivePortfolioData } from '~redux/selectors/portfolioSelector';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import { IPortfolio } from '~types/portfolio';
import AddPortfolio from './AddPortfolio';

const mapStateToProps = (state: RootState) => ({
  portfolioData: derivePortfolioData(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addPortfolio: (params: IPortfolio) => dispatch(addPortfolio(params)),
  selectPortfolioId: (id: string) => dispatch(selectPortfolioId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPortfolio);
