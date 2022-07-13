import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Card from "../../components/Cards";
import { Icon } from 'react-native-elements';
import { sendGetRequestFilterId } from '../../services/requests';
import { Back, Container, Page, Scroll } from './styles';
import BottomBar from '../../components/BottomBar';
import { useDispatch } from 'react-redux';
import { setLoading, setTabSelected } from '../../redux/actions';
import { results } from '../../services/requests/charactersIds';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase/firestore';
import { useUid } from '../../hooks/providers/useUid';

export interface IData {
    results: {
        id: number;
        name: string;
        description: string;
        thumbnail: {
            path: string;
            extension: string;
        }
    }[]
}

const Characters = () => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const { uid } = useUid();

    const [list, setList] = useState<IData[]>([]);
    const [listFavs, setListFavs] = useState<number[]>([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch<any>(setTabSelected("Characters"));
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, []);

    useEffect(() => {
        results.length !== list?.length
            ? dispatch(setLoading(true))
            : dispatch(setLoading(false));
    }, [list]);

    const handleGoBack = () => {
        navigation.goBack();
    }

    const updateFavoritesDB = async (value: number, action: "add" | "remove") => {
        const userDoc = doc(db, "users", uid)

        updateDoc(userDoc, {
            favorites: action === "add" ? arrayUnion(value) : arrayRemove(value)
        })
            .then(() => {
                console.log("Success!");
            })
            .catch((err) => {
                console.error("Error updating document: ", err);
            })
    }

    useFocusEffect(
        useCallback(() => {
            async function getOList() {

                results.map((elem) => {
                    sendGetRequestFilterId('characters', elem.id).then((response) => {
                        if (response.data.status === 'Ok' && list) {
                            setList(oldArray => [...oldArray, response.data.data]);
                        } else {
                            Alert.alert('Erro', response.data.erro);
                        }
                    })
                        .catch((error) => {
                            if (error?.message === 'Network Error') {
                                Alert.alert('Network Error', 'Try again later');
                            } else {
                                Alert.alert('Error', 'Request failure');
                            }
                        })
                        .finally(() => {
                            dispatch<any>(setLoading(false));
                        })
                })
            }
            getOList();
        }, [],
        ),
    );

    const getOneUserDB = useCallback(async () => {

        dispatch(setLoading(true));
        const docRef = doc(db, "users", uid);

        getDoc(docRef)
            .then((response) => {
                if (response.exists()) {
                    setListFavs(response.data().favorites);
                } else {
                    console.log("No such document!");
                }
            })
            .catch((err) => {
                console.error(`[${err}] Error getting collection`);
            });
    }, []);

    useEffect(() => {
        if (uid) {
            getOneUserDB();
        }
    }, [getOneUserDB, uid])

    return (
        <Container>
            <Back>
                <Icon
                    name='long-arrow-left'
                    type='font-awesome'
                    color='#f00'
                    size={25}
                    onPress={handleGoBack}
                    tvParallaxProperties={undefined}
                />
                <Icon
                    name='users'
                    type='font-awesome'
                    color='#f00'
                    size={25}
                    tvParallaxProperties={undefined}
                />
                <Page>Characters</Page>
            </Back>

            <Scroll
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    justifyContent: "space-around"
                }}
            >
                {
                    results.length === list?.length && (
                        list?.map((e, index) => (
                            <Card
                                key={index}
                                name={e.results[0].name}
                                thumbnail={e.results[0].thumbnail?.path}
                                extension={e.results[0].thumbnail?.extension} description={e.results[0].description}
                                updateFavoritesDB={updateFavoritesDB}
                                characterId={e.results[0].id}
                                isFav={listFavs.includes(e.results[0].id) ? true : false}
                            />
                        ))
                    )
                }
            </Scroll>

            <BottomBar />

        </Container>
    )
}

export default Characters;