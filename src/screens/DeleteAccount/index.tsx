import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { faCancel } from '@fortawesome/free-solid-svg-icons';
import BasicButton from "../../components/Buttons/Basic";
import Warning from "../../components/Warnings";
import { BackHandler } from "react-native";

const DeleteAccount = () => {

    const navigation = useNavigation<any>();

    const handleGoLogin = () => {
        navigation.navigate("Login");
        return true;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            handleGoLogin
        );

        return () => backHandler.remove();
    }, []);

    return (
        <Warning
            icon={faCancel}
            iconSize={160}
            color="error"
            mainText="Your account was successfully deleted!"
        >
            <BasicButton
                lable="Goodbye"
                themeType={2}
                triggerFunction={handleGoLogin}
            />
        </Warning>
    );
};

export default DeleteAccount;