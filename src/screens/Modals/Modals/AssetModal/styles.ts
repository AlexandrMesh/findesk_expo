import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between'
  },
  content: {
    position: 'relative',
    flex: 1
  },
  submitButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  submitButton: {
    maxWidth: 600
  },
  searchAssetInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  typesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  labelWrapper: {
    display: 'flex',
    marginLeft: 5
  },
  menuItemTitle: {
    fontSize: 16,
    color: colors.neutral_light
  },
  radioMenuItem: {
    marginRight: 10,
    height: 46,
    borderColor: colors.neutral_light,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  assetInputWrapper: {
    flex: 1
  },
  searchButton: {
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary_medium
  },
  disabledSearchButton: {
    opacity: 0.5
  },
  emptyResult: {
    marginTop: 15,
    width: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyLabel: {
    fontSize: 16,
    color: colors.neutral_light
  }
});
