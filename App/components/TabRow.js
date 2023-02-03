import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react"
import { Button } from "@rneui/themed";

const TabRow = ({tab, setTab}) => {

    const wordTypes = ["Subjects", "Verbs", "Adjectives", "Nouns"]

    const tabs = ({ tab , setTab }) => {
        return <View style = {styles.container}>
        {wordTypes.map(
            (tabName, index) => (
            <Button style = { tab === tabName ? styles.pressed : styles.unpressed }
                key={`tab-${index}`}
                onPress={() => setTab(tabName)}
            >
                <Text style = { tab === tabName ? styles.pressedText : styles.unpressedText }>{tabName}</Text>
            </Button>
            )
            )}     
        </View>
    }

    return (
        <View>
            {tabs({ tab, setTab })}
        </View>
    )
}

const styles = StyleSheet.create({
    /* Tab Row */
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 0,
        paddingHorizontal: 0,
        paddingBottom: 16,

        position: 'absolute',
        width: 393,
        height: 48,
        left: 0,
        top: 0,
  },

  /* Button */
    pressed: {
        backgroundColor: "rgba(0, 0, 0, 0.06)",
        borderColor: "rgba(0, 0, 0, 0.06)"
    },

    pressedText: {
        color: "#000000",
        fontSize: 17,
        lineHeight: 24,
        letterSpacing: 0.01
    },

    unpressed: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: "rgba(0, 0, 0, 0)"  },

    unpressedText: {
        color: "rgba(0, 0, 0, 0.5)",
        fontSize: 17,
        lineHeight: 24,
        letterSpacing: 0.01
    },

});

export default TabRow;