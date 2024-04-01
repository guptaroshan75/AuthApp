import { View, StyleSheet, useWindowDimensions, Animated } from 'react-native'
import React, { FC } from 'react'

interface Paginator {
    data: any[],
    scrollX: any
}

const Paginator: FC<Paginator> = ({ data, scrollX }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const dotColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ['#C2C2C2', '#FFFFFF', '#C2C2C2'],
                    extrapolate: 'clamp'
                });
                return <Animated.View key={i.toString()}
                    style={[styles.dot, { width: 23, backgroundColor: dotColor }]}
                />
            })}
        </View>
    )
}

export default Paginator

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 25
    },

    dot: {
        height: 9,
        borderRadius: 5,
        backgroundColor: "#C2C2C2",
        marginHorizontal: 3
    }
})