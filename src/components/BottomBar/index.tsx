import React from "react";
import { StyleProp, ViewStyle } from 'react-native';
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { setTabSelected } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Nav, Profile, TabName, TabSelected } from "./styles";

type Props = {
    style?: StyleProp<ViewStyle>;
}

const screens = [
    {
        screen: "Home",
        iconName: "home"
    },
    {
        screen: "Characters",
        iconName: "users"
    },
    {
        screen: "Favorites",
        iconName: "star"
    },
    {
        screen: "Profile",
        iconName: ""
    }
];

const BottomBar: React.FC<Props> = ({ style }) => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const { tabSelected }: any = useSelector<any>(state => state.useReducer);

    const handleChangePage = async (screen: string) => {
        try {
            await dispatch<any>(setTabSelected(screen));
        } catch (e) {
            console.log(e);
        } finally {
            navigation.navigate(screen);
        }
    }

    return (
        <Nav style={style}>
            {
                screens.map((elem, index) => (
                    <Button key={index} onPress={() => handleChangePage(elem.screen)}>
                        {
                            elem.screen !== "Profile" ?
                                <Icon
                                    name={elem.iconName}
                                    type='font-awesome'
                                    color={tabSelected === elem.screen ? "#fff" : "#888"}
                                    size={20} tvParallaxProperties={undefined}
                                /> :
                                <Profile style={{ backgroundColor: tabSelected === elem.screen ? "#fff" : "#888" }} />
                        }
                        {
                            tabSelected === elem.screen ?
                                (
                                    <TabSelected />
                                ) :
                                (
                                    <TabName>{elem.screen}</TabName>
                                )
                        }
                    </Button>
                ))
            }
        </Nav>
    );
}

export default BottomBar;