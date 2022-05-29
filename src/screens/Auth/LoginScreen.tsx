import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { auth } from "../../services/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLoading, setSessionLogged, setTabSelected } from "../../redux/actions";
import { 
  Box, CheckSpan, Container1, Disclaimer,
  Login, MyName, PageContainer, PowerdBy,
  Question, Signup, Span, SubHeading,
  TextSignup, User, UserInput, Welcome
} from "./styles";
import RoundedButton from "../../components/Buttons/Rounded";

const LoginScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch<any>(setSessionLogged(true));
        dispatch<any>(setLoading(false));
        dispatch<any>(setTabSelected("Home"));
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleResgistration = () => {
    navigation.navigate("SignUp");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  }

  const handleLogin = () => {
    dispatch<any>(setLoading(true));

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log("Logged in with:", userCredentials.user.email);
      })
      .catch((error) => Alert.alert("Login failed", "Incorrect credentials"))
      .finally(() => dispatch<any>(setLoading(false)))
  };


  return (
    <KeyboardAvoidingView style={styles.container} enabled={false} behavior="height">
      <PageContainer>

        <Container1>

          <Image
            source={require('../../../assets/img/marvel_logo.png')}
            style={{ height: 55, width: 140 }}
            resizeMode="cover"
          />

          <Welcome>
            <SubHeading>Greetings Marvel's fan!</SubHeading>
            <Login>Please, sign in</Login>
          </Welcome>

          <User>
            <UserInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor='gray'
            />
            <UserInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </User>

          <Box onPress={handleForgotPassword}>
            <CheckSpan>Forgot password?</CheckSpan>
          </Box>

          <RoundedButton
            lable="Login"
            triggerFunction={handleLogin}
          />

          <Question>
            <Span>New here?</Span>
            <Signup onPress={handleResgistration}>
              <TextSignup>Sign up</TextSignup>
            </Signup>
          </Question>

        </Container1>

        <PowerdBy>
          <Disclaimer>Note: This app is for portfolio showcase only. And have no connections with Marvel whatsoever.</Disclaimer>
          <MyName>Powerd by: Luciene Clemente</MyName>
        </PowerdBy>

      </PageContainer>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    paddingTop: 50,
  },
})