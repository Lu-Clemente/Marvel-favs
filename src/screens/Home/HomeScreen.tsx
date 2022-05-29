import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Alert, BackHandler, Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomBar from '../../components/BottomBar';
import { setLoading, setTabSelected } from '../../redux/actions';
import { Btn, Container, Wrapper } from './styles';


const HomeScreen = () => {

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { tabSelected }: any = useSelector<any>(state => state.useReducer);

  useEffect(() => {
    dispatch<any>(setLoading(false));
  }, [])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch<any>(setTabSelected("Home"));
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  const handleClickCharacters = () => {
    navigation.navigate("Characters")
  }

  const handleClickMovies = () => {
    navigation.navigate("Movies")
  }

  useEffect(() => {
    if (tabSelected === "Home") {
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
          {
            text: "No",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Yes, let me out!", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }
  }, []);

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