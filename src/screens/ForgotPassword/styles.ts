import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import styled from "styled-components";
import theme from "../../helpers/theme";

export const Container = styled(View)`
  height: 100%;
  width: 100%;
  padding: 0 10%;
  background-color: #000;
  justify-content: space-between;
`;

export const Wrapper = styled(View)``;

export const Warning = styled(View)`
  height: 120px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  margin-top: 15px;
`;

export const WarningText = styled(Text)`
  color: #fff;
  font-size: 14px;
  font-family: ${theme.fonts.AxiformaRegular};
  text-align: center;
`;

export const UserPass = styled(View)`
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 15px;
  padding: 0 15px;
`;

export const UserInput = styled(TextInput)`
  border-radius: 30px;
  height: 50px;
  width: 100%;
  background-color: white;
  padding: 0 15px;
`;

export const ErrorText = styled(Text)`
  color: ${theme.colors.error};
  font-size: 14px;
  padding: 0 15px;
  padding-left: 25px;
`;