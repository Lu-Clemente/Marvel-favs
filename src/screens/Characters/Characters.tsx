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

    const [list, setList] = useState<IData[]>([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch<any>(setTabSelected("Characters"));
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, []);

    useEffect(() => {
        results.length !== list?.length
        ?
        dispatch<any>(setLoading(true))
        :
        dispatch<any>(setLoading(false));
    }, [list]);

    const handleGoBack = () => {
        navigation.goBack();
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