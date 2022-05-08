import {
    TouchableOpacity,
    View,
} from "react-native";
import styled from "styled-components";

export const Button = styled(TouchableOpacity)`
    width: 40px;
    align-items: center;
    justify-content: center;
`;

export const Nav = styled(View)`
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 0;
    border-top-color:#444;
    border-top-width: 1px;
`;

export const Profile = styled(View)`
    height: 30px;
    width: 30px;
    border-radius: 15px;
    background-color: #fff;
`;