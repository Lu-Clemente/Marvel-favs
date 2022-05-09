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
import { setSessionLogged } from "../../redux/actions";
import { Box, Button, CheckSpan, Container1, Disclaimer, Login, MyName, PageContainer, PowerdBy, Question, Signup, Span, SubHeading, TextLogin, TextSignup, User, UserInput, Welcome } from "./styles";

const LoginScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch<any>(setSessionLogged(true));
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleResgistration = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setCurrentUser(userCredentials.user);
        console.log("Logged in with:", currentUser.email);
      })
      .catch((error) => Alert.alert(error.message));
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

          <Box>
            <CheckSpan>Forgot password?</CheckSpan>
          </Box>

          <Button onPress={handleLogin}>
            <TextLogin>
              Login
            </TextLogin>
          </Button>

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