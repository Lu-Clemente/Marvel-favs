import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/Home/HomeScreen';
import LoginScreen from '../pages/Auth/LoginScreen';
import SignUp from "../pages/SignUp/SignUp"
import Characters from '../pages/Characters/Characters';
import Movies from '../pages/Movies/Movies';

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