import React, { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
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

const imageCollection = [image6, image7, image8, image9, image10];

const { width, height } = Dimensions.get('window');
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
            <Animated.View style={[styles.card, animatedStyle]} key={index}>
                <Image source={data} resizeMethod="resize" style={styles.image} />
            </Animated.View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {selectedCard ? (
                <Animated.View style={[styles.fullScreenCard]}>
                    <Image source={selectedCard} style={styles.fullImage} />
                    <TouchableOpacity onPress={closeCard}>
                        <Text style={styles.close}>Close</Text>
                    </TouchableOpacity>
                </Animated.View>
            ) : (
                <View style={styles.front}>
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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    front: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
    },
    card: {
        width: CARD_WIDTH,
        marginHorizontal: CARD_SPACING / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.25,
        borderWidth: 0.8,
        borderColor: 'gray',
        borderRadius: 10,
    },
    image: { width: '100%', height: 400, borderRadius: 10 },
    fullScreenCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    fullImage: {
        width: width * 0.9,
        height: height * 0.9,
        borderRadius: 10,
        resizeMode: 'contain',
    },
    close: { color: 'yellow', fontWeight: 'bold' },
});

export default MainScreen;
