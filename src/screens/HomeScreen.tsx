// the screen which will have the list view of information regarding spacex launches
import React from 'react'
import {View, StyleSheet, Button, SafeAreaView, ActivityIndicator, Pressable, Text} from 'react-native'
import { Searchbar } from 'react-native-paper';
import { RocketDetailStackParam } from '../../App'
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { useEffect, useState} from 'react';
import getUpcomingLaunches from '../service/spacexService';
import { FlatList } from 'react-native-gesture-handler';
import { Launch } from '../model/models';
import { RocketCard } from '../components/RocketCard';
import ErrorMessage from '../components/ErrorMessage';
import {Picker} from '@react-native-picker/picker';

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
    const [filteredDataSource, setFilteredDataSource] = useState<Launch[]>([]);
    const [search, setSearch] = useState('');
    const [selectedValue, setSelectedValue] = useState("");
    const [searchByValue, setSearchBySelectedValue] = useState("name");
    
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
              <Pressable style={styles.button} onPress={() => navigation.navigate('AboutMe')}>
                  <Text style={styles.headerButton}>About me</Text>
              </Pressable>
            ),
        });
        const fetchData = async () => {
            const launches = await getUpcomingLaunches();
            setData(launches)
            setFilteredDataSource(launches)
            if(data!=null && launches.length>0) {
                setLoading(false)
            }
          };
        
        //if data is not fetched within 5 seconds, stop showing the activity indicator
        setTimeout(() => {
            setLoading(false);
        }, 5000)
        fetchData();
      }, []);

      // searching either by id, flight number or name
      const searchFilterFunction = (text:string) => {
            let newData = null
            if (text) {
              switch(searchByValue) 
              {
                  case "id": newData = fetchDataById(text)
                  break
                  case "flight_number": newData = fetchDataByFlightNumber(text)
                  break
                  case "name": newData = fetchDataByName(text)
                  break
                  case "crew": newData = fetchDataByCrewName(text)
                  break
              }
            if(newData!=null) {
              setFilteredDataSource(newData); 
            }
            else {
              setFilteredDataSource(data);
            }
            setSearch(text);
            }
            else {
              setFilteredDataSource(data);
              setSearch(text);
            }

      };
      
      // search by name
      const fetchDataByName = (text:string) => {
        const newData = data.filter(function (item) {
          // Applying filter for the inserted text in search bar
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        return newData
      }
      
      // search by id
      const fetchDataById = (text:string) => {
        const newData = data.filter(function (item) {
          // Applying filter for the inserted text in search bar
          const itemData = item.id
            ? item.id
            : ''.toUpperCase();
          const textData = text;
          return itemData.startsWith(textData);
        });
        return newData
      }
      
      // search by flight number
      const fetchDataByFlightNumber = (text:string) => {
        const newData = data.filter(function (item) {
          // Applying filter for the inserted text in search bar
          const itemData = item.flight_number
            ? item.flight_number.toString()
            : ''.toUpperCase();
          const textData = text;
          return itemData.startsWith(textData);
        });
        return newData
      }

      // search by crew
      // search by crew name
      const fetchDataByCrewName = (text: string) => {
        const newData = data.filter(function (item) {
          // Applying filter for the inserted text in search bar
          const crew = item.crew || [];
          const found = crew.some((member) =>
            member.role.indexOf(text) > -1
          );
          return found;
        });
        return newData;
      };


      // data shown according to the desired order of time
      const setDataBySortOrder = (order:string) => {
        const sortedData = data.sort((a, b) => {
            if (order === 'latest') {
              return Number(b.date_unix) - Number(a.date_unix)
            } else {
              return Number(a.date_unix) - Number(b.date_unix)
            }
          });
        
        if(selectedValue !== order) {
            setSearch('')
        }
        setData(sortedData)
        setFilteredDataSource(sortedData)
        setSelectedValue(order); 
      }

      
      if (!isLoading && (data==null || data.length===0)) {
        return <ErrorMessage message='No data available. Please try again!'/>;
      }
    

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (<ActivityIndicator color="green" size="large"/>) : (
        <View style={styles.container}>
          
            <Searchbar style={styles.search}
                placeholder="Type here..."
                onChangeText={searchFilterFunction}
                value={search}
            />
            <View style= {styles.filter}>
            <Picker style={styles.picker}
                selectedValue={searchByValue}
                onValueChange={(itemValue: string) =>
                    setSearchBySelectedValue(itemValue)
                }
                prompt="Search By:"
                >
                
                <Picker.Item label="  Name" value="name" />
                <Picker.Item label="  Id" value="id" />
                <Picker.Item label="  Flight Number" value="flight_number" />
                <Picker.Item label="  Crew" value="crew" />
            </Picker>
            <Picker style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={(itemValue: string) =>
                    setDataBySortOrder(itemValue)
                }
                
                >
                <Picker.Item label="Oldest" value="oldest" />
                <Picker.Item label="Latest" value="latest" />
            </Picker>
        </View>
            <FlatList  
                     showsHorizontalScrollIndicator={false}
                     data={filteredDataSource}
                     renderItem ={({ item }: { item: Launch }) =>  <RocketCard item={item} onTap={(item: Launch) => onTapRocket({navigation, item})} /> } 
                     keyExtractor={(item) => `${item.id}`}
                    /> 
            </View>)}
        </SafeAreaView>         
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#dcdcdc',
        alignItems: 'center'
    },
    filter: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    search: {
       marginTop:7,
    },
    picker: {
        marginLeft: 5,
        width: 170,
        borderColor: 'black',
    },
    button: {
      backgroundColor: "#191970",
      padding: 10,
      borderRadius: 8,
      color: "white"
    },
    headerButton: {
      color: "white",
      fontSize: 15,
      fontWeight: 'bold'
    }
}
)

export default HomeScreen;