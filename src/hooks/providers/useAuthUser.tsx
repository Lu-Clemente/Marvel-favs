/* eslint-disable no-unused-expressions */
import React, {
    createContext, useContext
} from 'react';
import { useDispatch } from 'react-redux';
import { setLoading, setSessionLogged } from '../../redux/actions';
import { auth } from '../../services/firebase/firebase';
import { Alert } from 'react-native';
import {
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut, UserCredential
} from 'firebase/auth';

interface AuthUserContextData {
    getSignOut: (navigation: any) => void;
    getUserDeleted: (navigation: any) => void;
    getReauthenticate: (email: string, password: string) => Promise<UserCredential> | undefined;
    getSignIn: (email: string, password: string, getUserData: (email?: string | undefined) => void) => void;
    getForgetPassword: (email: string, navigation: any) => void;
    getCreateUser: (email: string, password: string, addUserDB: (email: string) => Promise<void>) => void;
}

const AuthUserContext = createContext<AuthUserContextData>({} as AuthUserContextData);

const AuthUserProvider = function ({ children }: { children: any }) {

    const dispatch = useDispatch();

    const getSignOut = (navigation: any) => {

        dispatch(setLoading(true));

        signOut(auth)
            .then(() => {
                dispatch(setSessionLogged(false));
                navigation.navigate("Login");
            })
            .catch((error) => {
                if (error?.message === 'Network Error') {
                    Alert.alert('Network Error', 'Try again later');
                } else {
                    Alert.alert('Error', 'Request failure');
                }
            })
            .finally(() => dispatch(setLoading(false)))
    }

    const getUserDeleted = (navigation: any) => {

        dispatch(setLoading(true));

        const user = auth.currentUser;

        if (user) {
            deleteUser(user).then(() => {
                navigation.navigate("DeleteAccount");
                dispatch(setSessionLogged(false));
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
                });
        }
    }

    const getReauthenticate = (currentUserEmail: string, currentPassword: string) => {
        if (currentUserEmail && auth.currentUser && currentPassword) {

            const user = auth.currentUser;
            const cred = EmailAuthProvider.credential(currentUserEmail, currentPassword);

            return reauthenticateWithCredential(user, cred);
        }
    }

    const getSignIn = (email: string, password: string, getUserData: (email?: string | undefined) => void) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                getUserData(email);
                console.log("Logged in with:", userCredentials.user.email);
            })
            .catch((error) => {
                if (error?.message === 'Network Error') {
                    Alert.alert('Network Error', 'Try again later');
                } else {
                    Alert.alert('Login failed', 'Incorrect credentials');
                }
            })
            .finally(() => dispatch(setLoading(false)));
    }

    const getForgetPassword = (email: string, navigation: any) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                navigation.navigate("EmailOrientation");
            })
            .catch((error) => {
                if (error?.message === 'Network Error') {
                    Alert.alert('Network Error', 'Try again later');
                } else {
                    Alert.alert('Failed', 'Invalid email');
                }
            })
            .finally(() => dispatch(setLoading(false)));
    }

    const getCreateUser = (email: string, password: string, addUserDB: (email: string) => Promise<void>) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Registered with:", user.email);
            })
            .catch((error) => {
                if (error?.message === 'Network Error') {
                    Alert.alert('Network Error', 'Try again later');
                } else {
                    Alert.alert('Error', 'Request failure');
                }
            })
            .finally(() => addUserDB(email))
    }

    return (
        <AuthUserContext.Provider
            value={{
                getSignOut,
                getUserDeleted,
                getReauthenticate,
                getSignIn,
                getForgetPassword,
                getCreateUser
            }}
        >
            {children}
        </AuthUserContext.Provider>
    );
};

function useAuthUser(): AuthUserContextData {
    const context = useContext(AuthUserContext);

    return context;
}

export { AuthUserProvider, useAuthUser };