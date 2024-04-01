import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import { View } from 'react-native';
import OnboardingSwiper from './Swiper/OnboardingSwiper';
import ForgotPassword from './ForgotPassword';
import SignUp from './SignUp';
import EmailVerification from './EmailVerification';
import HomeScreen from './HomeScreen';
import ResetPassword from './ResetPassword';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="OnboardingSwiper" component={OnboardingSwiper} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="EmailVerification" component={EmailVerification} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </Stack.Navigator>
        </View>
    )
}

export default StackNavigator