// the screen which will have the list view of all upcoming launches
import React from 'react'
import {StyleSheet, Button, SafeAreaView, ActivityIndicator} from 'react-native'
import { RocketDetailStackParam } from '../../App'
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { useEffect, useState, useRef } from 'react';
import getUpcomingLaunches from '../services/spacexService';
import { FlatList } from 'react-native-gesture-handler';
import { Launch } from '../services/models';
import { RocketCard } from '../components/RocketCard';
import ErrorMessage from '../components/ErrorMessage';
type HomeNavigationProp = NativeStackNavigationProp<
    RocketDetailStackParam,
    'Home'
>;

type HomeRouteProp = RouteProp<RocketDetailStackParam, 'Home'>;

interface IsHomeScreenProps {
    navigation: HomeNavigationProp;
    route: HomeRouteProp;
}

interface tapProps {
    navigation: HomeNavigationProp;
    item: Launch;
}

const onTapRocket = ({navigation, item}:tapProps) => {
    navigation.navigate('RocketInfo', {'rocket':item})
}

const HomeScreen = ({navigation, route}:IsHomeScreenProps) => {
    const [data, setData] = useState<Launch[]>([]);
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate('AboutMe')} title='About Me'/>
            ),
        });
        const fetchData = async () => {

            console.log("before invoking")
            const launches = await getUpcomingLaunches();
            setData(launches)
            console.log("after invoking")
            const bool = data!=null
            console.log(bool)
            const bool1 = data.length>0
            console.log(bool1)
            //console.log(data)
            const size = launches.length
            console.log(size)
            if(data!=null && launches.length>0) {
                console.log("called  2nd")
                setLoading(false)
            }
          };
        
        setTimeout(() => {
            console.log("called 1st")
            setLoading(false);
        }, 5000)
        fetchData();
      }, []);

      if (!isLoading && (data==null || data.length===0)) {
        return <ErrorMessage message='No data available. Please try again!'/>;
      }
    

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (<ActivityIndicator color="green" size="large"/>) : (
            <FlatList  
                     showsHorizontalScrollIndicator={false}
                     data={data}
                     renderItem ={({ item }: { item: Launch }) =>  <RocketCard item={item} onTap={(item: Launch) => onTapRocket({navigation, item})} /> } 
                     keyExtractor={(item) => `${item.id}`}
                    /> )}
        </SafeAreaView>         
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#dcdcdc',
        alignItems: 'center'
    },
    text: {
        color: '#101010',
        fontSize: 24
    }
}

)

export default HomeScreen;