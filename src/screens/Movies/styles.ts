import {
    Text,
    View,
} from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
    height: 100%;
    width: 100%;
    flex: 1;
    background-color: #000;
    justify-content: space-between;
`;

export const Back = styled(View)`
    width: 60%;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    align-self: flex-start;
    flex-direction: row;
    color: red;
    margin: 15px 0;
    padding: 0 20px;
`;

export const Page = styled(Text)`
    color: white;
    font-size: 20px;
`;

export const Wrapper = styled(View)`
    justify-content: space-around;
    align-content: space-around;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`;

export const Dots = styled(View)`
    width: 50px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    margin-top: 20px;
`;

export const Bullets = styled(View)`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #555;
`;