import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    SafeAreaView
} from "react-native";
import styled from "styled-components";
import theme from "../../helpers/theme";
import { Dimensions } from "react-native";

const { height } = Dimensions.get('screen');

export const Container = styled(View)<{modalOpen : boolean}>`
  height: ${height - 70}px;
  width: 100%;
  /* background-color: ${({ modalOpen }) => (modalOpen ? 'rbga(0,0,0,.2)' : '#fff')}; */
  background-color: #000;
  position: relative;
  justify-content: space-between;
`;

export const PaddingView = styled(View)`
  padding: 15px;
`;

export const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

export const Back = styled(View)`
    width: 55%;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    align-self: flex-start;
    flex-direction: row;
    color: red;
    margin: 15px 0;
    margin-left: -15px;
    padding: 0 20px;
`;

export const Page = styled(Text)`
    color: white;
    font-size: 20px;
`;

export const Logout = styled(TouchableOpacity)`
  padding: 15px;
  margin-right: -15px;
  margin-bottom: 10px;
  align-self: flex-end;
`;

export const UserInfo = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const ProfilePic = styled(View)`
    height: 60px;
    width: 60px;
    border-radius: 30px;
    background-color: #fff;
    margin-right: 15px;
`;

export const Buttons = styled(View)`

`;

export const UserName = styled(Text)`
  color: #fff;
  font-size: 16px;
  font-family: ${theme.fonts.AxiformaRegular};
`;

export const DeleteAccount = styled(TouchableOpacity)`
  height: 45px;
  width: 60%;
  align-items: center;
  justify-content: center;
  border: 2px solid ${theme.colors.error};
  margin: 15px auto;
  margin-bottom: 25px;
  border-radius: 12px;
`;

export const DeleteText = styled(Text)`
  font-family: ${theme.fonts.AxiformaLight};
  color: #fff;
  font-size: 16px;
`;

export const PasswordModal = styled(View)`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 15px;
  background-color: #fff;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  height: ${(height * 80 / 100)}px;
`;

export const Warning = styled(View)`
  height: 80px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
`;

export const WarningText = styled(Text)`
  color: #000;
  font-size: 14px;
`;

export const UserPass = styled(View)`
  height: 115px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 15px;
`;

export const UserInput = styled(TextInput)`
  border-radius: 30px;
  height: 50px;
  width: 100%;
  background-color: white;
  padding: 0 15px;
  border: 2px solid #f00;
`;

export const ErrorText = styled(Text)`
  color: ${theme.colors.error};
  font-size: 14px;
  padding-left: 10px;
  margin-top: 10px;
`;

export const ConfirmButton = styled(TouchableOpacity)`
  height: 45px;
  width: 60%;
  align-items: center;
  justify-content: center;
  background-color: #f00;
  margin: 15px auto;
  border-radius: 12px;
`;