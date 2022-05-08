import React from "react";
import styled from "styled-components";
import { StyleProp, ViewStyle } from 'react-native';
import { Icon } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { auth } from "../../services/firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { setSessionLogged } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Button, Nav, Profile } from "./styles";

type Props = {
    style?: StyleProp<ViewStyle>;
}

const BottomBar: React.FC<Props> = ({ style }) => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch();

    const handleChangePage = (screen: string) => {
        navigation.replace(screen)
    }

    return (
        <Nav style={style}>
            <Button onPress={() => handleChangePage("Home")}>
                <Icon
                    name='home'
                    type='font-awesome'
                    color='#fff'
                    size={25} tvParallaxProperties={undefined}
                />
            </Button>
            <Button onPress={() => handleChangePage("Characters")}>
                <Icon
                    name='users'
                    type='font-awesome'
                    color='#fff'
                    size={20} tvParallaxProperties={undefined}
                />
            </Button>
            <Button onPress={() => handleChangePage("Movies")}>
                <Icon
                    name='film'
                    type='font-awesome'
                    color='#fff'
                    size={20} tvParallaxProperties={undefined}
                />
            </Button>
            <Button onPress={() => handleChangePage("Profile")}>
                <Profile />
            </Button>
        </Nav>
    );
}

export default BottomBar;