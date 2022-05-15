import React from "react";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import Warning from "../../components/Warnings";

const EmailOrientation = () => {
    return (
        <Warning
            screenName="Login"
            icon={faMessage}
            iconSize={160}
            color="success"
            mainText="An email has been sent to you. Verify your inbox and redefine your password"
            buttonText="Nice!"
        />
    );
}

export default EmailOrientation;