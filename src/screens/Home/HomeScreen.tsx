import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text } from 'react-native';
import BottomBar from '../../components/BottomBar';
import { Btn, Container, Wrapper } from './styles';


const HomeScreen = () => {

  const navigation = useNavigation<any>();

  const handleClickCharacters = () => {
    navigation.navigate("Characters")
  }

  const handleClickMovies = () => {
    navigation.navigate("Movies")
  }

  return (
    <Container>
      <Wrapper>
        <Btn onPress={handleClickCharacters}><Text style={{ color: "#fff", fontSize: 15 }}>Characters</Text></Btn>
        <Btn onPress={handleClickMovies}><Text style={{ color: "#fff", fontSize: 15 }}>Movies</Text></Btn>
      </Wrapper>
      <BottomBar />
    </Container>
  )
}

export default HomeScreen;