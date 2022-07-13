import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Card from "../../components/Cards";
import { Icon } from 'react-native-elements';
import { Back, Container, Page, PlaceholderCard, Scroll } from './styles';
import BottomBar from '../../components/BottomBar';
import { useDispatch } from 'react-redux';
import { setLoading, setTabSelected } from '../../redux/actions';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase/firestore';
import { sendGetRequestFilterId } from '../../services/requests';
import { Alert } from 'react-native';
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

const Favorites = () => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const { uid } = useUid();

    const [favorites, setFavorites] = useState<IData[]>([]);
    const [apiResults, setApiResults] = useState<number[]>([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(setTabSelected("Favorites"));
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, []);

    const handleGoBack = () => {
        navigation.goBack();
    }

    const getList = useCallback(async (arrayList: number[]) => {
        if (!arrayList || arrayList.length === 0) {
            return;
        }
        arrayList.map((elem) => {
            sendGetRequestFilterId('characters', elem)
                .then((response) => {
                    if (response.data.status === 'Ok' && favorites) {
                        setFavorites(oldArray => [...oldArray, response.data.data]);
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
                    dispatch(setLoading(false));
                });
        })
    }, [])

    const getOneUserDB = useCallback(async () => {

        dispatch(setLoading(true));
        const docRef = doc(db, "users", uid);

        getDoc(docRef)
            .then((response) => {
                if (response.exists()) {
                    setApiResults(response.data().favorites);
                    //getList(response.data().favorites);
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

    useEffect(() => {
        if (apiResults) {
            getList(apiResults)
        }
    }, [apiResults])

    const updateFavoritesDB = async (value: number, action: "add" | "remove") => {
        const userDoc = doc(db, "users", uid)

        updateDoc(userDoc, {
            favorites: action === "add" ? arrayUnion(value) : arrayRemove(value)
        })
            .then(() => {
                getOneUserDB()
            })
            .then(() => {
                console.log("Success updating Favs");
            })
            .catch((err) => {
                console.error("Error adding document: ", err);
            })
    }

    return (
        <Container apiResults={apiResults}>
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
                    name='film'
                    type='font-awesome'
                    color='#f00'
                    size={25}
                    tvParallaxProperties={undefined}
                />
                <Page>Favorites</Page>
            </Back>

            <Scroll
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    flexDirection: apiResults.length <= 2 ? "row" : "column",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    alignItems: "center"
                }}
            >
                {
                    apiResults?.length === favorites?.length && (
                        favorites?.map((e, index) => (
                            <Card
                                key={index}
                                name={e.results[0].name}
                                thumbnail={e.results[0].thumbnail?.path}
                                extension={e.results[0].thumbnail?.extension} description={e.results[0].description}
                                updateFavoritesDB={updateFavoritesDB}
                                characterId={e.results[0].id}
                                isFav={apiResults.includes(e.results[0].id) ? true : false}
                            />
                        ))
                    )
                }
                {
                    apiResults.length === 3 && (
                        <PlaceholderCard />
                    )
                }
            </Scroll>

            <BottomBar />

        </Container>
    )
}

export default Favorites;