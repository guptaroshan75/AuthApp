import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const LoginStyle = StyleSheet.create({
    container: {
        width: responsiveWidth(87),
        alignSelf: 'center',
        marginTop: responsiveHeight(10),
    },

    title: {
        fontSize: responsiveFontSize(5),
        fontWeight: '600',
        lineHeight: 40,
        color: '#101010',
        fontFamily: 'Inter',
    },

    description: {
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        lineHeight: 30,
        color: '#878787',
        fontFamily: 'Inter',
    },

    inputField: {
        marginTop: responsiveHeight(3),
        width: '100%',
    },

    label: {
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        color: '#101010',
        fontFamily: 'Inter', 
        marginBottom: responsiveHeight(1),
    },

    emailInput: {
        borderWidth: 1,
        borderColor: '#D6D6D6',
        borderRadius: 10,
        paddingLeft: responsiveWidth(5),
    },

    forgotButton: {
        textAlign: 'right',
        marginTop: responsiveHeight(3),
        color: '#FE8C00',
        fontWeight: '500',
    },

    loginButton: {
        marginTop: responsiveHeight(3),
        backgroundColor: '#FE8C00',
        padding: 15,
        borderRadius: 50,
    },

    loginText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: responsiveFontSize(2),
    },

    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },

    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#D6D6D6',
    },

    separatorText: {
        paddingHorizontal: 10,
        color: '#878787',
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'center',
    },

    socialIcon: {
        padding: responsiveWidth(5),
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: 'center',
        borderWidth: 1,
        marginVertical: responsiveHeight(5),
    },

    registerbtn: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '500',
    },
})

export default LoginStyle