import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from "react-native";
import { auth } from "../../services/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { setSessionLogged } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Button, Login, PageContainer, TextLogin, Title, User, UserInput, Welcome } from "./styles";

export type StackParams = {
  MyRoute: undefined;
  AnotherRoute: {
    id: number
  }
}

const SignUp = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch<any>(setSessionLogged(true));
        navigation.navigate("Greetings");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => Alert.alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <PageContainer>


        <Title>Register</Title>

        <Welcome>
          <Login>Enter an email and create a new password</Login>
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

        <Button onPress={handleSignUp}>
          <TextLogin>
            Create
          </TextLogin>
        </Button>

      </PageContainer>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000"
  },
})