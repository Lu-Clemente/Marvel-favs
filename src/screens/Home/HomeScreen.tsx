import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, BackHandler, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomBar from '../../components/BottomBar';
import HeroBanner from '../../components/HeroBanner';
import { setLoading, setTabSelected } from '../../redux/actions';
import { db } from '../../services/firebase/firestore';
import { sendGetRequestFilterId } from '../../services/requests';
import { Container, WelcomeText, Wrapper } from './styles';

interface IData {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  }
}

const HomeScreen = () => {

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { tabSelected }: any = useSelector<any>(state => state.useReducer);

  const [chararacter, setChararacter] = useState<IData>();
  const todaysMonth = new Date().getMonth()+1;

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setTabSelected("Home"));
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

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

  const handleMonthName = useMemo(() => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date();

    return monthNames[date.getMonth()-1]
  }, [])

  const getCharacter = async (monthCharacter: number) => {
    sendGetRequestFilterId('characters', monthCharacter).then((response) => {
      if (response.data.status === 'Ok') {
        setChararacter(response.data.data.results[0]);
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
      })
  }

  const getMonthHero = useCallback(async () => {

    dispatch(setLoading(true));

    const docRef = doc(db, "monthHeros", `month${todaysMonth}`);

    getDoc(docRef)
      .then((response) => {
        if (response.exists()) {
          getCharacter(response.data().key);
        } else {
          console.log("No such document!");
        }
      })
      .catch((err) => {
        console.error(`[${err}] Error getting collection`);
      });
  }, []);

  useEffect(() => {
    getMonthHero();
  }, [getMonthHero])

  return (
    <Container>
      <Wrapper>
        <Image
          source={require('../../../assets/img/marvel_logo.png')}
          style={{ height: 50, width: 130 }}
          resizeMode="cover"
        />
        <WelcomeText>{`${handleMonthName}'s month hero`}</WelcomeText>
      </Wrapper>

      {
        chararacter && (
          <HeroBanner
            name={chararacter.name}
            thumbnail={chararacter.thumbnail?.path}
            extension={chararacter.thumbnail?.extension}
            description={chararacter.description}
          />
        )
      }

      <BottomBar />
    </Container>
  )
}

export default HomeScreen;