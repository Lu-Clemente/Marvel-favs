import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Image, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import BottomBar from '../../components/BottomBar';
import { setLoading } from '../../redux/actions';
import { Btn, Container, Wrapper } from './styles';


const HomeScreen = () => {

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(setLoading(false));
  }, [])

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
      <Image
            source={require('../../../assets/img/marvel_logo.png')}
            style={{ height: 80, width: 200 }}
            resizeMode="cover"
          />
      <BottomBar />
    </Container>
  )
}

export default HomeScreen;