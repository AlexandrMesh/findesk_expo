import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primary_dark
  },
  wrapper: {
    paddingVertical: 10,
    maxWidth: 600,
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: colors.primary_dark
  },
  scrollWrapper: {
    marginTop: 10,
    flex: 1,
    paddingHorizontal: 10
  },
  sectionedList: {
    flex: 1.5,
    padding: 10
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    paddingHorizontal: 10,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.neutral_medium,
    borderBottomWidth: 1
  },
  title: {
    width: '90%',
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.neutral_light
  },
  refreshButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    width: '10%'
  },
  block: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    color: colors.neutral_light,
    fontSize: 18
  },
  bold: {
    fontWeight: 'bold'
  },
  coloredLabel: {
    color: colors.primary_medium_light
  },
  mBottom: {
    marginBottom: 10
  },
  purchaseListHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  stickyHeader: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.neutral_medium
  },
  purchaseCount: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitleText: {
    fontSize: 16,
    color: colors.neutral_light
  },
  info: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  changeRatePercent: {
    fontSize: 20
  },
  increased: {
    color: colors.success
  },
  decreased: {
    color: colors.error
  },
  createdColumn: {
    width: '40%'
  },
  countColumn: {
    width: '20%'
  },
  priceColumn: {
    width: '40%'
  },
  purchase: {
    display: 'flex',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.neutral_medium,
    borderRadius: 5,
    marginVertical: 5
  },
  purchaseItem: {
    fontSize: 16,
    color: colors.neutral_light
  },
  addPurchaseButton: {
    width: 90,
    height: 36
  },
  addPurchaseButtonTitle: {
    fontSize: 16
  },
  left: {
    width: '60%'
  },
  right: {
    width: '40%'
  },
  footerButtonsWrapper: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerButton: {
    maxWidth: 160,
    marginHorizontal: 10
  }
});
