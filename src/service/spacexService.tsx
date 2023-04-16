// service file containing the API calls to SpaceX and some common functions used across the application
import { getLaunches, spacexAPI } from "../configuration/spacexConfiguration";
import { Crew } from "../model/models";

// function making the API call to fetch SpaceX launch information
const getUpcomingLaunches = async() => {
    try {
        const response = await fetch(spacexAPI+getLaunches);
        const json = await response.json();
        return json
      } catch (error) {
        return null
      } finally {
        console.log("all set!")
      }
    };

  // common function used to convert unix timestamp into date
  export const fetchLocalDateToUser = (unixTimestamp:string) => {
    if(unixTimestamp == null) {
        return "No information available."
    }
    const unixTime = Number(unixTimestamp);
    const date = new Date(unixTime * 1000);

    // Get current date and time in local timezone
    const currentDate = date.toLocaleString();
    return currentDate
  }
  
  // common function used to fetch crew information. Returning "No crew" if no information available.
  export const fetchCrew = (crew:Crew[]):string => {
    if (crew.length === 0) {
        return "No crew";
    } else {
        const roles = crew.map(c => c.role);
        return roles.join(", ");
    }
  }

export default getUpcomingLaunches;