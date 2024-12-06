import React from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
} from 'react-native';
import { globalStyle } from './globalStyle';
import image6 from './assets/images/6.jpg';
import image7 from './assets/images/7.jpg';
import image8 from './assets/images/8.jpg';
import image9 from './assets/images/9.jpg';
import image10 from './assets/images/10.jpg';

const imageCollection = [
    image6,
    image7,
    image8,
    image9,
    image10
];

function MainScreen(): React.JSX.Element {

    let renderItem = (item: any) => {
        console.log(item);
        
        const source = item.item;
        return (
            <TouchableOpacity key={item.index}>
                <Image 
                source={source}
                style={{height: 200, width: 100}}
                resizeMode='stretch' 
                />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={globalStyle.container}>
            <FlatList
                data={imageCollection}
                renderItem={(item) => renderItem(item)}
                horizontal
            />
            <Text>Here</Text>

        </SafeAreaView>
    );
}

export default MainScreen;
