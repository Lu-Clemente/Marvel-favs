import React, { useEffect } from "react";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import BasicButton from "../../../components/Buttons/Basic";
import Warning from "../../../components/Warnings";
import { BackHandler } from "react-native";

const PasswordChange = () => {
    const navigation = useNavigation<any>();

    const handleGoProfile = () => {
        navigation.navigate("Profile");
        return true;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            handleGoProfile
        );

        return () => backHandler.remove();
    }, []);

    return (
        <Warning
            icon={faUserSecret}
            iconSize={160}
            color="success"
            mainText="Your password has successfully been changed!"
        >
            <BasicButton
                lable="Nice!"
                themeType={2}
                color="success"
                triggerFunction={handleGoProfile}
            />
        </Warning>
    );
}

export default PasswordChange;