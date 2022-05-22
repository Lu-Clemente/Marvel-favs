import {
    Text,
    TouchableOpacity
} from "react-native";
import styled from "styled-components";
import theme from "../../../helpers/theme";

export const Button = styled(TouchableOpacity)<{themeType: number, color: string}>`
  width: 170px;
  height: 50px;
  border-radius: 16px;
  align-self: center;
  justify-content: center;
  align-items: center;
  background-color: ${({ themeType, color }) => (themeType === 1 ? `${color}` : 'transparent')};
  border: ${({ themeType, color }) => (themeType === 1 ? 'none' : `2px solid ${color}`)};
`;

export const TextLabel = styled(Text)`
  text-align: center;
  font-size: 18px;
  font-family: ${theme.fonts.AxiformaLight};
  color: #fff;
`;
