import React from "react";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../helpers/theme";
import {
    About, Circle, Heading,
    PageContainer, Welcome
} from "./styles";
import BasicButton from "../../../components/Buttons/Basic";

const PasswordChange = () => {
    const navigation = useNavigation<any>();

    const handleGoHome = () => {
        navigation.navigate("Profile");
    };

    return (
        <PageContainer>

            <Circle>
                <FontAwesomeIcon icon={faUserSecret} color={theme.colors.success} size={160} />
            </Circle>

            <Welcome>
                <Heading>Your password has successfully been changed!</Heading>
                <About>Find more about this app at: "https://github.com/Lu-Clemente/Marvel-favs"</About>
            </Welcome>

            <BasicButton
                lable="Nice!"
                themeType={2}
                color="success"
                triggerFunction={handleGoHome}
            />

        </PageContainer>
    );
}

export default PasswordChange;