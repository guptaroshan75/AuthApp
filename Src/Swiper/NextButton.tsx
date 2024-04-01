import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import Svg, { G, Circle } from 'react-native-svg'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { CommonActions } from '@react-navigation/native'

interface NextButton {
    percentage: any,
    scrollTo: () => void,
    navigation: any
}

const NextButton: FC<NextButton> = ({ percentage, scrollTo, navigation}) => {
    const size = 80
    const strokeWidth = 2
    const center = size / 2
    const radius = size / 2 - strokeWidth / 2
    const circumference = 2 * Math.PI * radius

    const handleLastIndex = () => {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
        navigation.dispatch(resetAction);
    }

    return (
        <View style={styles.container}>
            <Svg width={size} height={size} fill="#FE8C00">
                <G rotation='-90' origin={center}>
                    <Circle stroke='#E6E7E8' cx={center} cy={center} r={radius}
                        strokeWidth={strokeWidth}
                    />
                    <Circle stroke='#fff' cx={center} cy={center} strokeWidth={strokeWidth}
                        r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (circumference * 75) / 100}
                    />
                </G>
            </Svg>

            <TouchableOpacity onPress={handleLastIndex} style={styles.button} activeOpacity={0.6}>
                <AntDesign name='arrowright' size={25} color='#FE8C00' />
            </TouchableOpacity>
        </View>
    )
}

export default NextButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 100,
        padding: 12,
    }
})