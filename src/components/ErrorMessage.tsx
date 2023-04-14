import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import { Entypo } from '@expo/vector-icons';


interface errorMessageProps {
    message: string
}
const ErrorMessage:React.FC<errorMessageProps> = ({message}) => {
    return (
        <View style={styles.container}>
            <Entypo name="emoji-sad" size={24} color="black" />
            <Text style={styles.error}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    error: {
        fontSize:20,
        color: '#191970'
    }
  });

  export default ErrorMessage;