import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useWindowDimensions, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import Data from './Data';
import Paginator from './Paginator';
import Icon from 'react-native-vector-icons/FontAwesome6'
import NextButton from './NextButton';
import { CommonActions } from '@react-navigation/native'

interface SliderSwiperProps {
    item: any;
    scrollX: Animated.Value;
    index: number,
    scrollTo: () => void,
    navigation: any
}

const SliderSwiper: FC<SliderSwiperProps> = ({ item, scrollX, index, scrollTo, navigation }) => {
    const [showNextButton, setShowNextButton] = useState(false);
    const { width } = useWindowDimensions();

    const handleLastIndex = () => {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
        navigation.dispatch(resetAction);
    }

    useEffect(() => {
        if (index === Data.length - 1) {
            setShowNextButton(true);
        } else {
            setShowNextButton(false);
        }
    }, [index]);

    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.main}>
                <Text style={styles.introTitleStyle}>{item.title}</Text>
                <Text style={styles.introTextStyle}>{item.subtitle}</Text>
                <Paginator data={Data} scrollX={scrollX} />

                {showNextButton ? (
                    <NextButton percentage={(index + 1) * (100 / Data.length)} scrollTo={scrollTo}
                        navigation={navigation}
                    />
                ) : (
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={handleLastIndex} activeOpacity={1}>
                            <Text style={styles.btntext}>Skip</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={scrollTo} activeOpacity={1}
                            style={styles.footerIcon}
                        >
                            <Text style={styles.btntext}>Next</Text>
                            <Icon name='arrow-right-long' size={14} color={'#fff'}
                                style={{ marginLeft: 8 }}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

export default SliderSwiper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
        width: '100%',
    },

    main: {
        backgroundColor: '#FE8C00',
        width: '85%',
        paddingHorizontal: 5,
        height: 370,
        borderRadius: 40,
        position: 'absolute',
        bottom: 55,
        left: 32,
    },

    introTextStyle: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 30,
        lineHeight: 20,
        fontWeight: '400',
        paddingVertical: 14,
    },

    introTitleStyle: {
        fontSize: 32,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        paddingTop: 25,
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 70,
        marginHorizontal: 30
    },

    footerIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    btntext: {
        lineHeight: 20,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        color: '#fff'
    },
});