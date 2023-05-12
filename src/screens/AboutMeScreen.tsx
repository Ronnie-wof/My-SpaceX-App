// About me section with name, phone and email address
import React, { useState, useEffect } from 'react'
import {Text, StyleSheet, View, Image, ScrollView, ActivityIndicator} from "react-native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RocketDetailStackParam } from '../../App'
import type { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


type AboutMeNavigationProp = NativeStackNavigationProp<
    RocketDetailStackParam,
    'AboutMe'
>;

type AboutMeRouteProp = RouteProp<RocketDetailStackParam, 'AboutMe'>;

interface AboutMeScreenProps {
    navigation: AboutMeNavigationProp;
    route: AboutMeRouteProp;
}

const AboutMeScreen = ({navigation, route}:AboutMeScreenProps) => {
  useEffect(()=> {
    navigation.setOptions({title:'My first react native app!', headerTitleStyle: {color:'#191970', fontWeight: 'bold'}})
}, []);
    const [loading, setLoading] = useState(false);
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
            <Image source={require('../../assets/sharoni.jpg')} style={[styles.Image,
                    {
                      width: 250,
                      height: 250,
                    },
                  ]}
                  resizeMode="center"
                  onLoadStart={() => setLoading(true)}
                  onLoadEnd={() => setLoading(false)}
                />
                {loading && <ActivityIndicator color="green" size="large" />} 
            <Text style={styles.name}>Sharoni Roy Chowdhury</Text>
            <View style={styles.phone}>
                <Feather name="phone" size={25} color="#bbb" />
                <Text style={styles.phoneNumber}>(975)1233358</Text>
            </View>
            <View style={styles.email}>
                <MaterialIcons name="email" size={24} color="black" />
                <Text style={styles.emailid}>sharoni.royc@gmail.com</Text>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    Image: {
      shadowColor: "black",
      shadowOffset: {
        width: -10,
        height: 9,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      alignSelf: 'center'
    },
    name: {
        marginVertical:10,
        fontSize:20,
        fontWeight:'800',
        alignSelf: 'center'
    },
    phone: {
        marginVertical: 10,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    phoneNumber: {
        fontSize:18,
        marginLeft: 10
    },
    email: {
        marginVertical: 10,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    emailid: {
        fontSize:18,
        marginLeft: 10
    }
  });

export default AboutMeScreen;
