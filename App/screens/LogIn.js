import React, { useState, useEffect } from 'react';
import {
 StyleSheet,
 View,
 Text,
 Dimensions,
 TouchableOpacity,
 Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { makeRedirectUri, startAsync } from 'expo-auth-session';
import { supabase } from '../lib/supabase';
import { Button, Input } from '@rneui/themed'

// For later production login
/*import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
    // webClientId: '736298728107-43itc1mdgs26c4ps9b62hsqhl1bbsoa9.apps.googleusercontent.com',
    webClientId: 'http://1017430563335-qpn9m12nq7rf83ff3e0f0bsqcqag66r3.apps.googleusercontent.com/',
    offlineAccess: true,
});

async function googleSignIn() {
    // get user ID token
    const { idToken } = await GoogleSignin.signIn();
    // create Google credential
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // sign in with credential
    return auth().signInWithCredential(googleCredential);
} */


const PAGE_HEIGHT = Dimensions.get('window').height;

const LogIn = ({navigation, route}) => {

  // Import params
  const session = route.params.session;
  const setSession= route.params.setSession;

  // const [session, setSession] = useState()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [session])

  // Google login

  const googleSignIn = async (session, setSession, navigation) => {

    console.log("setSession is", setSession)
    console.log("session is", session)
    // This will create a redirectUri
    // This should be the URL you added to "Redirect URLs" in Supabase URL Configuration
    // If they are different add the value of redirectUrl to your Supabase Redirect URLs
    const redirectUrl = makeRedirectUri({
      path: '/auth/callback',
    });

    // authUrl: https://{YOUR_PROJECT_REFERENCE_ID}.supabase.co
    // returnURL: the redirectUrl you created above.
    const authResponse = await startAsync({
      authUrl: `https://oztnyyvptigozambngap.supabase.co/auth/v1/authorize?provider=google&redirect_to=${redirectUrl}`,
      returnUrl: redirectUrl,
    });

    // If the user successfully signs in
    // we will have access to an accessToken and an refreshToken
    // and then we'll use setSession (https://supabase.com/docs/reference/javascript/auth-setsession)
    // to create a Supabase-session using these token
    if (authResponse.type === 'success') {
      console.log("Success!", authResponse.params)
      await supabase.auth.setSession({
        access_token: authResponse.params.access_token,
        refresh_token: authResponse.params.refresh_token,
      })
      await supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)        
      })
      
      /*setSession({
        access_token: authResponse.params.access_token,
        refresh_token: authResponse.params.refresh_token,
      })*/
      /*
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      }) */
      navigation.navigate('Home')
    }
  };

  // Email & password login

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) alert(error.message)
    setLoading(false)
  }

 return (        
    <View style={styles.container}>
    <LinearGradient 
    colors={['#9F00B9', '#FFDC61']}
    locations={[0, .99]}
    style={styles.linearGradient}
    />
    <View style={styles.topContent}>
     <Text style={styles.mainText}>
      Log In
     </Text>
    </View>
    <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          inputStyle={{ color: 'white' }} 
          inputContainerStyle={{ borderBottomColor: 'white' }}
          labelStyle={{ color: 'white' }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="********"
          autoCapitalize={'none'}
          inputStyle={{ color: 'white' }} 
          inputContainerStyle={{ borderBottomColor: 'white' }}
          labelStyle={{ color: 'white' }} 
        />
      </View>
      <View style={styles.buttons}>
        <View>
          <Button buttonStyle={{ backgroundColor: '#FFC107', marginRight: 10}} title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
        </View>
        <View>
          <Button buttonStyle={{ backgroundColor: 'transparent', borderColor: '#FFC107', borderWidth: 1, marginRight: 10}} title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
        </View>
      </View>
    <View style={styles.bottomContent}>
     <TouchableOpacity style={styles.googleButton} onPress={() => googleSignIn(session, setSession, navigation)}>
      <Image
       style={styles.googleIcon}
       source={{
        uri: "https://i.ibb.co/j82DCcR/search.png",
       }}
      />
      <Text style={styles.googleButtonText}>Sign in with Google</Text>
     </TouchableOpacity>
    </View>
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
  height: Dimensions.get('window').height,
  backgroundColor: "black",
 },
 topContent: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
 },
 buttons: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  },
 bottomContent: {
  flex: 2,
  alignItems: 'center',
  paddingTop: PAGE_HEIGHT*.1,
 },
 mainText: {
  fontSize: 54,
  color: "white",
 },
 verticallySpaced: {
  paddingTop: 4,
  paddingBottom: 4,
  alignSelf: 'stretch',
},
mt20: {
  marginTop: 20,
},
 googleButton: {
  backgroundColor: "white",
  borderRadius: 4,
  paddingHorizontal: 34,
  paddingVertical: 16,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

 },
 googleButtonText: {
  marginLeft: 16,
  fontSize: 18,
  fontWeight: '600'
 },
 googleIcon: {
  height: 24,
  width: 24
 },
 linearGradient: {
    position: 'absolute',
    height: PAGE_HEIGHT,
    left: 0,
    right: 0,
    top: 0,    
},
});

export default LogIn;