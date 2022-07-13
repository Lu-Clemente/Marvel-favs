import {
    Dimensions,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import styled from "styled-components";
import theme from "../../helpers/theme";

const { width, height } = Dimensions.get("window");

export const Container = styled(View)`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: ${height * 60 / 100}px;
    width: ${width - 50}px;
    padding-top: 0;
    background-color: #343436;
    border-radius: 35px;
    margin: 5px 10px;
`;

export const Box = styled(TouchableOpacity)`
    width: ${width - 50}px;
    height: ${height * 15 / 100}px;
    background-color: rgba(255,0,0,.65);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    align-self: flex-end;
    border-radius: 35px;
`;

export const Name = styled(Text)`
    color: white;
    font-size: 25px;
    text-align: center;
    font-weight: 700;
`;

export const Bio = styled(Text)`
    color: #f00;
    font-size: 14px;
    line-height: 20px;
    text-align: justify;
`;

export const SeeDetails = styled(Text)`
    color: white;
    font-size: 18px;
    text-align: center;
    font-family: ${theme.fonts.AxiformaRegular};
`;

export const ModalDetail = styled(View)`
    height: 100%;
    width: 100%;
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
`;

export const Wrapper = styled(View)`
    width: 80%;
    height: 70%;
    border-radius: 35px;
    align-self: center;
    margin: auto 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
`;

export const Fav = styled(TouchableOpacity)`
    position: absolute;
    right: 15px;
    top: 15px;
    background-color: #444;
    padding: 10px;
    border-radius: 35px;
`;

export const Stats = styled(View)`
    width: 100%;
    padding: 15px;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    font-family: ${theme.fonts.AxiformaRegular};
`;

export const HeroName = styled(Text)`
    color: #f00;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const Close = styled(TouchableOpacity)`
    width: 100%;
    align-self: center;
    background-color: #f00;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 35px;
    border-bottom-right-radius: 35px;
    height: 50px;
`;

export const CloseText = styled(Text)`
    color: #fff;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
`;