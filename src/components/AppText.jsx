import {StyleSheet, Text} from 'react-native';
import React from 'react';

const AppText = ({children}) => {
  return <Text style={styles.style}>{children}</Text>;
};

export default AppText;

const styles = StyleSheet.create({
  style: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    fontWeight: '300',
    color: '#111111',
  },
});
