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
  text-transform: uppercase;
  background-color: red;
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
  border: 2px solid red;
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