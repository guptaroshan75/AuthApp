import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { FC, useRef } from 'react'
import CustomeHeader from './Components/CustomeHeader'
import VerificationStyle from './Css/VerificationStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const EmailVerification: FC<{ navigation: any }> = ({ navigation }) => {
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const focusNextInput = (index: number) => {
        if (inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={VerificationStyle.container}>
                <CustomeHeader lable='OTP' navigation={navigation} />
                <Text style={VerificationStyle.title}>Email verification</Text>
                <Text style={VerificationStyle.description}>
                    Enter the verification code we send you on:
                    Alberts******@gmail.com|
                </Text>

                <View style={VerificationStyle.mainView}>
                    {[...Array(4)].map((_, index) => (
                        <View key={index} style={VerificationStyle.inputContainer}>
                            <TextInput style={VerificationStyle.inputText} keyboardType='phone-pad'
                                autoComplete='off' ref={ref => (inputRefs.current[index] = ref)}
                                maxLength={1} onKeyPress={({ nativeEvent }) => {
                                    if (nativeEvent.key === 'Backspace') {
                                        if (index > 0) { inputRefs.current[index - 1]?.focus() }
                                    } else {
                                        focusNextInput(index);
                                    }
                                }}
                            />
                        </View>
                    ))}
                </View>

                <Text style={VerificationStyle.registerbtn} onPress={() => navigation.navigate('SignUp')}>
                    Didn’t receive code?
                    <Text style={{ color: '#FE8C00', fontWeight: 'bold' }}> Resend</Text>
                </Text>

                <View style={[VerificationStyle.registerbtn, { flexDirection: 'row', paddingTop: 18 }]}>
                    <Icon name='clock-time-five-outline' size={21} color={'#878787'} />
                    <Text style={VerificationStyle.resendText}> 09.00</Text>
                </View>
            </View>

            <TouchableOpacity style={VerificationStyle.verifybtn}
                onPress={() => navigation.navigate('ResetPassword')}
            >
                <Text style={VerificationStyle.verifytext}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EmailVerification