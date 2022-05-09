import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Card from "../../components/Cards";
import { Icon } from 'react-native-elements';
import { Back, Bullets, Container, Dots, Page, Wrapper } from './styles';
import BottomBar from '../../components/BottomBar';

const Movies = () => {

    const navigation = useNavigation<any>();

    const handleClick = () => {
        navigation.navigate("Home");
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
                <Card name={''} />
                <Card name={''} />
                <Card name={''} />
                <Card name={''} />
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