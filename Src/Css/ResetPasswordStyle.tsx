import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const ResetPasswordStyle = StyleSheet.create({
    container: {
        flex: 1,
        width: responsiveWidth(87),
        alignSelf: 'center',
        marginTop: responsiveHeight(11)
    },

    title: {
        fontSize: responsiveFontSize(5),
        fontWeight: '600',
        color: '#101010',
        fontFamily: 'Inter',
        marginTop: 20
    },

    description: {
        fontSize: responsiveFontSize(2),
        fontWeight: '400',
        color: '#878787',
        fontFamily: 'Inter',
        lineHeight: 20,
        marginTop: 15
    },

    registerbtn: {
        alignSelf: 'center',
        color: '#101010',
        fontWeight: '500',
        marginTop: 23,
        justifyContent: 'center'
    },

    resendText: {
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        color: '#878787',
        fontFamily: 'Inter',
    },

    resetbtn: {
        width: responsiveWidth(87),
        alignSelf: 'center',
        marginVertical: responsiveHeight(3),
        backgroundColor: '#FE8C00',
        padding: 15,
        borderRadius: 50,
        position: 'relative',
        bottom: 0
    },

    resetText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: responsiveFontSize(2),
    },

    text: {
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        color: '#878787',
        fontFamily: 'Inter',
        lineHeight: 20,
        marginTop: 6
    }
})

export default ResetPasswordStyle