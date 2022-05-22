import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    Alert, TouchableOpacity, View,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faSignOutAlt, faWarning } from '@fortawesome/free-solid-svg-icons';
import { Back, Buttons, Container, ErrorText, Header, Logout, PaddingView, Page, PasswordModal, ProfilePic, UserInfo, UserInput, UserName, UserPass, Warning, WarningText } from "./styles";
import { auth } from "../../services/firebase/firebase";
import { signOut, deleteUser } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLoading, setSessionLogged, setTabSelected } from "../../redux/actions";
import { Icon } from "react-native-elements";
import BottomBar from "../../components/BottomBar";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import theme from "../../helpers/theme";
import BasicButton from "../../components/Buttons/Basic";

const Profile = () => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch();

    const [currentUserName, setCurrentUserName] = useState<string | null>("");
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>("");
    const [currentUserUid, setCurrentUserUid] = useState<string | null>("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch<any>(setTabSelected("Profile"));
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, []);

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleSignOut = () => {

        dispatch<any>(setLoading(true));

        signOut(auth)
            .then(() => {
                dispatch<any>(setSessionLogged(false));
                navigation.navigate("Login");
            })
            .catch(error => Alert.alert(error.message))
            .finally(() => dispatch<any>(setLoading(false)))
    }

    const handleDeleteUser = () => {
        dispatch<any>(setLoading(true));
        const user = auth.currentUser;

        if (user) {
            deleteUser(user).then(() => {
                navigation.navigate("DeleteAccount");
            }).catch((error) => {
                Alert.alert(error.message)
            }).finally(() => {
                dispatch<any>(setSessionLogged(false));
                dispatch<any>(setLoading(false));
            }
            );
        }
    }

    const reauthenticate = () => {
        if (currentUserEmail && auth.currentUser && currentPassword) {

            const user = auth.currentUser;
            const cred = EmailAuthProvider.credential(currentUserEmail, currentPassword);

            return reauthenticateWithCredential(user, cred);
        }
    }

    const handleChangePassword = () => {
        dispatch<any>(setLoading(true));

        reauthenticate()?.then(() => {
            const user = auth.currentUser;
            if (user) {
                updatePassword(user, newPassword)
                    .then(() => {
                        console.log("OK");
                        setShowModal(false);
                        navigation.navigate("Profile");
                    })
                    .catch((error: any) => {
                        console.log(error);
                    })
                    .finally(() => {
                        dispatch<any>(setLoading(false));
                        navigation.navigate("PasswordChange");
                    })
            }
        }).catch((err: any) => {
            console.log(err);
            setErrorPassword(true);
        })
            .finally(() => {
                dispatch<any>(setLoading(false));
            })
    }

    useEffect(() => {
        if (auth.currentUser && auth.currentUser !== undefined) {
            setCurrentUserName(auth.currentUser.displayName);
            setCurrentUserEmail(auth.currentUser.email);
            setCurrentUserUid(auth.currentUser.uid);
        }
    }, [])

    return (
        <Container modalOpen={showModal}>
            <PaddingView>

                <Header>
                    <Back>
                        <Icon
                            name='long-arrow-left'
                            type='font-awesome'
                            color='#f00'
                            size={25}
                            onPress={handleGoBack}
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
                                currentUserName ? currentUserName
                                    : currentUserUid
                            }
                        </UserName>
                        <UserName>{currentUserEmail}</UserName>
                    </View>
                </UserInfo>

            </PaddingView>



            <View>
                <Buttons>
                    <BasicButton
                        lable="Change password"
                        triggerFunction={() => setShowModal(true)}
                        style={{
                            width: "60%",
                            marginVertical: 15,
                        }}
                    />

                    <BasicButton
                        lable="Delete account"
                        triggerFunction={handleDeleteUser}
                        themeType={2}
                        style={{
                            width: "60%",
                            marginTop: 15,
                            marginBottom: 25,
                        }}
                    />
                </Buttons>

                {
                    showModal && (
                        <PasswordModal collapsable>
                            <TouchableOpacity
                                onPress={() => setShowModal(false)}
                                style={{ paddingHorizontal: 10, paddingVertical: 5, width: 50 }}
                            >
                                <FontAwesomeIcon icon={faChevronDown} color="#f00" size={25} />
                            </TouchableOpacity>

                            <Warning>
                                <FontAwesomeIcon icon={faWarning} color={theme.colors.warning} size={50} />
                                <WarningText>Warning: this operation can't be undone</WarningText>
                            </Warning>

                            <WarningText style={{ fontSize: 16 }}>Inform your current password and create a new password</WarningText>

                            <UserPass>
                                <UserInput
                                    placeholder="Current password"
                                    value={currentPassword}
                                    onChangeText={(text) => setCurrentPassword(text)}
                                    placeholderTextColor='gray'
                                    secureTextEntry
                                />
                                <UserInput
                                    placeholder="New password"
                                    value={newPassword}
                                    onChangeText={(text) => setNewPassword(text)}
                                    placeholderTextColor='gray'
                                    secureTextEntry
                                />
                            </UserPass>

                            {errorPassword && <ErrorText>Incorrect current password</ErrorText>}

                            <BasicButton
                                lable="Confirm"
                                triggerFunction={handleChangePassword}
                                style={{
                                    width: "60%",
                                    marginVertical: 15,
                                }}
                            />
                        </PasswordModal>
                    )
                }

                {!showModal && <BottomBar />}
            </View>

        </Container>
    );
};

export default Profile;