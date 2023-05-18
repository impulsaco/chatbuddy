import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { makeRedirectUri, startAsync } from "expo-auth-session";
import { supabase } from "@app/lib/supabase";
import { Button, Input } from "@rneui/themed";

import { logger } from "@app/utils/logger";

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

const PAGE_HEIGHT = Dimensions.get("window").height;
const PAGE_WIDTH = Dimensions.get("window").width;

const LogIn = ({ navigation, route }) => {
  // Import params
  const session = route.params.session;
  const setSession = route.params.setSession;

  // const [session, setSession] = useState()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session]);

  // Google login

  const googleSignIn = async (session, setSession, navigation) => {
    logger.debug("setSession is", setSession);
    logger.debug("session is", session);
    // This will create a redirectUri
    // This should be the URL you added to "Redirect URLs" in Supabase URL Configuration
    // If they are different add the value of redirectUrl to your Supabase Redirect URLs
    const redirectUrl = makeRedirectUri({
      path: "/auth/callback",
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
    if (authResponse.type === "success") {
      console.log("Success!", authResponse.params);
      await supabase.auth.setSession({
        access_token: authResponse.params.access_token,
        refresh_token: authResponse.params.refresh_token,
      });
      await supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      /*setSession({
        access_token: authResponse.params.access_token,
        refresh_token: authResponse.params.refresh_token,
      })*/
      /*
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      }) */
      navigation.navigate("Home");
    }
  };

  // Email & password login

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // For sign up indicator
  const [signupSuccess, setSignupSuccess] = useState("");
  const [signupText, setsignupText] = useState("");

  useEffect(() => {
    if (signupSuccess) {
      setTimeout(() => {
        setSignupSuccess("");
        setsignupText("Sign Up");
      }, 10000);
    }
  }, [signupSuccess]);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    navigation.navigate("Home");

    if (error) alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    setSignupSuccess(""); // clear any previous success message
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
      logger.debug(error.message);
    } else {
      setSignupSuccess(
        "Sign up successful! Check your email for confirmation."
      );
      setsignupText("Success!");
    }

    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#319CFF", "#319CFF"]}
          locations={[0, 0.99]}
          style={styles.linearGradient}
        />
        <View style={styles.topContent}>
          <Text style={styles.mainText}>Log In</Text>
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            label="Email"
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
            inputStyle={{ color: "white" }}
            inputContainerStyle={{ borderBottomColor: "white" }}
            labelStyle={{ color: "white" }}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="********"
            autoCapitalize={"none"}
            inputStyle={{ color: "white" }}
            inputContainerStyle={{ borderBottomColor: "white" }}
            labelStyle={{ color: "white" }}
          />
          {signupSuccess && (
            <Text style={styles.successText}>{signupSuccess}</Text>
          )}
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => signInWithEmail()}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          {!signupSuccess && (
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => signUpWithEmail()}
            >
              <Text style={{ ...styles.buttonText, color: "white" }}>
                Sign up
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.bottomContent}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => googleSignIn(session, setSession, navigation)}
          >
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    backgroundColor: "black",
  },
  loginButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    width: PAGE_WIDTH * 0.3,
    height: PAGE_HEIGHT * 0.05,
    marginRight: 10,
  },
  signupButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    width: PAGE_WIDTH * 0.3,
    height: PAGE_HEIGHT * 0.05,
    margin: 10,
  },
  topContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContent: {
    flex: 2,
    alignItems: "center",
    paddingTop: PAGE_HEIGHT * 0.1,
  },
  buttonText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    textAlignVertical: "center",
  },
  mainText: {
    fontSize: 54,
    color: "white",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  googleButton: {
    backgroundColor: "white",
    borderRadius: 4,
    paddingHorizontal: 34,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  googleButtonText: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "600",
  },
  googleIcon: {
    height: 24,
    width: 24,
  },
  linearGradient: {
    position: "absolute",
    height: PAGE_HEIGHT * 1.5,
    left: 0,
    right: 0,
    top: 0,
  },
  successText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default LogIn;
