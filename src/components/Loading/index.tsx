import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { Container } from './styles';

const Loading = () => {

    const { loading } : any = useSelector<any>(state => state.useReducer);

    return (
        loading &&
        <Container>
            <ActivityIndicator size={42} color='#f00' />
        </Container>
    )
}

export default Loading;