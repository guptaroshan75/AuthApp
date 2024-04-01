import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import React, { FC, useState } from 'react'
import database from '@react-native-firebase/database';
import ForgotPasswordStyle from './Css/ForgotPasswordStyle';
import CustomeInput from './Components/CustomeInput';
import CustomeAlert from './Components/CustomeAlert';

const ForgotPassword: FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [alertModelVisible, setAlertModelVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [alertLable, setAlertLable] = useState('')

    const closeModel = () => {
        setAlertModelVisible(!alertModelVisible)
    }

    const validateEmail = (email: string): boolean => {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const checkEmailExists = async (email: string) => {
        try {
            const snapshot = await database().ref('users').orderByKey().equalTo(emailToKey(email))
                .once('value');
            console.log('Snapshot', snapshot);
            return snapshot.exists();
        } catch (error) {
            return false;
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setAlertMessage('Please Enter Your Email-Id');
            setAlertModelVisible(true); setAlertLable('Warning')
            return;
        }

        if (!email || !validateEmail(email)) {
            setAlertMessage('Invalid Email-Id Format Please Check');
            setAlertModelVisible(true); setAlertLable('Warning')
            return;
        }

        const emailExists = await checkEmailExists(email);
        navigation.navigate('EmailVerification')
        if (emailExists) {
            console.log('Email Exists');
        } else {
            console.log('Email does not exist');
        }
    };

    const emailToKey = (email: string) => {
        return email.replace('.', ',');
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={ForgotPasswordStyle.container}>
                <Text style={ForgotPasswordStyle.title}>Forgot password?</Text>
                <Text style={ForgotPasswordStyle.description}>
                    Enter your email address and we’ll send you confirmation code to
                    reset your password{' '}
                </Text>

                <CustomeInput label="Email Address" placeholder="Enter your Email" KeyboardType="email-address"
                    value={email} onChangeText={email => setEmail(email)}
                />

                <CustomeAlert message={alertMessage} lable={alertLable} isVisible={alertModelVisible}
                    closeModel={closeModel}
                />

                <StatusBar translucent backgroundColor='transparent' barStyle={'dark-content'} />
            </View>

            <TouchableOpacity style={ForgotPasswordStyle.forgotbtn}
                // onPress={handleForgotPassword}
                onPress={() => navigation.navigate('EmailVerification')}
            >
                <Text style={ForgotPasswordStyle.forgottext}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ForgotPassword