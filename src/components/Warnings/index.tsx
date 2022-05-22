import React from "react";
import { About, Circle, Heading, PageContainer, Welcome } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import theme from "../../helpers/theme";

type Props = {
    icon: IconDefinition;
    iconSize: number;
    color: "error" | "success" | "warning" | "primary";
    mainText: string;
    outline?: boolean;
}

const Warning: React.FC<Props> = ({
    icon,
    iconSize,
    color,
    mainText,
    outline,
    children
}) => {

    const mainColor = () => {
        switch (color) {
            case "error":
                return theme.colors.error;
            case "success":
                return theme.colors.success;
            case "warning":
                theme.colors.warning;
            default:
                return theme.colors.primary;
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

            {children}

        </PageContainer>
    );
};

export default Warning;