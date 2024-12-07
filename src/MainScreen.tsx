import React, { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import image6 from './assets/images/6.jpg';
import image7 from './assets/images/7.jpg';
import image8 from './assets/images/8.jpg';
import image9 from './assets/images/9.jpg';
import image10 from './assets/images/10.jpg';
import { globalStyle } from './globalStyle';

const imageCollection = [image6, image7, image8, image9, image10];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_SPACING = 20;

function MainScreen(): React.JSX.Element {
    const scrollX = useSharedValue(0);
    const [selectedCard, setSelectedCard] = useState<any>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const flatListRef = useRef<FlatList>(null);

    const onCardPress = (item: any, index: number) => {
        setSelectedCard(item);
        setCurrentIndex(index);
    };

    const closeCard = () => {
        setSelectedCard(null);

        setTimeout(() => {
            flatListRef.current?.scrollToIndex({
                index: currentIndex,
                animated: true,
            });
        }, 750);
    };

    const updateCurrentIndex = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / (CARD_WIDTH + CARD_SPACING));
        setCurrentIndex(index);
    };

    const RenderItem = ({ data, index }: { data: string; index: number }) => {
        const animatedStyle = useAnimatedStyle(() => {
            const scale = interpolate(
                scrollX.value,
                [
                    (index - 1) * (CARD_WIDTH + CARD_SPACING),
                    index * (CARD_WIDTH + CARD_SPACING),
                    (index + 1) * (CARD_WIDTH + CARD_SPACING),
                ],
                [0.9, 1, 0.9],
                Extrapolate.CLAMP
            );
            return { transform: [{ scale }] };
        });

        return (
            <Animated.View style={[globalStyle.card, {width: CARD_WIDTH, marginHorizontal: CARD_SPACING / 2}, animatedStyle]} key={index}>
                <Image source={data} resizeMethod="resize" style={globalStyle.image} />
            </Animated.View>
        );
    };

    return (
        <SafeAreaView style={globalStyle.container}>
            {selectedCard ? (
                <Animated.View style={[globalStyle.fullScreenCard]}>
                    <Image source={selectedCard} style={globalStyle.fullImage} />
                    <TouchableOpacity onPress={closeCard}>
                        <Text style={globalStyle.close}>Close</Text>
                    </TouchableOpacity>
                </Animated.View>
            ) : (
                <View style={globalStyle.front}>
                    <FlatList
                        ref={flatListRef}
                        data={imageCollection}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: CARD_SPACING }}
                        snapToInterval={CARD_WIDTH + CARD_SPACING}
                        decelerationRate="fast"
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => onCardPress(item, index)}>
                                <RenderItem index={index} data={item} />
                            </TouchableOpacity>
                        )}
                        onScroll={(event) => {
                            scrollX.value = event.nativeEvent.contentOffset.x;
                        }}
                        onMomentumScrollEnd={updateCurrentIndex}
                        scrollEventThrottle={16}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}

export default MainScreen;
