import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import BasicButton from "../../components/Buttons/Basic";
import Warning from "../../components/Warnings";
import { Alert, BackHandler } from "react-native";
import { setLoading, setSessionLogged } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase/firebase";

const Greetings = () => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch();

    const handleGoHome = () => {
        navigation.navigate("Home");
    };

    const handleSignOut = () => {

        dispatch<any>(setLoading(true));

        signOut(auth)
            .then(() => {
                dispatch<any>(setSessionLogged(false));
                navigation.navigate("Login");
            })
            .catch((error) => {
              if (error?.message === 'Network Error') {
                  Alert.alert('Network Error', 'Try again later');
              } else {
                  Alert.alert('Error', 'Request failure');
              }
          })
            .finally(() => dispatch(setLoading(false)))
    }

    useEffect(() => {
        const backAction = () => {
          Alert.alert("Hold on!", "This action will log you out, are you sure?", [
            {
              text: "No",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Yes, let me out!", onPress: () => handleSignOut() }
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    return (
        <Warning
            icon={faUserCheck}
            iconSize={140}
            color="success"
            mainText="Your registration was successfully completed!"
            outline
        >
            <BasicButton
                lable="Let's go"
                themeType={2}
                color="success"
                triggerFunction={handleGoHome}
            />
        </Warning>
    );
};

export default Greetings;