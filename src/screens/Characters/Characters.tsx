import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import TabBar from "../../components/TabBar";
import Card from "../../components/Cards";
import { Icon } from 'react-native-elements';
import { sendGetRequestPages } from '../../services/requests';
import BottomBar from '../../components/BottomBar';
import { ArrowWrapper, Back, Container, Page, Scroll } from './styles';

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

const { width } = Dimensions.get("window");

const Characters = () => {

    const navigation = useNavigation<any>();
    const scrollViewRef = useRef<ScrollView>();

    const handleClick = () => {
        navigation.replace("Home");
    }

    const [isActive, setIsActive] = useState(0);
    const [list, setList] = useState<IData>();
    const [list2, setList2] = useState<IData>();
    const [list3, setList3] = useState<IData>();
    const [currentXOffset, setCurrentXOffset] = useState(0);
    const [requestIndex, setRequestIndex] = useState(0);
    const [count, setCount] = useState(1);
    const [scrollViewWidth, setScrollViewWidth] = useState(0);

    const handleChange = ({ nativeEvent }: any) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide != isActive) {
            setIsActive(isActive);
        }
    }

    function getOList(offset: number, limit: number) {
        sendGetRequestPages('characters', offset, limit).then((response) => {
            if (response.data.status === 'Ok') {
                if (requestIndex === 0) {
                    setList(response.data.data);
                } else if (requestIndex === 1) {
                    setList2(response.data.data);
                } else if (requestIndex === 2) {
                    setList3(response.data.data);
                }
            } else {
                Alert.alert('Erro', response.data.erro);
            }
        }).catch((error) => {
            if (error?.message === 'Network Error') {
                Alert.alert('Falha na rede.', 'Verifique sua conexão e tente novamente.');
            } else {
                Alert.alert('Erro', 'A requisição falhou');
            }
        });
    }

    const handleNext = () => {
        switch (requestIndex) {
            case 0: {
                getOList(0, 100);
                break;
            }
            case 1: {
                getOList(100, 100);
                break;
            }
            case 2: {
                getOList(200, 100);
                break;
            }
            case 3: {
                getOList(300, 100);
                break;
            }
            case 4: {
                getOList(400, 100);
                break;
            }
            case 5: {
                getOList(500, 100);
                break;
            }
            case 6: {
                getOList(600, 100);
                break;
            }
            case 7: {
                getOList(700, 100);
                break;
            }
            case 8: {
                getOList(800, 100);
                break;
            }
            case 9: {
                getOList(900, 100);
                break;
            }
            case 10: {
                getOList(1000, 100);
                break;
            }
            case 11: {
                getOList(1100, 100);
                break;
            }
            case 12: {
                getOList(1200, 100);
                break;
            }
            case 13: {
                getOList(1300, 100);
                break;
            }
            case 14: {
                getOList(1400, 100);
                break;
            }
            case 15: {
                getOList(1500, 100);
                break;
            }
            case 16: {
                getOList(1600, 100);
                break;
            }
            default: return 0;
        }
        return 0;
    }

    useFocusEffect(
        useCallback(() => {
            async function getOList(offset: number, limit: number) {
                sendGetRequestPages('characters', offset, limit).then((response) => {
                    if (response.data.status === 'Ok') {
                        setList(response.data.data);
                    } else {
                        Alert.alert('Erro', response.data.erro);
                    }
                }).catch((error) => {
                    if (error?.message === 'Network Error') {
                        Alert.alert('Falha na rede.', 'Verifique sua conexão e tente novamente.');
                    } else {
                        Alert.alert('Erro', 'A requisição falhou');
                    }
                });
            }
            getOList(0, 100);
        }, [],
        ),
    );

    // useEffect(() => {
    //     list?.results.map((e) => console.log(e.name))
    //     list2?.results.map((e) => console.log(e.name))
    // }, [list?.results, list2?.results])

    const handleScroll = (event: any) => {
        // console.log('currentXOffset =', event.nativeEvent.contentOffset.x);
        let newXOffset = event.nativeEvent.contentOffset.x;
        if (newXOffset > currentXOffset) {
            setCount(count + 1);
        } else {
            setCount(count - 1);
        }
        setCurrentXOffset(newXOffset);
    }

    const handleRequestIndex = () => {
        setRequestIndex(requestIndex + 1);
    }

    useEffect(() => {
        handleNext();
    }, [requestIndex]);

    const handleFinalScroll = () => {
        if (currentXOffset >= width * 25 && list2) {
            scrollViewRef.current?.scrollTo({ x: currentXOffset + 200, animated: true })
        }
    }

    useEffect(() => {
        handleFinalScroll();
    }, [list2])


    return (
            <Container>
                <Back>
                    <Icon
                        name='long-arrow-left'
                        type='font-awesome'
                        color='#f00'
                        size={25}
                        onPress={handleClick}
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

                <ArrowWrapper>
                    <Scroll
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        onContentSizeChange={(w, h) => setScrollViewWidth(w)}
                        contentContainerStyle={{
                            flexDirection: "column",
                            flexWrap: "wrap"
                        }}
                        ref={scrollViewRef as any}
                    >
                        {
                            list?.results.map((e, index) => (
                                <Card name={e.name} thumbnail={e.thumbnail?.path} extension={e.thumbnail?.extension} description={e.description} key={index} />
                            ))
                        }
                        {
                            list2?.results.map((e, index) => (
                                <Card name={e.name} thumbnail={e.thumbnail?.path} extension={e.thumbnail?.extension} key={index} />
                            ))
                        }
                        {
                            list3?.results.map((e, index) => (
                                <Card name={e.name} thumbnail={e.thumbnail?.path} extension={e.thumbnail?.extension} key={index} />
                            ))
                        }
                    </Scroll>

                    <TouchableOpacity
                        onPress={handleRequestIndex}
                        style={{
                            alignSelf: "center"
                        }}
                    >
                        <Icon
                            name='arrow-right'
                            type='font-awesome'
                            color='#f00'
                            size={25}
                            tvParallaxProperties={undefined}
                        />
                    </TouchableOpacity>
                </ArrowWrapper>

                <BottomBar />

            </Container>
    )
}

export default Characters;