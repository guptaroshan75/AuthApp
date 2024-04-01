import { View, StyleSheet, FlatList, Animated, ViewabilityConfig, StatusBar } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import Data from './Data';
import SliderSwiper from './SliderSwiper';

interface OnboardingSwiper {
    navigation: any
}
const OnboardingSwiper: FC<OnboardingSwiper> = ({ navigation }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentindex, setCurrentIndex] = useState(0)
    const slidesRef = useRef<any>(null)

    const viewableItemChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
        setCurrentIndex(viewableItems[0]?.index ?? 0);
    }).current;

    const viewConfig = useRef({ itemVisiblePercentThreshold: 50, } as ViewabilityConfig).current

    const scrollToNext = () => {
        if (slidesRef.current && currentindex < Data.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentindex + 1 });
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList data={Data} horizontal showsHorizontalScrollIndicator pagingEnabled
                    bounces={false} keyExtractor={(item) => item.id} scrollEventThrottle={32}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false
                    })} ref={slidesRef}
                    renderItem={({ item }) => <SliderSwiper item={item} scrollX={scrollX}
                        index={currentindex} scrollTo={scrollToNext} navigation={navigation} />
                    } onViewableItemsChanged={viewableItemChanged} viewabilityConfig={viewConfig}
                />
            </View>
            <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />
        </View>
    )
}

export default OnboardingSwiper

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})