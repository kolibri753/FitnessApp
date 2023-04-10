import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.black,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
    paddingHorizontal: 20,
  },
  tab: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: colors.white,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.yellow,
  },
  activeTabLabel: {
    color: colors.yellow,
  },
});

export default styles;
