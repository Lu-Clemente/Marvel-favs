import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import theme from "../../../helpers/theme";
import { Button, TextLogin } from "./styles";

type Props = {
    lable: string;
    color?: "error" | "success" | "warning";
    themeType?: 1 | 2;
    triggerFunction: () => void;
    style?: StyleProp<ViewStyle>;
}

const RoundedButton: React.FC<Props> = ({
    lable,
    color,
    themeType,
    triggerFunction,
    style
}) => {

    const mainColor = () => {
        switch (color) {
            case "error":
                return theme.colors.error;
            case "success":
                return theme.colors.success;
            case "warning":
                return theme.colors.warning;
            default:
                return theme.colors.primary;
        }
    }

    return (
        <Button
            onPress={triggerFunction}
            style={style}
            color={color ? mainColor() : "#f00"}
            themeType={themeType || 1}
        >
            <TextLogin>
                {lable}
            </TextLogin>
        </Button>
    )
}

export default RoundedButton;