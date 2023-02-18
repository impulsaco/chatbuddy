import { useEffect } from 'react';
import { View, StyleSheet, Pressable, Text} from "react-native";
import PersonIcon from '../../assets/person.svg'
import RunnerIcon from '../../assets/runner.svg'
import IdentityIcon from '../../assets/identity.svg'
import AppleIcon from '../../assets/apple.svg'

const WordMenu = ({ state, navigation, forward, setForward }) => {


  // Move forward if new word entered

  useEffect(() => {
    if (forward !== "") {
      navigation.navigate(forward);
      setForward("")
    }
  }, [forward]) 

  // Sets color of icons if pressed
  const color = (pageName, currentIndex) => {
    const nameArray = ['subject', 'verb', 'adjective', 'noun']
    if (currentIndex === nameArray.indexOf(pageName)) {
      return "#FBD470"
    }
    else {
      return "#FFFFFF"
    }
  }

  // Used SVG to be able to change the color of the icons exported from Figma.
  const icon = (pageName, currentIndex) => {
    if (pageName === 'subject') return <PersonIcon fill={color(pageName, currentIndex)} />
    if (pageName === 'verb') return <RunnerIcon fill={color(pageName, currentIndex)} />
    if (pageName === 'adjective') return <IdentityIcon fill={color(pageName, currentIndex)} />
    if (pageName === 'noun') return <AppleIcon fill={color(pageName, currentIndex)} />
    return pageName;
  }

  const tabButton = (route, index) => {
    const isFocused = state.index === index; // Checks if the current page is the same as the page in the array 
    return (
    <Pressable
        key={`wordmenu-${index}`}
        style={styles.button}
        
        onPress={() => {
            const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved

            navigation.navigate({ name: route.name, merge: true });
            }
        }}
        >
        { icon(route.name, state.index) }
        </Pressable>
    )
  }

  return <View style={styles.container}>
    {state.routes.map(
      (route, index) => {
        return (
          tabButton(route, index)
        )
      }
    )}         
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',

    height: 50,
  },

  button: {
    padding: 10
  },
});

export default WordMenu;