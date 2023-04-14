import React, { useState } from 'react'
import {StyleSheet, View, Dimensions, Image, ActivityIndicator} from "react-native";

const windowWidth = Dimensions.get('screen').width;
interface imageProps{
    uri: string
}

const ImageCard:React.FC<imageProps> = ({uri}) => {
    const [loading, setLoading] = useState(false);
    return (
        <View style = {styles.cardContainer}>
            <Image source={{ uri: uri}} style={styles.image}
            resizeMode="contain"
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            />
            {loading && <ActivityIndicator color="green" size="large" />}
        </View>
    );
}

const radius = 20;
const styles = StyleSheet.create({
cardContainer: {
    width: windowWidth - 20,
    backgroundColor: '#fffacd',
    borderRadius: radius,
    shadowColor: '#000000',
    shadowOffset: {
        width: 5,
        height: 5
    },
    shadowOpacity: 0.75,
    elevation: 9,
    marginVertical:10,
    marginHorizontal:10
},
image: {
    height:150,
    width: windowWidth - 25,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    alignSelf: 'center'
},
});
export default ImageCard;