import {
    View,
} from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
    flex: 1;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,.7);
    z-index: 10;
`;