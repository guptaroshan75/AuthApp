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
    onSuccess: () => void;
}

const GoogleLogin: FC<GoogleLogin> = ({ onSuccess }) => {
    const navigation = useNavigation();
    const [alertModelVisible, setAlertModelVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [alertLable, setAlertLable] = useState('')

    const closeModel = () => {
        setAlertModelVisible(!alertModelVisible)
    }

    const handleSocialLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            auth().signInWithCredential(googleCredential);
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
        GoogleSignin.configure({
            webClientId: '221655542371-33s2poqiftijoc2qsje7jmjo1vr8jq8t.apps.googleusercontent.com',
        });
    }, []);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Home' as never);
            }
        });
        return subscriber;
    });

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