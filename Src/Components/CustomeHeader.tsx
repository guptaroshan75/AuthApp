import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { responsiveWidth } from 'react-native-responsive-dimensions'

interface CustomeHeader {
    navigation: any,
    lable: string
}

const CustomeHeader: React.FC<CustomeHeader> = (props) => {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
                <View style={styles.backbtn}>
                    <Image source={require('../Image/arrow.png')} style={styles.back} />
                </View>
            </TouchableWithoutFeedback>
            <Text style={styles.mainContent}> {props.lable} </Text>
            <Text style={styles.mainContent}></Text>
        </View>
    )
}

export default CustomeHeader

const styles = StyleSheet.create({
    container: {
        width: responsiveWidth(87),
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    backbtn: {
        width: 35,
        height: 35,
        borderRadius: 100,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#EDEDED',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    back: {
        width: 20,
        height: 20,
        tintColor: '#000'
    },

    mainContent: {
        fontSize: responsiveFontSize(2.7),
        fontWeight: '600',
        color: '#101010',
        fontFamily: 'Inter',
        lineHeight: 24,
        marginHorizontal: responsiveWidth(4),
    },
})