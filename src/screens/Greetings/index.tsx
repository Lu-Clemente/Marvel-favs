import { useNavigation } from "@react-navigation/native";
import React from "react";
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import BasicButton from "../../components/Buttons/Basic";
import Warning from "../../components/Warnings";

const Greetings = () => {

    const navigation = useNavigation<any>();

    const handleGoHome = () => {
        navigation.navigate("Home");
    };

    return (
        <Warning
            icon={faUserCheck}
            iconSize={140}
            color="success"
            mainText="Your registration was successfully completed!"
            outline
        >
            <BasicButton
                lable="Let's go"
                themeType={2}
                color="success"
                triggerFunction={handleGoHome}
            />
        </Warning>
    );
};

export default Greetings;