import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import styled from "styled-components";
import theme from "../../helpers/theme";

export const Nav = styled(View)`
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 0;
    border-top-color:#444;
    border-top-width: 1px;
    background-color: #000;
`;

export const Button = styled(TouchableOpacity)`
    width: 20%;
    align-items: center;
    justify-content: center;
`;

export const Profile = styled(View)`
    height: 25px;
    width: 25px;
    border-radius: 12.5px;
    background-color: #888;
`;

export const TabName = styled(Text)`
    font-family: ${theme.fonts.AxiformaRegular};
    font-size: 12px;
    color: #ddd;
`;

export const TabSelected = styled(View)`
    height: 5px;
    width: 15px;
    background-color: #f00;
    margin-top: 5px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;