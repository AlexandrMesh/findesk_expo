import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    minHeight: 200,
    minWidth: 200,
    backgroundColor: colors.primary_dark
  },
  header: {
    paddingTop: 10,
    marginBottom: 5
  },
  portfolioPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.neutral_light
  },
  differences: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  date: {
    color: colors.neutral_light
  },
  lastRefreshed: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
  },
  marketPortfolioPrice: {
    color: colors.primary_medium_light
  },
  portfolioResult: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.neutral_medium,
    padding: 10,
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  changeRatePercent: {
    fontWeight: 'bold',
    fontSize: 22
  },
  changeRateValue: {
    fontSize: 16
  },
  increased: {
    color: colors.success
  },
  decreased: {
    color: colors.error
  },
  titleWrapper: {
    width: '90%',
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  titleClickableAreaWrapper: {
    display: 'flex',
    width: '100%'
  },
  titleClickableArea: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral_light,
    borderStyle: 'dotted',
    borderBottomWidth: 2,
    borderColor: colors.neutral_light
  },
  refreshButton: {
    marginTop: 5,
    marginLeft: 15
  }
});
