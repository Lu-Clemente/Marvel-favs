/* eslint-disable no-unused-expressions */
import { getDocs } from 'firebase/firestore';
import React, {
    createContext, useContext, useState
} from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/actions';
import { usersCollection } from '../../services/firebase/firestore';
import { auth } from '../../services/firebase/firebase';
import { Alert } from 'react-native';

interface UidContextData {
    uid: string;
    getUserData: (email?: string) => void;
}

const UidContext = createContext<UidContextData>({} as UidContextData);

const UidProvider = function ({ children }: { children: any }) {

    const dispatch = useDispatch();
    const [uid, setUid] = useState("");

    React.useEffect(() => {
        if (uid) {
            console.log("Uid: " + uid);
        }
    }, [uid])

    const getUserData = async (userEmail = "") => {

        if (userEmail === "" && (auth.currentUser === null && auth.currentUser === undefined)) {
            Alert.alert('Error', 'Something went wrong...');
        }

        const email = (auth.currentUser && auth.currentUser !== undefined) ? auth.currentUser.email : userEmail;

        dispatch(setLoading(true));

        getDocs(usersCollection)
            .then((response) => {
                response.forEach((doc) => {
                    if (doc.data().email === email) {
                        setUid(doc.id);
                    } else {
                        dispatch(setLoading(false));
                        return;
                    }
                })
            })
            .catch((err) => {
                console.error(`[${err}] Error getting collection`);
            })
            .finally(() => dispatch(setLoading(false)));
    }

    return (
        <UidContext.Provider
            value={{
                getUserData,
                uid
            }}
        >
            {children}
        </UidContext.Provider>
    );
};

function useUid(): UidContextData {
    const context = useContext(UidContext);

    return context;
}

export { UidProvider, useUid };  