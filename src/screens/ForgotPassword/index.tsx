import { faChevronLeft, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import RoundedButton from "../../components/Buttons/Rounded";
import theme from "../../helpers/theme";
import { useAuthUser } from "../../hooks/providers/useAuthUser";
import {
    Container, ErrorText, UserInput, UserPass,
    Warning, WarningText, Wrapper
} from "./styles";

const ForgotPassword = () => {

    const navigation = useNavigation<any>();
    const { getForgetPassword } = useAuthUser();

    const [confirmEmail, setConfirmEmail] = useState("");
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorRequired, setErrorRequired] = useState(false);

    useEffect(() => {
        if (email && confirmEmail) {
            setErrorRequired(false);
        }
        if (email === confirmEmail) {
            setErrorEmail(false);
        }
    }, [email, confirmEmail]);

    const handleSendEmail = () => {
        if (!email || !confirmEmail) {
            setErrorRequired(true);
        } else if (email !== confirmEmail) {
            setErrorEmail(true);
        } else {
            getForgetPassword(confirmEmail, navigation);
        }
    }

    return (
        <Container>
            <Wrapper>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        width: 50,
                        marginLeft: "-10%"
                    }}
                >
                    <FontAwesomeIcon icon={faChevronLeft} color={theme.colors.warning} size={25} />
                </TouchableOpacity>

                <Warning>
                    <FontAwesomeIcon icon={faUserShield} color={theme.colors.warning} size={80} />
                    <WarningText>This action might take a few minutes to be processed</WarningText>
                </Warning>

                <UserPass>
                    <WarningText style={{ fontSize: 16, textAlign: "left" }}>Enter your registration email and confirm it</WarningText>

                    <UserInput
                        placeholder="Email"
                        value={confirmEmail}
                        onChangeText={(text) => setConfirmEmail(text)}
                        placeholderTextColor='gray'
                    />
                    <UserInput
                        placeholder="Confirm email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholderTextColor='gray'
                    />
                </UserPass>

                {errorEmail && <ErrorText>Emails don't match</ErrorText>}
                {errorRequired && <ErrorText>All fields are required</ErrorText>}
            </Wrapper>

            <RoundedButton
                lable="Confirm"
                themeType={2}
                color="warning"
                triggerFunction={handleSendEmail}
                style={{
                    marginTop: 15,
                    marginBottom: 35,
                    width: "90%",
                    alignSelf: "center"
                }}
            />
        </Container>
    );
}

export default ForgotPassword;