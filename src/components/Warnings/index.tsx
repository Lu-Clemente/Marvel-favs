import { useNavigation } from "@react-navigation/native";
import React from "react";
import { About, Button, Circle, Heading, PageContainer, TextLogin, Welcome } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import theme from "../../helpers/theme";

type Props = {
    screenName: string;
    icon: IconDefinition;
    iconSize: number;
    color: "error" | "success" | "warning" | "primary";
    mainText: string;
    buttonText: string;
    outline?: boolean;
}

const Warning: React.FC<Props> = ({
    screenName,
    icon,
    iconSize,
    color,
    mainText,
    buttonText,
    outline
}) => {

    const navigation = useNavigation<any>();

    const handleChangeScreen = () => {
        navigation.navigate(screenName);
    };

    const mainColor = () => {
        if (color === "error") {
            return theme.colors.error;
        } else if (color === "success") {
            return theme.colors.success;
        } else if (color === "warning") {
            return theme.colors.warning;
        } else {
            return theme.colors.primary
        }
    }

    return (
        <PageContainer>

            <Circle outline={outline ? true : false} color={mainColor()}>
                <FontAwesomeIcon
                    icon={icon}
                    color={mainColor()}
                    size={iconSize}
                />
            </Circle>

            <Welcome>
                <Heading>{mainText}</Heading>
                <About>Find more about this app at: "https://github.com/Lu-Clemente/Marvel-favs"</About>
            </Welcome>

            <Button
                onPress={handleChangeScreen}
                color={mainColor()}
            >
                <TextLogin>{buttonText}</TextLogin>
            </Button>

        </PageContainer>
    );
};

export default Warning;