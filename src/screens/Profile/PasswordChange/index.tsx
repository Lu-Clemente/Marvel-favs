import React from "react";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import BasicButton from "../../../components/Buttons/Basic";
import Warning from "../../../components/Warnings";

const PasswordChange = () => {
    const navigation = useNavigation<any>();

    const handleGoHome = () => {
        navigation.navigate("Profile");
    };

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
                triggerFunction={handleGoHome}
            />
        </Warning>
    );
}

export default PasswordChange;