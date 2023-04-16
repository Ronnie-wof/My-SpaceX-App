import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import RocketInfoScreen from './src/screens/RocketInfoScreen';
import { Launch } from './src/model/models';
import AboutMeScreen from './src/screens/AboutMeScreen';

export type RocketDetailStackParam = {
  Home: undefined,
  RocketInfo: {rocket:Launch}
  AboutMe: undefined
};

const Stack = createNativeStackNavigator<RocketDetailStackParam>();
export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={()=>({
            headerStyle: {backgroundColor: '#87ceeb'}, headerTitleStyle: {color: '#191970', fontWeight: 'bold'} , title: 'SpaceX - Launches'
          })}>
            <Stack.Screen name ="Home" component={HomeScreen}/>
            <Stack.Screen name="RocketInfo" component={RocketInfoScreen}/>
            <Stack.Screen name="AboutMe" component={AboutMeScreen}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}