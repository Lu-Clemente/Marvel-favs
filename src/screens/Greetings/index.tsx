import React from "react";
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import Warning from "../../components/Warnings";

const Greetings = () => {
    return (
        <Warning
            screenName="Home"
            icon={faUserCheck}
            iconSize={160}
            color="success"
            mainText="Your registration was successfully completed!"
            buttonText="Let's go"
            outline
        />
    );
};

export default Greetings;