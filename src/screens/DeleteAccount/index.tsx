import React from "react";
import { faCancel } from '@fortawesome/free-solid-svg-icons';
import Warning from "../../components/Warnings";

const DeleteAccount = () => {

    return (
        <Warning
            screenName="Login"
            icon={faCancel}
            iconSize={160}
            color="error"
            mainText="Your account was successfully deleted!"
            buttonText="Goodbye"
        />
    );
};

export default DeleteAccount;