import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUp from "../screens/SignUp/SignUp"
import Characters from '../screens/Characters/Characters';
import Favorites from '../screens/Favorites';
import Greetings from '../screens/Greetings';
import Profile from '../screens/Profile';
import DeleteAccount from '../screens/DeleteAccount';
import PasswordChange from '../screens/Profile/PasswordChange';
import ForgotPassword from '../screens/ForgotPassword';
import EmailOrientation from '../screens/EmailOrientation';

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
            options={{
                gestureEnabled: false,
            }}
        />
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
                gestureEnabled: false,
            }}
        />
        <Stack.Screen
            name="SignUp"
            component={SignUp}
        />
        <Stack.Screen
            name="Characters"
            component={Characters}
            options={{
                gestureEnabled: false,
            }}
        />
        <Stack.Screen
            name="Favorites"
            component={Favorites}
        />
        <Stack.Screen
            name="Greetings"
            component={Greetings}
            options={{
                gestureEnabled: false,
            }}
        />
        <Stack.Screen
            name="Profile"
            component={Profile}
        />
        <Stack.Screen
            name="DeleteAccount"
            component={DeleteAccount}
            options={{
                gestureEnabled: false,
            }}
        />
        <Stack.Screen
            name="PasswordChange"
            component={PasswordChange}
        />
        <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
        />
        <Stack.Screen
            name="EmailOrientation"
            component={EmailOrientation}
            options={{
                gestureEnabled: false,
            }}
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