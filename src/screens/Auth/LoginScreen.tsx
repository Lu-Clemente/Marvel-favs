import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { auth } from "../../services/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setSessionLogged } from "../../redux/actions";
import { Box, Button, CheckSpan, Container1, Login, PageContainer, Question, Signup, Span, SubHeading, TextLogin, TextSignup, User, UserInput, Welcome } from "./styles";

const LoginScreen = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const navigation = useNavigation<any>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch<any>(setSessionLogged(true));
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleResgistration = () => {
    navigation.replace("SignUp")
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
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
            <SubHeading>Bem-Vindo!</SubHeading>
            <Login>Fazer login</Login>
          </Welcome>

          <User>
            <UserInput
              placeholder="E-mail"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor='gray'
            />
            <UserInput
              placeholder="Senha"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </User>

          <Button onPress={handleLogin}>
            <TextLogin>
              Entrar
            </TextLogin>
          </Button>

          <Box>
            <CheckBox
              checked={isSelected}
              checkedColor='red'
              onPress={() => setIsSelected(!isSelected)}
            />
            <CheckSpan>Lembrar dados de login</CheckSpan>
          </Box>

          <Question>
            <Span>É novo(a) aqui?</Span>
            <Signup onPress={handleResgistration}>
              <TextSignup>Cadastrar-se</TextSignup>
            </Signup>
          </Question>

        </Container1>

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