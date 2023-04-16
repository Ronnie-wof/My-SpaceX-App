// Rocket Card component displayed on home screen
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity,  Image, Dimensions, ScrollView } from 'react-native'
import { Launch } from '../model/models';
import { fetchLocalDateToUser } from '../service/spacexService';
import { fetchCrew } from '../service/spacexService';
import { defaultImageUri } from '../configuration/spacexConfiguration';

const windowWidth = Dimensions.get('screen').width;

interface RocketProps{ 
    item: Launch
    onTap: Function;
 }

const RocketCard: React.FC<RocketProps> = ({ item, onTap }) => {
const localDate = fetchLocalDateToUser(item.date_unix)
if(item.links.patch.small==null) {
    item.links.patch.small=defaultImageUri
}
const crew = fetchCrew(item.crew)
return (
<TouchableOpacity onPress={() => onTap(item)}>
    <View style = {styles.cardContainer}>
      <Image style= {styles.image} source={{ uri: `${item.links.patch.small}`}} />
        <ScrollView style= {styles.rocketInfo}>
            <Text style={styles.rocketName}>{item.name}</Text>
            <Text style={styles.launchDate}>{localDate}</Text>
            <Text style={styles.crew} numberOfLines={1}>{crew}</Text>
            <Text style={styles.flightInfo}>Flight Number: {item.flight_number} </Text>
            <Text style={styles.id} numberOfLines={1}>Id: {item.id}</Text>
        </ScrollView>    
    </View>
</TouchableOpacity>

)}

const radius = 20;
const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        width: windowWidth - 10,
        backgroundColor: 'white',
        height: 230,
        borderRadius: radius,
        shadowColor: '#000000',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.75,
        elevation: 9,
        marginTop: 10
    },
    image: {
        height:150,
        resizeMode: 'contain',
        width: windowWidth - 10 - 220,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        alignSelf: 'center',
        shadowOpacity: 0.75,
    },
    rocketInfo: {
        resizeMode: 'contain',
        width: windowWidth - 10 - 200,
        marginLeft: 4,
        height:150,
        alignSelf: 'center',
    },
    rocketName: {
        fontSize:25,
        fontWeight:'800',
        marginBottom:2
    },
    launchDate: {
        fontSize:17,
        fontWeight: '200',
        fontStyle: 'italic'
    },
    crew: {
        fontSize:15,
        fontWeight: '200',
        fontStyle: 'italic'
    },
    flightInfo: {
        fontWeight: '200',
        fontStyle: 'italic',
        fontSize: 15,
    },
    id: {
        fontWeight: '200',
        fontStyle: 'italic',
        fontSize: 15,
    },
});

 export { RocketCard }