import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import { Launch, Crew } from '../services/models';

const windowWidth = Dimensions.get('screen').width;

interface RocketProps{ 
    item: Launch
    onTap: Function;
 }

 export const fetchLocalDateToUser = (unixTimestamp:string) => {
    const unixTime = Number(unixTimestamp);
    // Convert Unix timestamp to JavaScript Date object
    const date = new Date(unixTime * 1000);

    // Get current date and time in local timezone
    const currentDate = date.toLocaleString();
    return currentDate
 }

 export const fetchCrew = (crew:Crew[]):string => {
    if (crew.length === 0) {
        return "No crew";
    } else {
        const roles = crew.map(c => c.role);
        return roles.join(", ");
    }
 }

const RocketCard: React.FC<RocketProps> = ({ item, onTap }) => {
const localDate = fetchLocalDateToUser(item.date_unix)
const crew = fetchCrew(item.crew)
return (
<TouchableOpacity onPress={() => onTap(item)}>
    <View style = {styles.cardContainer}>
      <Image style= {styles.image} source={{ uri: `${item.links.patch.small}`}} />
        <View style= {styles.rocketInfo}>
            <Text style={styles.rocketName}>{item.name}</Text>
            <Text style={styles.launchDate}>{localDate}</Text>
            <Text style={styles.crew}>{crew}</Text>
            <Text style={styles.flightInfo}>Flight Number: {item.flight_number} | Id: {item.id}</Text>
        </View>
    </View>
</TouchableOpacity>

)}

const radius = 20;
const styles = StyleSheet.create({
    cardContainer: {
        width: windowWidth - 10,
        backgroundColor: '#fffacd',
        height: 290,
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
        width: windowWidth - 25,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        alignContent: 'center',
        alignSelf: 'center',
        shadowOpacity: 0.75,
    },
    rocketInfo: {
        marginHorizontal: 10,
        marginVertical: 5
    },
    rocketName: {
        fontSize:25,
        fontWeight:'800'
    },
    launchDate: {
        fontSize:15,
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
        fontSize: 15
    },
    cardText: {

    }
});

 export { RocketCard }