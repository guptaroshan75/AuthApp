import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const HomeScreenStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '60%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: responsiveHeight(3),
        borderTopRightRadius: responsiveHeight(3),
        paddingHorizontal: responsiveWidth(8),
    },

    image: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
        width: '100%',
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

    logoutbtn: {
        marginTop: responsiveHeight(3),
        backgroundColor: '#FE8C00',
        padding: 15,
        borderRadius: 50,
    },

    logoutText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: responsiveFontSize(2),
    },

    text: {
        fontSize: responsiveFontSize(3),
        fontWeight: '600',
        lineHeight: 32,
        color: 'rgba(16, 16, 16, 1)',
        fontFamily: 'Inter',
        textAlign: 'center'
    },

    subtitle: {
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        color: '#878787',
        fontFamily: 'Inter',
        textAlign: 'center',
        lineHeight: 20,
        marginVertical: 10,
    }
})

export default HomeScreenStyle