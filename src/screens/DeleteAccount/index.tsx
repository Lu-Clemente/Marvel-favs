import { useNavigation } from "@react-navigation/native";
import React from "react";
import { About, Circle, Heading, PageContainer, Welcome } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCancel } from '@fortawesome/free-solid-svg-icons';
import theme from "../../helpers/theme";
import BasicButton from "../../components/Buttons/Basic";

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

            <BasicButton
                lable="Goodbye"
                themeType={2}
                triggerFunction={handleGoLogin}
            />

        </PageContainer>
    );
};

export default DeleteAccount;