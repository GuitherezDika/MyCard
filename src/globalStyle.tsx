import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const globalStyle = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    front: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
    },
    card: {
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
})