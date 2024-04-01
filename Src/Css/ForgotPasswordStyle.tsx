import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const ForgotPasswordStyle = StyleSheet.create({
    container: {
        flex: 1,
        width: responsiveWidth(87),
        alignSelf: 'center',
        marginTop: responsiveHeight(10)
    },

    title: {
        fontSize: responsiveFontSize(5),
        fontWeight: '600',
        color: '#101010',
        fontFamily: 'Inter',
    },

    description: {
        fontSize: responsiveFontSize(2),
        fontWeight: '400',
        color: '#878787',
        fontFamily: 'Inter',
        lineHeight: 20,
        marginTop: 12
    },

    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start', 
        marginTop: responsiveHeight(2),
    },

    forgotbtn: {
        width: responsiveWidth(87),
        alignSelf: 'center',
        marginVertical: responsiveHeight(3),
        backgroundColor: '#FE8C00',
        padding: 15,
        borderRadius: 50,
        position: 'relative',
        bottom: 0
    },

    forgottext: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: responsiveFontSize(2),
    },
})

export default ForgotPasswordStyle