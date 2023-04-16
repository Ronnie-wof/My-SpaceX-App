// Rocket information display component (currently displayed on RocketInfoScreen)
import React from 'react'
import {View, StyleSheet, Text} from 'react-native'

interface informationDisplayProps {
    label: string,
    value: string
}

const InformationDisplay:React.FC<informationDisplayProps> = ({label, value}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}:  </Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        marginBottom: 5
    },
    label: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 18,
    },
    value: {
        fontSize: 18,
        fontStyle: 'italic'
    }
});

export default InformationDisplay;