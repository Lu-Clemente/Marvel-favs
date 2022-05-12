import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from "react-native";
import { auth } from "../../services/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { setLoading, setSessionLogged } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Button, GoBack, Login, PageContainer, TextLogin, Title, User, UserInput, Welcome, WarningText, PasswordField, EmailField } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch<any>(setSessionLogged(true));
        navigation.navigate("Greetings");
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (errorPassword) {
      if (password !== confirmPassword) {
        setErrorPassword(false);
      }
    }
  }, [password, confirmPassword])

  const handleSignUp = () => {
    dispatch<any>(setLoading(true));

    if (!email || !password || !confirmPassword) {
      Alert.alert('Alert', 'All fields are required.');
      dispatch<any>(setLoading(false));
      return;
    } else if (password !== confirmPassword) {
      setErrorPassword(true);
      dispatch<any>(setLoading(false));
      return;
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Registered with:", user.email);
        })
        .catch((error) => Alert.alert(error.message))
        .finally(() => dispatch<any>(setLoading(false)))
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <PageContainer>

        <GoBack onPress={handleGoBack}>
          <FontAwesomeIcon icon={faChevronLeft} color="#f00" size={20} />
        </GoBack>

        <Title>Register</Title>

        <Welcome>
          <Login>Enter an email and create a new password</Login>
        </Welcome>

        <User>
          <EmailField>
            <UserInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor='gray'
            />
          </EmailField>

          <PasswordField>
            <UserInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            <UserInput
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry
            />
            {
              errorPassword &&
              <WarningText>Passwords don't match</WarningText>
            }
          </PasswordField>
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