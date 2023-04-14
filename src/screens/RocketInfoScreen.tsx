// the screen which will have the list view of all upcoming launches
import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import type { RouteProp } from '@react-navigation/native';
import { RocketDetailStackParam } from '../../App'
import Accordion from 'react-native-collapsible/Accordion';
import { AntDesign } from '@expo/vector-icons'; 
import { fetchCrew, fetchLocalDateToUser } from '../components/RocketCard';
import ImageCard from '../components/ImageCard';

type RocketInfoNavigationProp = NativeStackNavigationProp<
    RocketDetailStackParam,
    'RocketInfo'
>;

type RocketInfoRouteProp = RouteProp<RocketDetailStackParam, 'RocketInfo'>;

interface RocketInfoScreenProps {
    navigation: RocketInfoNavigationProp;
    route: RocketInfoRouteProp;
}

type Section = {
    title: string;
    content: JSX.Element;
}

const RocketInfoScreen = ({navigation, route}: RocketInfoScreenProps) => {
    useEffect(()=> {
        navigation.setOptions({title:route.params.rocket.name})
    }, []);
    const item = route.params.rocket;
    
    const localDate = fetchLocalDateToUser(item.date_unix)
    const crew = fetchCrew(item.crew)
    const reused = item.fairings.reused.toString()
    const recovery_attempt = item.fairings.recovery_attempt.toString()
    const recovered = item.fairings.recovered.toString()
    let details = item.details;
    if(details==null) {
        details="No details available";
    }
    const [activeSections, setActiveSections] = useState([])
    const sections:Section[] = [
        {
            title: 'Basic Information',
            content: <><Text style={styles.small}>Rocket Id:{item.id}</Text>
            <Text style={styles.small}>Launch Date:{localDate}</Text>
            <Text style={styles.small}>Crew:{crew}</Text>
            </>
        },
        {
            title: 'Mission Details',
            content: <Text style={styles.small}>{details}</Text>
            
        },
        {
            title: 'Rocket Status',
            content: <><Text style={styles.small}>Reused:{reused}</Text>
            <Text style={styles.small}>Recovery attempt:{recovery_attempt}</Text>
            <Text style={styles.small}>Recover:{recovered}</Text>
            </>
        },

    ];

    function renderHeader(section: Section, _: any, isActive: boolean) {
        return (
            <View style= {styles.accordHeader}>
                <Text style= {styles.accordTitle}>{section.title}</Text>
                <AntDesign name={ isActive? "caretup": "caretdown"} size={20} color="#bbb" />
            </View>
        );
    };

    function renderContent(section: Section, _: any, isActive: boolean) {
        return (
            <View style={styles.accordBody}>
                {section.content}
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.container}>
            <ImageCard uri={item.links.patch.small}></ImageCard>
                <Accordion
                    align='bottom'
                    sections={sections}
                    activeSections={activeSections}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    onChange={(sections:any) => setActiveSections(sections)}
                    sectionContainerStyle={styles.accordContainer}
                />
            </ScrollView>
        </SafeAreaView>    
    );
}

const radius = 20;
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    text: {
        color: '#101010',
        fontSize: 24
    },
    accordContainer: {
        paddingBottom: 8
    },
    accordHeader: {
        padding:12,
        backgroundColor:'mediumturquoise',
        color:'#eee',
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    accordTitle: {
        fontSize: 20,
    },
    accordBody: {
        padding: 12
    },
    small: {
        fontSize: 18,
        fontStyle: 'italic'
    },
    image: {
        height:windowWidth - 50,
        width: windowWidth - 25,
        marginTop: 10,
        marginBottom: 10,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        alignContent: 'center',
        alignSelf: 'center'
    },
})

export default RocketInfoScreen;