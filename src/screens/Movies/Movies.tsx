import React from 'react';
import { useNavigation } from '@react-navigation/native';
import TabBar from "../../components/TabBar";
import Card from "../../components/Cards";
import { Icon } from 'react-native-elements';
import BottomBar from '../../components/BottomBar';
import { Back, Bullets, Container, Dots, Page, Wrapper } from './styles';

const Movies = () => {

    const navigation = useNavigation<any>();

    const handleClick = () => {
        navigation.replace("Home");
    }

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
                    name='film'
                    type='font-awesome'
                    color='#f00'
                    size={25}
                    tvParallaxProperties={undefined}
                />
                <Page>Filmes</Page>
            </Back>
            <Wrapper>
                <Card id={620} />
                <Card id={579} />
                <Card id={655} />
                <Card id={332} />
            </Wrapper>
            <Dots>
                <Bullets style={{ backgroundColor: "red" }} />
                <Bullets />
                <Bullets />
            </Dots>
            <BottomBar />
        </Container>
    )
}

export default Movies;