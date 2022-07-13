import {
    Text,
    View,
} from "react-native";
import styled from "styled-components";
import theme from "../../helpers/theme";

export const Container = styled(View)`
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    background-color: #000;
`;

export const Wrapper = styled(View)`
    justify-content: space-around;
    align-items: center;
    padding-top: 30px;
    width: 100%;
`;

export const WelcomeText = styled(Text)`
  font-family: ${theme.fonts.AxiformaRegular};
  font-size: 20px;
  color: #fff;
  margin-top: 20px;
  text-align: center;
`;