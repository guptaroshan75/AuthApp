import { View, Text, Image } from 'react-native'
import { TouchableOpacity, StatusBar } from 'react-native'
import React, { FC } from 'react'
import { firebase } from '@react-native-firebase/auth';
import HomeScreenStyle from './Css/HomeScreenStyle';
import { CommonActions } from '@react-navigation/native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '522628620060-imv7g3fv0bf75ili435akj2ssorb6g09.apps.googleusercontent.com',
});

const HomeScreen: FC<{ navigation: any }> = ({ navigation }) => {
    const handleLogout = async () => {
        const user = firebase.auth().currentUser;

        if (user) {
            GoogleSignin.signOut()
            firebase.auth().signOut().then(
                function () {
                    console.log('Log Out');
                    const resetAction = CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                    navigation.dispatch(resetAction);
                },
                function (error: any) {
                    console.log('Log Out Error', error);
                },
            )
        }

        // auth().signOut();
        // await GoogleSignin.revokeAccess();
        // AsyncStorage.clear();
        // const resetAction = CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: 'Login' }],
        // });
        // navigation.dispatch(resetAction);
    };

    return (
        <View style={{ flex: 1 }}>
            <Image source={require('./Image/onboarding.png')} style={HomeScreenStyle.image} />

            <View style={HomeScreenStyle.container}>
                <View style={HomeScreenStyle.border} />
                <Image source={require('./Image/loginSuccess.png')} style={HomeScreenStyle.img} />
                <Text style={HomeScreenStyle.text}>Login Successful</Text>
                <Text style={HomeScreenStyle.subtitle}>
                    An event has been created and the invite has been sent to you on mail.
                </Text>

                <TouchableOpacity style={HomeScreenStyle.logoutbtn} onPress={handleLogout}>
                    <Text style={HomeScreenStyle.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />
        </View>
    )
}

export default HomeScreen