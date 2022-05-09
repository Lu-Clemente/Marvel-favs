import { useNavigation } from "@react-navigation/native";
import React from "react";
import { About, Button, Circle, Heading, PageContainer, TextLogin, Welcome } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCancel } from '@fortawesome/free-solid-svg-icons';
import theme from "../../helpers/theme";

const DeleteAccount = () => {

    const navigation = useNavigation<any>();

    const handleGoLogin = () => {
        navigation.navigate("Login");
    };


    return (
        <PageContainer>

            <Circle>
                <FontAwesomeIcon icon={faCancel} color={theme.colors.error} size={160} />
            </Circle>

            <Welcome>
                <Heading>Your account was successfully deleted!</Heading>
                <About>Find more about this app at: "https://github.com/Lu-Clemente/Marvel-favs"</About>
            </Welcome>

            <Button onPress={handleGoLogin}>
                <TextLogin>
                    Goodbye
                </TextLogin>
            </Button>

        </PageContainer>
    );
};

export default DeleteAccount;