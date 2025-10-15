import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  wrapper: {
    padding: 5,
    paddingBottom: 60,
    display: 'flex',
    flex: 1,
    height: '100%',
    width: '100%',
    minHeight: 200,
    minWidth: 200,
    backgroundColor: colors.primary_dark
  }
});
