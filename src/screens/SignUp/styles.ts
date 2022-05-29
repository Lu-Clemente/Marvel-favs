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
  align-items: center;
`;

export const GoBack = styled(TouchableOpacity)`
  align-self: flex-start;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

export const Welcome = styled(View)`
  display: flex;
  flex-direction: column;
  height: 50px;
  width: 100%;
  justify-content: space-between;
`;

export const Title = styled(Text)`
  font-size: 30px;
  color: white;
  text-align: center;
  font-family: ${theme.fonts.AxiformaRegular};
  padding: 10px;
  margin-bottom: 50px;
`;

export const Login = styled(Text)`
  font-size: 14px;
  color: white;
  text-align: center;
  font-family: ${theme.fonts.AxiformaLight};
`;

export const User = styled(View)`
  width: 80%;
  justify-content: space-between;
  margin: 30px 0;
`;

export const EmailField = styled(View)`
  width: 100%;
  justify-content: space-between;
  height: 80px;
`;

export const PasswordField = styled(View)`
  width: 100%;
  justify-content: space-between;
  height: 140px;
  margin-top: 10px;
`;

export const UserInput = styled(TextInput)`
  border-radius: 30px;
  height: 50px;
  width: 100%;
  background-color: #fff;
  padding: 0 15px;
`;

export const WarningText = styled(Text)`
  font-size: 14px;
  font-family: ${theme.fonts.AxiformaRegular};
  align-self: flex-start;
  color: #f00;
  padding-left: 10px;
`;

export const Button = styled(TouchableOpacity)`
  width: 70%;
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