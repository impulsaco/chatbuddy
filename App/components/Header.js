import React from "react";
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Logo from "../../assets/logo.svg"
import Hamburger from "../../assets/hamburger.svg"
import { DrawerActions } from '@react-navigation/native';

const Header = (navigation) => {
  navigation = navigation.navigation
  return (
    <View style={styles.container}>
      <Logo />
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Hamburger/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingTop: 30,
    paddingLeft: 20,
  }
});

export default Header;