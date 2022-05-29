import {
    Text,
    TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import theme from "../../../helpers/theme";


export const Button = styled(TouchableOpacity)<{themeType: number, color: string}>`
  width: 100%;
  height: 50px;
  border-radius: 30px;
  background-color: ${({ themeType, color }) => (themeType === 1 ? `${color}` : 'transparent')};
  border: ${({ themeType, color }) => (themeType === 1 ? 'none' : `2px solid ${color}`)};
`;

export const TextLogin = styled(Text)`
  color: #fff;
  text-align: center;
  margin: auto 0;
  font-size: 16px;
  font-family: ${theme.fonts.AxiformaLight};
`;