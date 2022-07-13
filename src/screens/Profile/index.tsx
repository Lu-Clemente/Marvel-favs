import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    Alert, TouchableOpacity, View,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faSignOutAlt, faWarning } from '@fortawesome/free-solid-svg-icons';
import {
    Back, Buttons, Container, ErrorText,
    Header, Logout, PaddingView, Page,
    PasswordModal, ProfilePic, UserInfo,
    UserInput, UserName, UserPass, Warning,
    WarningText
}
    from "./styles";
import { auth } from "../../services/firebase/firebase";
import { useDispatch } from "react-redux";
import { setLoading, setSessionLogged, setTabSelected } from "../../redux/actions";
import { Icon } from "react-native-elements";
import BottomBar from "../../components/BottomBar";
import { deleteUser, updatePassword } from "firebase/auth";
import theme from "../../helpers/theme";
import BasicButton from "../../components/Buttons/Basic";
import { useAuthUser } from "../../hooks/providers/useAuthUser";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase/firestore";
import { useUid } from "../../hooks/providers/useUid";

const Profile = () => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const {
        getReauthenticate,
        getSignOut
    } = useAuthUser();
    const { uid } = useUid();

    const [currentUserName, setCurrentUserName] = useState<string | null>("");
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>("");
    const [currentUserUid, setCurrentUserUid] = useState<string | null>("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [accountAction, setAccountAction] = useState('password');

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(setTabSelected("Profile"));
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (auth.currentUser && auth.currentUser !== undefined) {
            setCurrentUserName(auth.currentUser.displayName);
            setCurrentUserEmail(auth.currentUser.email);
            setCurrentUserUid(auth.currentUser.uid);
        }
    }, [])

    const deleteUserDB = async () => {
        const userDoc = doc(db, "users", uid);

        deleteDoc(userDoc)
            .then(() => {
                console.log("User successfully deleted");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleSignOut = () => {
        getSignOut(navigation);
    }

    const getUserDeleted = () => {

        dispatch(setLoading(true));

        getReauthenticate(currentUserEmail || '', currentPassword)
            ?.then(() => {
                const user = auth.currentUser;
                if (user) {
                    deleteUser(user)
                        .then(() => {
                            deleteUserDB();
                        })
                        .then(() => {
                            navigation.navigate("DeleteAccount");
                            dispatch(setSessionLogged(false));
                        })
                        .catch((error) => {
                            if (error?.message === 'Network Error') {
                                Alert.alert('Network Error', 'Try again later');
                            } else {
                                Alert.alert('Error', 'Request failure');
                                console.log(error)
                            }
                        })
                        .finally(() => {
                            dispatch(setLoading(false));
                        });
                }
            })
            .catch((err: any) => {
                console.log(err);
                setErrorPassword(true);
            })
            .finally(() => {
                dispatch(setLoading(false));
            })
    }

    const handleDeleteUser = () => {
        Alert.alert(
            "We don't want you to leave",
            "Are you sure you want to delete you account?",
            [
                {
                    text: "No, I'll stay",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Yes, I better go!", onPress: () => getUserDeleted() }
            ]);
        return;
    }

    const handleChangePassword = () => {
        dispatch(setLoading(true));

        getReauthenticate(currentUserEmail || '', currentPassword)?.then(() => {
            const user = auth.currentUser;
            if (user) {
                updatePassword(user, newPassword)
                    .then(() => {
                        setShowModal(false);
                        navigation.navigate("Profile");
                    })
                    .catch((error) => {
                        if (error?.message === 'Network Error') {
                            Alert.alert('Network Error', 'Try again later');
                        } else {
                            Alert.alert('Error', 'Request failure');
                        }
                    })
                    .finally(() => {
                        dispatch(setLoading(false));
                        setCurrentPassword("");
                        setNewPassword("");
                        navigation.navigate("PasswordChange");
                    })
            }
        }).catch((err: any) => {
            console.log(err);
            setErrorPassword(true);
        }).finally(() => {
            dispatch(setLoading(false));
        })
    }

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
                        triggerFunction={() => { setShowModal(true); setAccountAction("password") }}
                        style={{
                            width: "60%",
                            marginVertical: 15,
                        }}
                    />

                    <BasicButton
                        lable="Delete account"
                        triggerFunction={() => { setShowModal(true); setAccountAction("delete") }}
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

                            {
                                accountAction === "password"
                                    ? (
                                        <WarningText style={{ fontSize: 16 }}>Inform your current password and create a new password</WarningText>
                                    )
                                    : (
                                        <WarningText style={{ fontSize: 16 }}>Inform your current password</WarningText>
                                    )
                            }

                            <UserPass>
                                <UserInput
                                    placeholder="Current password"
                                    value={currentPassword}
                                    onChangeText={(text) => setCurrentPassword(text)}
                                    placeholderTextColor='gray'
                                    secureTextEntry
                                />
                                {
                                    accountAction === "password" && (
                                        <UserInput
                                            placeholder="New password"
                                            value={newPassword}
                                            onChangeText={(text) => setNewPassword(text)}
                                            placeholderTextColor='gray'
                                            secureTextEntry
                                        />
                                    )
                                }
                            </UserPass>

                            {errorPassword && <ErrorText>Incorrect current password</ErrorText>}

                            <BasicButton
                                lable="Confirm"
                                triggerFunction={
                                    accountAction === "password"
                                        ? handleChangePassword
                                        : handleDeleteUser
                                }
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