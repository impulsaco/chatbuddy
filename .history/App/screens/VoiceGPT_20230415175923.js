import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, View, StyleSheet } from "react-native";
import { SceneMap } from 'react-native-tab-view';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider, DraxScrollView } from 'react-native-drax';
import VoiceChat from "./VoiceChat"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DraggableWord from '../components/DraggableWord';
import WordMenu from '../components/WordMenu';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient'
import AddWord from '../components/AddWord';
import { supabase } from '../lib/supabase';
import WordRoute from '../lib/WordRoute';
import { LanguageContext } from '../lib/LanguageContext';


const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

export default ({ navigation, route }) => {

    const[newMessage, setNewMessage] = useState("Hello World")
    
    return (
        <GestureHandlerRootView style={styles.gestureRootViewStyle}>
                <View style={styles.gestureRootViewStyle}>
                    <LinearGradient 
                        colors={['#319CFF', '#319CFF']}
                        locations={[0, .99]}
                        style={styles.linearGradient}
                    />
                    <Header />
                    <VoiceChat 
                        newMessage={newMessage}
                    />
                    <VoiceRecord
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                    />                                
                </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    gestureRootViewStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        display: 'flex',
    },
    wordContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        paddingLeft: 10,
    },
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '33%'
    },
    draggable: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
    },
    dragging: {
        opacity: 0.1,
    },

    linearGradient: {
        position: 'absolute',
        height: PAGE_HEIGHT*1.5,
        left: 0,
        right: 0,
        top: 0,  
        
    },
  })