import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import styled from "styled-components";
import theme from "../../helpers/theme";

export const PageContainer = styled(View)`
  height: 100%;
  width: 100%;
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: space-around;
`;

export const Welcome = styled(View)`
  display: flex;
  flex-direction: column;
  height: 140px;
  width: 100%;
  padding: 0 40px;
  justify-content: space-between;
`;

export const Heading = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  font-family: ${theme.fonts.AxiformaRegular};
  color: #fff;
  line-height: 28px;
`;

export const About = styled(Text)`
  font-size: 16px;
  text-align: center;
  font-family: ${theme.fonts.AxiformaLight};
  color: #fff;
  line-height: 22px;
`;

export const Button = styled(TouchableOpacity)`
  width: 170px;
  height: 50px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  border: 2px solid ${theme.colors.error};
`;

export const TextLogin = styled(Text)`
  text-align: center;
  font-size: 18px;
  font-family: ${theme.fonts.AxiformaLight};
  color: #fff;
`;

export const Circle = styled(View)`
  height: 240px;
  width: 240px;
  border-radius: 120px;
  justify-content: center;
  align-items: center;
`;