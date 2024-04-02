import { StyleSheet } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import CustomeAlert from './CustomeAlert';
interface GoogleLogin {
    navigation: any
}

const GoogleLogin: FC<GoogleLogin> = ({ navigation }) => {
    const [alertModelVisible, setAlertModelVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [alertLable, setAlertLable] = useState('')
    const [currentUser, setCurrentUser] = useState(false)

    const closeModel = () => {
        setAlertModelVisible(!alertModelVisible)
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '522628620060-imv7g3fv0bf75ili435akj2ssorb6g09.apps.googleusercontent.com',
        });
    }, []);

    const handleSocialLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            setCurrentUser(true)
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                setAlertMessage('Cancelled'); setAlertModelVisible(true); setAlertLable('Warning')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                setAlertMessage('In Progress');
                setAlertModelVisible(true); setAlertLable('Warning')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                setAlertMessage('Play Services Not Available');
                setAlertModelVisible(true); setAlertLable('Warning')
            } else {
                setAlertMessage('Something Went Wrong');
                setAlertModelVisible(true); setAlertLable('Warning')
            }
        }
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(user => {
            if (user && currentUser) {
                navigation.navigate('HomeScreen' as never);
            }
        });
        return subscriber;
    }, [currentUser]);

    return (
        <>
            <TouchableWithoutFeedback onPress={handleSocialLogin}>
                <Image source={require('../Image/google.png')}
                    style={styles.socialIcon}
                />

            </TouchableWithoutFeedback>

            <CustomeAlert message={alertMessage} lable={alertLable} isVisible={alertModelVisible}
                closeModel={closeModel}
            />
        </>
    )
}

export default GoogleLogin

const styles = StyleSheet.create({
    socialIcon: {
        backgroundColor: '#fff',
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: responsiveHeight(3.5),
        marginBottom: responsiveHeight(4),
    },
});