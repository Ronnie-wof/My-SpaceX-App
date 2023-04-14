import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import RocketInfoScreen from './src/screens/RocketInfoScreen';
import { Launch } from './src/services/models';
import AboutMeScreen from './src/screens/AboutMeScreen';

export type RocketDetailStackParam = {
  Home: undefined,
  RocketInfo: {rocket:Launch}
  AboutMe: undefined
};

const DetailsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator<RocketDetailStackParam>();
export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={()=>({
            headerStyle: {backgroundColor: 'mediumturquoise'}
          })}>
            <Stack.Screen name ="Home" component={HomeScreen}/>
            <Stack.Screen name="RocketInfo" component={RocketInfoScreen}/>
            <Stack.Screen name="AboutMe" component={AboutMeScreen}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
