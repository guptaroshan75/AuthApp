import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import React, { FC, useState } from 'react'
import database from '@react-native-firebase/database';
import ForgotPasswordStyle from './Css/ForgotPasswordStyle';
import CustomeInput from './Components/CustomeInput';
import CustomeAlert from './Components/CustomeAlert';
import sendPasswordResetEmail from "@react-native-firebase/auth";

const ForgotPassword: FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');

    const [alertModelVisible, setAlertModelVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [alertLable, setAlertLable] = useState('')

    const closeModel = () => {
        setAlertModelVisible(!alertModelVisible)
    }

    const generateOTP = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    };

    const checkEmailExists = async (email: string) => {
        try {
            const res = await database().ref('Users').orderByChild('email')
                .equalTo(email).once('value')
            const userData = res.val();
            return userData ? Object.keys(userData)[0] : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const generateVerificationOTP = async (email: string) => {
        const OTP = generateOTP();
        const date = new Date().toISOString().split('T')[0].split('-');
        const getconvertDate = `${date[2]}/${date[1]}/${date[0]}`
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const timestamp = `${getconvertDate} ${time}`

        try {
            await database().ref('Users/' + emailToKey(email)).update({
                otp: OTP, timestamp: timestamp
            });
            setOtp(OTP)
            return OTP;
        } catch (error) {
            return error;
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setAlertMessage('Please Enter Your Email-Id'); setAlertModelVisible(true);
            setAlertLable('Warning'); return;
        }

        const emailValidationRegex = /\S+@gmail\.com$/;
        if (!emailValidationRegex.test(email)) {
            setAlertMessage('Please Enter A Valid Email Address'); setAlertModelVisible(true);
            setAlertLable('Warning'); return;
        }

        const existingUser = await checkEmailExists(email);
        if (existingUser) {
            const verificationOTP = await generateVerificationOTP(email);
            if (verificationOTP) {
                // navigation.navigate('EmailVerification')
                console.log('Verification OTP sent:', verificationOTP);
            } else {
                setAlertMessage('Failed To Generate OTP'); setAlertModelVisible(true);
                setAlertLable('Warning'); setEmail(''); return;
            }
        } else {
            setAlertMessage('Email-Id Does Not Exist In The Database'); setAlertModelVisible(true);
            setAlertLable('Warning'); setEmail(''); return;
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

                <CustomeInput placeholder="Enter your Email" KeyboardType="email-address"
                    label="Email Address" value={email} onChangeText={email => setEmail(email)}
                />

                <CustomeAlert message={alertMessage} lable={alertLable} isVisible={alertModelVisible}
                    closeModel={closeModel}
                />

                <StatusBar translucent backgroundColor='transparent' barStyle={'dark-content'} />
            </View>

            <TouchableOpacity style={ForgotPasswordStyle.forgotbtn}
                onPress={handleForgotPassword}
            // onPress={() => navigation.navigate('EmailVerification')}
            >
                <Text style={ForgotPasswordStyle.forgottext}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ForgotPassword