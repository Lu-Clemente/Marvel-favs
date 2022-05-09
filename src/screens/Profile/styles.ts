import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import styled from "styled-components";
import theme from "../../helpers/theme";

export const Container = styled(View)`
  height: 100%;
  width: 100%;
  flex: 1;
  background-color: #000;
`;

export const PaddingView = styled(View)`
  flex: 1;
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

export const User = styled(View)`

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