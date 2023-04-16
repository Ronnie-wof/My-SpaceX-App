# My SpaceX App

**My SpaceX App** is a mobile application which shows the SpaceX launches using this [API](https://api.spacexdata.com/v5/launches). In addition, it has the following implementations.

1. **Home Screen**: Information about the rocket launches is fetched using the SpaceX API. All the different launch information is then shown in the form of a list. Users can search using name, flight number, id or crew role. Additionally, they can also view the list from the oldest to latest launches, or vice versa.
2. **Rocket Information**: On selecting a launch, more information is displayed to the user. This will include the basic information (id, flight number, crew), mission details and rocket status.
3. **About Me**: An about me section which appears as a button on the Home screen navigation bar.


## Built with
- [Expo](https://expo.dev/) 
- [ReactNative](https://reactnative.dev/)
- [TypeScript](https://reactnative.dev/docs/typescript)

## Getting Started

#### Couple of dependencies had to be installed to run the application:

* For handling navigation:
```
npx expo install @react-navigation/native
npx expo install @react-navigation/native-stack
npx expo install react-native-screens 
npx expo install react-native-safe-area-context
```
* Components:
```
npm install react-native-elements
npx expo install @react-native-picker/picker  
npm install --save react-native-collapsible
```
For ref:
[react-native-picker documentation](https://docs.expo.dev/versions/latest/sdk/picker/)

* Testing [jest-expo](https://docs.expo.dev/guides/testing-with-jest/)
```
npx expo install jest-expo jest
npx expo install react-test-renderer@18.2.0
npm install --save-dev @types/react-test-renderer
npm i --save-dev @types/jest
```
#### Run test cases

```
npm run test
```
#### Run application

```
npx expo start
```
## Folder Structure
1. *__src__*: Comprises the following:
    * components folder: Has the custom made components which have been used in the application
    * screens folder: Contains the different screens (Home, RocketInfo and AboutMe) which the user can currently access
    * service folder: Contains API calls and common functions used across the application
    * model folder: Contains the model structure for responses of API calls
    * configuration folder: Contains the configuration file for using common values across the application
2. *__tests__*: Testing has been done using jest. This folder contains the test files; contains snapshot tests for all custom made components







