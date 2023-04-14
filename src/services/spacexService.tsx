import ErrorMessage from "../components/ErrorMessage";
import {View} from 'react-native'
const getUpcomingLaunches = async() => {
    console.log("invoking!")
    try {
        const response = await fetch('https://api.spacexdata.com/v5/launches');
        const json = await response.json();
        console.log("got response")
        return json
      } catch (error) {
        return null
      } finally {
        console.log("all set!")
      }
    };

export default getUpcomingLaunches;