import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    Alert, View,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Back, Container, DeleteAccount, DeleteText, Header, Logout, PaddingView, Page, ProfilePic, UserInfo, UserName } from "./styles";
import { auth } from "../../services/firebase/firebase";
import { signOut, deleteUser } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setSessionLogged } from "../../redux/actions";
import { Icon } from "react-native-elements";
import BottomBar from "../../components/BottomBar";

const Profile = () => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch();

    const [currentUserName, setCurrentUserName] = useState<string | null>("");
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>("");
    const [currentUserUid, setCurrentUserUid] = useState<string | null>("");

    const handleChangeScreen = () => {
        navigation.navigate("Home");
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                dispatch<any>(setSessionLogged(true));
                navigation.navigate("Login");
            })
            .catch(error => Alert.alert(error.message))
    }

    const handleDeleteUser = () => {
        const user = auth.currentUser
        if (user) {
            deleteUser(user).then(() => {
                navigation.navigate("DeleteAccount");
            }).catch((error) => {
                Alert.alert(error.message)
            }).finally(() =>
            dispatch<any>(setSessionLogged(false))
        );
        }
    }

    useEffect(() => {
        if (auth.currentUser && auth.currentUser !== undefined) {
            setCurrentUserName(auth.currentUser.displayName);
            setCurrentUserEmail(auth.currentUser.email);
            setCurrentUserUid(auth.currentUser.uid);
        }
    }, [])

    return (
        <Container>
            <PaddingView>

                <Header>
                    <Back>
                        <Icon
                            name='long-arrow-left'
                            type='font-awesome'
                            color='#f00'
                            size={25}
                            onPress={handleChangeScreen}
                            tvParallaxProperties={undefined}
                        />
                        <Icon
                            name='users'
                            type='font-awesome'
                            color='#f00'
                            size={25}
                            tvParallaxProperties={undefined}
                        />
                        <Page>Profile</Page>
                    </Back>

                    <Logout onPress={handleSignOut}>
                        <FontAwesomeIcon icon={faSignOutAlt} color="#f00" size={25} />
                    </Logout>
                </Header>

                <UserInfo>
                    <ProfilePic />
                    <View>
                        <UserName>
                            {
                                currentUserName ?
                                    currentUserName :
                                    currentUserUid
                            }
                        </UserName>
                        <UserName>{currentUserEmail}</UserName>
                    </View>
                </UserInfo>

            </PaddingView>

            <DeleteAccount onPress={handleDeleteUser}>
                <DeleteText>Delete account</DeleteText>
            </DeleteAccount>

            <BottomBar />

        </Container>
    );
};

export default Profile;