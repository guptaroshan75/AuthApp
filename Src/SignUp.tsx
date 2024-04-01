import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { FC, useState } from 'react'
import { firebase } from '@react-native-firebase/auth';
import SignUpStyle from './Css/SignUpStyle';
import CustomeInput from './Components/CustomeInput';
import CustomeAlert from './Components/CustomeAlert';
import database from '@react-native-firebase/database';
import GoogleLogin from './Components/GoogleLogin';
import Feather from 'react-native-vector-icons/Feather';

const SignUp: FC<{ navigation: any }> = ({ navigation }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [userInfo, setUserInfo] = useState({
        email: '', username: '', password: '',
    });

    const [alertModelVisible, setAlertModelVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [alertLable, setAlertLable] = useState('')

    const closeModel = () => {
        setAlertModelVisible(!alertModelVisible)
    }

    const handleCheck = () => {
        setIsChecked(!isChecked);
    };

    const registerUser = async (email: string, password: string): Promise<void> => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            addUserEmailToDatabase(email);
            navigation.navigate('Login');
        } catch (error: any) {
            console.log(error);
            if (error.code === 'auth/email-already-in-use') {
                setAlertMessage('Email-Id Already Exist');
                setAlertModelVisible(true); setAlertLable('Warning')
            } else if (error.code === 'auth/invalid-email') {
                setAlertMessage('Invalid Email-Id');
                setAlertModelVisible(true); setAlertLable('Warning')
            } else if (error.code === 'auth/weak-password') {
                setAlertMessage('Password Is Not Strong Enough');
                setAlertModelVisible(true); setAlertLable('Warning')
            } else {
                setAlertMessage('Something Went Wrong');
                setAlertModelVisible(true); setAlertLable('Warning')
            }
        }
    };

    const handleRegister = () => {
        if (userInfo.email === '' || userInfo.username === '' || userInfo.password === '') {
            setAlertMessage('Please Fill All The Fields');
            setAlertModelVisible(true); setAlertLable('Warning')
            return;
        }

        if (!isChecked) {
            setAlertMessage('Please Agree To The Terms & Conditions');
            setAlertModelVisible(true); setAlertLable('Warning')
            return;
        }

        registerUser(userInfo.email, userInfo.password);
        setUserInfo({ email: '', username: '', password: '' });
    };

    const addUserEmailToDatabase = (email: string) => {
        database().ref('users/' + emailToKey(email)).set({ email: email })
            .then(() => console.log('User email added to database'))
            .catch(error =>
                console.error('Error adding user email to database:', error),
            );
    };

    const emailToKey = (email: string) => {
        return email.replace('.', ',');
    };

    const handleGoogleLogin = () => {
        console.log('Login Successfully');
        navigation.navigate('Home');
    };

    return (
        <KeyboardAvoidingView>
            <ScrollView>
                <View style={SignUpStyle.container}>
                    {/* Title and Description */}
                    <Text style={SignUpStyle.title}>Create your new account</Text>
                    <Text style={SignUpStyle.description}>
                        Create an account to start looking for the food you like{' '}
                    </Text>

                    {/* Input Fields */}
                    <CustomeInput label="Email Address" placeholder="Enter your Email" value={userInfo.email}
                        onChangeText={text => setUserInfo({ ...userInfo, email: text })}
                    />
                    <CustomeInput label="User Name" placeholder="Enter User Name" value={userInfo.username}
                        onChangeText={text => setUserInfo({ ...userInfo, username: text })}
                    />

                    <CustomeInput label="Password" placeholder="Enter Password"
                        secureTextEntry value={userInfo.password}
                        onChangeText={text => setUserInfo({ ...userInfo, password: text })}
                    />

                    <View style={SignUpStyle.termsContainer}>
                        <TouchableOpacity onPress={handleCheck}
                            style={[SignUpStyle.checkbox, isChecked && SignUpStyle.checked]}>
                            {isChecked && (
                                <Feather name="check" size={16} color="white" />
                            )}
                        </TouchableOpacity>

                        <Text style={SignUpStyle.termsText} onPress={handleCheck}>I Agree with
                            <Text style={{ color: '#FE8C00' }}> Terms of Service </Text>and
                            <Text style={{ color: '#FE8C00' }}> Privacy Policy</Text>
                        </Text>
                    </View>

                    <TouchableOpacity onPress={handleRegister} style={SignUpStyle.signupbtn}>
                        <Text style={SignUpStyle.signuptext}>Register</Text>
                    </TouchableOpacity>

                    <View style={SignUpStyle.separatorContainer}>
                        <View style={SignUpStyle.separatorLine} />
                        <Text style={SignUpStyle.separatorText}>Or sign in with</Text>
                        <View style={SignUpStyle.separatorLine} />
                    </View>

                    <GoogleLogin onSuccess={handleGoogleLogin} />

                    <Text style={SignUpStyle.signIn} onPress={() => navigation.navigate('Login')}>
                        Have an account?
                        <Text style={{ color: '#FE8C00', fontWeight: 'bold' }}> Sign In</Text>
                    </Text>
                </View>
            </ScrollView>

            <CustomeAlert message={alertMessage} lable={alertLable} isVisible={alertModelVisible}
                closeModel={closeModel}
            />
        </KeyboardAvoidingView>
    )
}

export default SignUp