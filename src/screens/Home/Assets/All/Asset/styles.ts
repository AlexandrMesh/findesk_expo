import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  asset: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.neutral_medium
  },
  header: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  titleWrapper: {
    width: '70%',
    display: 'flex'
  },
  info: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '30%'
  },
  mTop: {
    marginTop: 20
  },
  assetTitle: {
    fontSize: 16,
    color: colors.neutral_light
  },
  bold: {
    fontWeight: 'bold'
  },
  changeRate: {
    fontSize: 15
  },
  increased: {
    color: colors.success
  },
  decreased: {
    color: colors.error
  },
  colored: {
    fontSize: 16,
    color: colors.primary_medium_light
  },
  label: {
    fontSize: 16,
    color: colors.neutral_light
  },
  share: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chartIcon: {
    marginRight: 5
  }
});
