import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUp from "../screens/SignUp/SignUp"
import Characters from '../screens/Characters/Characters';
import Movies from '../screens/Movies/Movies';
import Greetings from '../screens/Greetings';
import Profile from '../screens/Profile';
import BottomBar from '../components/BottomBar';
import DeleteAccount from '../screens/DeleteAccount';

const Stack = createStackNavigator();

type Props = {
    onLayoutRootView: () => void;
}

const InitialStackScreen = () => (
    <Stack.Navigator
        screenOptions={{
            headerMode: 'screen',
            gestureEnabled: true,
            headerShown: false
        }}
    >
        <Stack.Screen
            name="Login"
            component={LoginScreen}
        />
        <Stack.Screen
            name="Home"
            component={HomeScreen}
        />
        <Stack.Screen
            name="SignUp"
            component={SignUp}
        />
        <Stack.Screen
            name="Characters"
            component={Characters}
        />
        <Stack.Screen
            name="Movies"
            component={Movies}
        />
        <Stack.Screen
            name="Greetings"
            component={Greetings}
        />
        <Stack.Screen
            name="Profile"
            component={Profile}
        />
        <Stack.Screen
            name="DeleteAccount"
            component={DeleteAccount}
        />
    </Stack.Navigator>
)

const AppRoutes: React.FC<Props> = ({ onLayoutRootView }) => {
    
    return (
        <NavigationContainer onReady={onLayoutRootView}>
            <InitialStackScreen />
        </NavigationContainer>
    )
}

export default AppRoutes;