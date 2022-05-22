import React from "react";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { About, Circle, Heading, PageContainer, Welcome } from "./styles";
import theme from "../../helpers/theme";
import BasicButton from "../../components/Buttons/Basic";

const EmailOrientation = () => {
    const navigation = useNavigation<any>();

    const handleGoLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <PageContainer>

            <Circle>
                <FontAwesomeIcon icon={faMessage} color={theme.colors.success} size={160} />
            </Circle>

            <Welcome>
                <Heading>An email has been sent to you. Verify your inbox and redefine your password</Heading>
                <About>Find more about this app at: "https://github.com/Lu-Clemente/Marvel-favs"</About>
            </Welcome>

            <BasicButton
                lable="Nice!"
                themeType={2}
                color="success"
                triggerFunction={handleGoLogin}
            />

        </PageContainer>
    );
}

export default EmailOrientation;