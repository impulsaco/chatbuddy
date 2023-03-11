import React from "react";
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Logo from "../../assets/logo.svg"
import Hamburger from "../../assets/hamburger.svg"
import { DrawerActions } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

const Header = (navigation) => {

  const [login, setLogin] = React.useState(false)

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      session ? setLogin(true) : setLogin(false)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      session ? setLogin(true) : setLogin(false)
    })
  }, [navigation, login])
  
  navigation = navigation.navigation
  const header = () => {
    if (login === true) {
      return (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Hamburger/>
        </TouchableOpacity>
      )
    }
    else {
      return (
        <View></View>
      )
    }
  }
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Home')}>
      <Logo />
        {header()}                            
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingTop: 70,
    paddingLeft: 20,
  }
});

export default Header;