import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Logo from "@app/assets/logo.svg";
import Hamburger from "@app/assets/hamburger.svg";
import { DrawerActions } from "@react-navigation/native";
import { supabase } from "@app/lib/supabase";
import { UserContext } from "@app/lib/UserContext";

const Header = ({ navigation, menuVisible, setMenuVisible }) => {
  const [login, setLogin] = React.useState(false);

  const { session } = useContext(UserContext);

  React.useEffect(() => {
    session ? setLogin(true) : setLogin(false);
  }, [navigation, login]);

  //navigation = navigation.navigation

  const header = () => {
    if (login === true && menuVisible === true) {
      return (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Hamburger />
        </TouchableOpacity>
      );
    } else {
      return <View></View>;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Home")}
    >
      <Logo />
      {header()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    paddingTop: 70,
    paddingLeft: 20,
  },
});

export default Header;
