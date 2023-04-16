// the screen which will have the view for each individual spaceX launch
import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import type { RouteProp } from '@react-navigation/native';
import { RocketDetailStackParam } from '../../App'
import Accordion from 'react-native-collapsible/Accordion';
import { AntDesign } from '@expo/vector-icons'; 
import { fetchCrew, fetchLocalDateToUser } from '../service/spacexService';
import ImageCard from '../components/ImageCard';
import InformationDisplay from '../components/InfomationDisplay';
import StatusDisplay from '../components/StatusDisplay';

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
        navigation.setOptions({title:route.params.rocket.name, headerTitleStyle: {color:'#191970', fontWeight: 'bold'}})
    }, []);
    const item = route.params.rocket;
    
    const localDate = fetchLocalDateToUser(item.date_unix)
    const crew = fetchCrew(item.crew)
    let reused = null, recovery_attempt = null, recovered = null

    if(item.fairings != null) {
        if(item.fairings.reused != null) {
            reused = item.fairings.reused
        }
        
        if(item.fairings.recovery_attempt != null) {
            recovery_attempt = item.fairings.recovery_attempt
        }
    
        if(item.fairings.recovered != null) {
            recovered = item.fairings.recovered
        }
    }
    
    
    
    let details = item.details;
    if(details==null) {
        details="No details available";
    }
    const [activeSections, setActiveSections] = useState([])
    const sections:Section[] = [
        {
            title: 'Basic Information',
            content: (
                <Text>
                  <>
                  <View style={{ flexDirection: 'column' }}>
                    <InformationDisplay label='Rocket Id' value={item.id} />
                    <InformationDisplay label='Launch Date' value={localDate} />
                    <InformationDisplay label='Crew' value={crew} />
                    </View>
                  </>
                </Text>
              )
        },
        {
            title: 'Mission Details',
            content: <Text style={styles.small}>{details}</Text>
            
        },
        {
            title: 'Rocket Status',
            content: (
                <Text>
                    <>
                    <View style={{ flexDirection: 'column' }}>
                        <StatusDisplay label="Reused " status={reused}></StatusDisplay>
                        <StatusDisplay label="Recovery attempt " status={recovery_attempt}></StatusDisplay>
                        <StatusDisplay label="Recovered " status={recovered}></StatusDisplay>
                    </View>
                    </>
                </Text>
            )
        },

    ];

    function renderHeader(section: Section, _: any, isActive: boolean) {
        return (
            <View style= {styles.accordHeader}>
                <Text style= {styles.accordTitle}>{section.title}</Text>
                <AntDesign name={ isActive? "caretup": "caretdown"} size={20} color="#191970" />
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


const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    accordContainer: {
        paddingBottom: 8
    },
    accordHeader: {
        padding:12,
        backgroundColor:'white',
        borderWidth:1,
        borderColor: '#191970',
        color:'#eee',
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    accordTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#191970'
    },
    accordBody: {
        padding: 12
    },
    small: {
        fontSize: 18,
        fontStyle: 'italic'
    },
})

export default RocketInfoScreen;