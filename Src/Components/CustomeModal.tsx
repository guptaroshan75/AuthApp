import React, { FC } from 'react'
import { View, Text, StyleSheet, Modal, Image, StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { CommonActions } from '@react-navigation/native'
import { BlurView } from '@react-native-community/blur';

interface CustomeModal {
    isVisible: boolean;
    setIsVisible: any,
    navigation: any
}

const CustomeModal: FC<CustomeModal> = ({ isVisible, setIsVisible, navigation }) => {
    const handleGoToLogin = async () => {
        setIsVisible(false)
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
        navigation.dispatch(resetAction);
    };

    return (
        <View>
            <Modal animationType="slide" transparent={true} visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            >
                <BlurView style={styles.absolute} overlayColor='rgba(45, 60, 82, 0.34)' blurAmount={1} />

                <View style={styles.container}>
                    <View style={styles.border} />
                    <Image source={require('../Image/loginSuccess.png')} style={styles.img} />
                    <Text style={styles.text}>Password Changed</Text>
                    <Text style={styles.subtitle}>
                        Password changed successfully, you can login again with a new password
                    </Text>

                    <TouchableOpacity style={styles.loginbtn} onPress={handleGoToLogin}>
                        <Text style={styles.logintext}>Go To Login</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <StatusBar translucent backgroundColor='rgba(45, 60, 82, 0.34)' barStyle={'light-content'} />
        </View>

    )
}

export default CustomeModal

const styles = StyleSheet.create({
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },

    text: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: '600',
        color: '#101010',
        fontFamily: 'Inter',
        textAlign: 'center',
    },

    container: {
        width: '100%',
        height: '60%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: responsiveHeight(3),
        borderTopRightRadius: responsiveHeight(3),
        paddingHorizontal: responsiveWidth(7.2),
    },

    subtitle: {
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        color: '#878787',
        fontFamily: 'Inter',
        textAlign: 'center',
        lineHeight: 20,
        marginVertical: 10,
    },

    border: {
        width: '18%',
        height: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 4,
        marginVertical: 10,
        alignSelf: 'center',
    },

    img: {
        alignSelf: 'center',
        resizeMode: 'cover',
        marginVertical: responsiveHeight(3.5),
    },

    loginbtn: {
        marginTop: responsiveHeight(3),
        backgroundColor: '#FE8C00',
        padding: 15,
        borderRadius: 50,
    },

    logintext: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: responsiveFontSize(2),
    },
})