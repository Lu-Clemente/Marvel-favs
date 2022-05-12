import React from "react";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { About, Button, Circle, Heading, PageContainer, TextLogin, Welcome } from "./styles";
import theme from "../../helpers/theme";

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

            <Button onPress={handleGoLogin}>
                <TextLogin>
                    Nice!
                </TextLogin>
            </Button>

        </PageContainer>
    );
}

export default EmailOrientation;