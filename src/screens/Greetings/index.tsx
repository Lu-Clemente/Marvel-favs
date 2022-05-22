import { useNavigation } from "@react-navigation/native";
import React from "react";
import { About, Circle, Heading, PageContainer, Welcome } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import theme from "../../helpers/theme";
import BasicButton from "../../components/Buttons/Basic";

const Greetings = () => {

    const navigation = useNavigation<any>();

    const handleGoHome = () => {
        navigation.navigate("Home");
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

            <BasicButton
                lable="Let's go"
                themeType={2}
                color="success"
                triggerFunction={handleGoHome}
            />

        </PageContainer>
    );
};

export default Greetings;