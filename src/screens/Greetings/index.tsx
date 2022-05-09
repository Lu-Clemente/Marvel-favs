import { useNavigation } from "@react-navigation/native";
import React from "react";
import { About, Button, Circle, Heading, PageContainer, TextLogin, Welcome } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import theme from "../../helpers/theme";

const Greetings = () => {

    const navigation = useNavigation<any>();

    const handleGoHome = () => {
        navigation.replace("Home");
    };


    return (
        <PageContainer>

            <Circle>
                <FontAwesomeIcon icon={faUserCheck} color={theme.colors.success} size={160} />
            </Circle>

            <Welcome>
                <Heading>Your registration was successfully completed!</Heading>
                <About>Find more about this app at: "https://github.com/Lu-Clemente/Marvel-favs"</About>
            </Welcome>

            <Button onPress={handleGoHome}>
                <TextLogin>
                    Let's go
                </TextLogin>
            </Button>

        </PageContainer>
    );
};

export default Greetings;