import {
    ScrollView,
    Text,
    View,
} from "react-native";
import styled from "styled-components";

export const Container = styled(View)<{apiResults: number[]}>`
    justify-content: space-between;
    align-items: ${({ apiResults }) => apiResults.length <= 4 ? "center" : "flex-start"};
    
    height: 100%;
    width: 100%;
    background-color: #000;
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

export const Scroll = styled(ScrollView)`
    height: 500px;
`;