import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const SignUpStyle = StyleSheet.create({
    container: {
        width: responsiveWidth(87),
        alignSelf: 'center',
        marginTop: responsiveHeight(8)
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

    signupbtn: {
        marginTop: responsiveHeight(3),
        backgroundColor: '#FE8C00',
        padding: 15,
        borderRadius: 50,
    },

    signuptext: {
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

    signIn: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '500',
    },

    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: responsiveHeight(2),
    },

    checkbox: {
        height: 18,
        width: 18,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FE8C00',
        marginTop: responsiveHeight(0.4),
        marginRight: 8,
    },

    checked: {
        backgroundColor: '#FE8C00',
    },

    termsText: {
        fontSize: responsiveFontSize(2),
        color: '#101010',
        fontWeight: '500',
        marginHorizontal: 3,
        lineHeight: 22,
    },

    registerText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: responsiveFontSize(2),
    },

    LoginButton: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '500',
        marginBottom: responsiveHeight(3),
    },
})

export default SignUpStyle