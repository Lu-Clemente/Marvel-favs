import React, { useEffect } from "react";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import BasicButton from "../../components/Buttons/Basic";
import Warning from "../../components/Warnings";
import { BackHandler } from "react-native";

const EmailOrientation = () => {
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
            icon={faMessage}
            iconSize={160}
            color="success"
            mainText="An email has been sent to you. Verify your inbox and redefine your password."
        >
            <BasicButton
                lable="Nice!"
                themeType={2}
                color="success"
                triggerFunction={handleGoLogin}
            />
        </Warning>
    );
}

export default EmailOrientation;