// Rocket information display component (currently displayed on RocketInfoScreen)
import React from 'react'
import {View, StyleSheet, Text, Dimensions} from 'react-native'

interface informationDisplayProps {
    label: string,
    value: string
}
const windowWidth = Dimensions.get("window").width;
const InformationDisplay: React.FC<informationDisplayProps> = ({ label, value }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}: </Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      marginBottom: 5,
      width: "100%",
    },
    label: {
      fontWeight: "bold",
      fontStyle: "italic",
      fontSize: 18,
    },
    valueContainer: {
      width: windowWidth * 0.8,
    },
    value: {
      fontSize: 18,
      fontStyle: "italic",
    },
  });
  
export default InformationDisplay;