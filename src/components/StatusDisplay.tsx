// Rocket status display component (currently displayed on RocketInfoScreen)
import React from 'react'
import {StyleSheet, Text} from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';

interface statusDisplayProps {
    label: string,
    status: boolean | null
}

const StatusDisplay:React.FC<statusDisplayProps> = ({label, status}) => {
    return (
        <Text style={styles.small}>
                {label}: { status == null && <Text style={styles.text}>No data available</Text> } 
                {status === true && <AntDesign name="checkcircle" size={24} color="black" />}
                {status === false && <Entypo name="circle-with-cross" size={24} color="black"  />}
        </Text>
    );
}

const styles = StyleSheet.create({
    small: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    text: {
        fontWeight: 'normal',
        fontStyle: 'italic'
    }
});

export default StatusDisplay;