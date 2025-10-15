import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  menuItem: {
    height: 50,
    borderColor: colors.neutral_medium,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  }
});
