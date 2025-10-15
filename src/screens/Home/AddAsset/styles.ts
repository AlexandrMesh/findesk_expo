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
  warning: {
    width: '100%',
    height: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  block: {
    marginTop: 25
  },
  scrollWrapper: {
    flex: 1,
    padding: 10
  },
  scrollContent: {
    flex: 1,
    height: 'auto',
    display: 'flex'
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.neutral_medium,
    borderBottomWidth: 1
  },
  headerBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    paddingBottom: 5,
    fontSize: 22,
    color: colors.neutral_light
  },
  h2: {
    fontSize: 18,
    color: colors.neutral_light,
    marginBottom: 10
  },
  subTitle: {
    display: 'flex',
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: colors.neutral_medium
  },
  blockWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomBlock: {
    marginBottom: 40
  },
  labelWrapper: {
    display: 'flex',
    flex: 1
  },
  menuItemTitle: {
    fontSize: 14,
    color: colors.neutral_light
  },
  menuItemSubTitle: {
    fontSize: 14,
    color: colors.primary_medium_light
  },
  inputLabel: {
    color: colors.neutral_medium,
    fontSize: 18
  },
  activeInputLabel: {
    color: colors.neutral_light
  },
  radioMenuItem: {
    height: 50,
    borderColor: colors.neutral_medium,
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainButton: {
    flex: 1,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
  },
  inputBlockWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 48,
    paddingLeft: 10,
    paddingRight: 5,
    borderWidth: 1,
    borderColor: colors.neutral_medium,
    borderRightWidth: 0,
    flex: 2
  },
  activeInputWrapper: {
    borderColor: colors.neutral_light
  },
  footerButtonsWrapper: {
    paddingTop: 10,
    paddingHorizontal: 10,
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
