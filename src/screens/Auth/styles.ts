import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import styled from "styled-components";
import theme from "../../helpers/theme";

export const PageContainer = styled(View)`
  height: 100%;
  width: 100%;
  flex: 1;
`;

export const Container1 = styled(View)`
  width: 70%;
  height: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Welcome = styled(View)`
  display: flex;
  flex-direction: column;
  height: 50px;
  width: 100%;
  justify-content: space-between;
`;

export const SubHeading = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-align: center;
  font-family: ${theme.fonts.AxiformaRegular};
`;

export const Login = styled(Text)`
  font-size: 14px;
  color: white;
  text-align: center;
  font-family: ${theme.fonts.AxiformaLight};
`;

export const User = styled(View)`
  height: 115px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 30px 0;
`;

export const UserInput = styled(TextInput)`
  border-radius: 30px;
  height: 50px;
  width: 100%;
  background-color: white;
  padding-left: 20px;
`;

export const Button = styled(TouchableOpacity)`
  width: 100%;
  height: 50px;
  background-color: red;
  border-radius: 30px;
`;

export const TextLogin = styled(Text)`
  color: white;
  text-align: center;
  margin: auto 0;
  font-size: 16px;
  font-family: ${theme.fonts.AxiformaLight};
`;

export const Box = styled(View)`
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CheckSpan = styled(Text)`
  color: white;
  font-family: ${theme.fonts.AxiformaRegular};
  font-size: 11px;
  margin-left: -15px;
`;

export const Question = styled(View)`
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Span = styled(Text)`
  color: white;
  font-family: ${theme.fonts.AxiformaRegular};
  font-weight: bold;
  font-size: 16px;
`;

export const Signup = styled(TouchableOpacity)`
  height: 20px;
  margin-left: 5px;
`;

export const TextSignup = styled(Text)`
  color: red;
  font-family: ${theme.fonts.AxiformaRegular};
  font-size: 16px;
  font-weight: bold;
`;

export const Container2 = styled(View)`
    height: 300px;
    width: 100%;
    flex: 1;
`;