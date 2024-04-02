import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native';
import CustomeInput from './Components/CustomeInput';
import LoginStyle from './Css/LoginStyle';
import auth from '@react-native-firebase/auth'
import GoogleLogin from './Components/GoogleLogin';
import { CommonActions } from '@react-navigation/native'
import CustomeAlert from './Components/CustomeAlert';

const Login: FC<{ navigation: any }> = ({ navigation }) => {
    const [currentUser, setCurrentUser] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });

    const [alertModelVisible, setAlertModelVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [alertLable, setAlertLable] = useState('')

    const closeModel = () => {
        setAlertModelVisible(!alertModelVisible)
    }

    const handleForgotPassword = () => {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'ForgotPassword' }],
        });
        navigation.dispatch(resetAction);
    };

    const handleLogin = async () => {
        if (userInfo.email === '' || userInfo.password === '') {
            setAlertMessage('Please Fill All The Fields');
            setAlertModelVisible(true); setAlertLable('Warning')
            return;
        }

        setCurrentUser(true)
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
        });
        navigation.dispatch(resetAction);

        try {
            await auth().signInWithEmailAndPassword(userInfo.email, userInfo.password);
        } catch (error: any) {
            console.log(error);
            if (error.code === 'auth/user-not-found') {
                setAlertMessage('User Not Found With The Provided Email-Id');
                setAlertModelVisible(true); setAlertLable('Warning')
            } else if (error.code === 'auth/invalid-credential') {
                setAlertMessage('Incorrect Password');
                setAlertModelVisible(true); setAlertLable('Warning')
            } else {
                setAlertMessage('Failed To Sign In Please Try Again Later.');
                setAlertModelVisible(true); setAlertLable('Warning')
            }
            console.error('Sign-in error:', error);
        }
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(user => {
            if (user && currentUser) {
                const resetAction = CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                });
                navigation.dispatch(resetAction);
            }
        });
        return subscriber;
    }, [currentUser]);

    return (
        <SafeAreaView>
            <View style={LoginStyle.container}>
                <Text style={LoginStyle.title}>Login to your account.</Text>
                <Text style={LoginStyle.description}>Please sign in to your account</Text>

                <CustomeInput label="Email Address" placeholder="Enter Email"
                    value={userInfo.email}
                    onChangeText={text => setUserInfo({ ...userInfo, email: text })}
                />

                <CustomeInput label="Password" placeholder="Password"
                    secureTextEntry value={userInfo.password}
                    onChangeText={text => setUserInfo({ ...userInfo, password: text })}
                />

                <Text style={LoginStyle.forgotButton} onPress={handleForgotPassword}>
                    Forgot Password?
                </Text>

                <TouchableOpacity style={LoginStyle.loginButton} onPress={handleLogin}>
                    <Text style={LoginStyle.loginText}>Sign In</Text>
                </TouchableOpacity>

                <View style={LoginStyle.separatorContainer}>
                    <View style={LoginStyle.separatorLine} />
                    <Text style={LoginStyle.separatorText}>Or sign in with</Text>
                    <View style={LoginStyle.separatorLine} />
                </View>

                <GoogleLogin navigation={navigation} />

                <Text style={LoginStyle.registerbtn} onPress={() => navigation.navigate('SignUp')}>
                    Don't have an account?
                    <Text style={{ color: '#FE8C00', fontWeight: 'bold' }}> Register</Text>
                </Text>
            </View>

            <CustomeAlert message={alertMessage} lable={alertLable} isVisible={alertModelVisible}
                closeModel={closeModel}
            />

            <StatusBar translucent backgroundColor='transparent' barStyle="dark-content" />
        </SafeAreaView>
    )
}

export default Login