import {
    TouchableOpacity,
    View,
} from "react-native";
import styled from "styled-components";

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
    flex-direction: row;
    padding-top: 30px;
    width: 100%;
`;

export const Btn = styled(TouchableOpacity)`
  width: 120px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: 2px solid #f00;
  border-radius: 10px;
`;