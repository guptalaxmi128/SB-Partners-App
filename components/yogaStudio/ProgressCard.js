import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";

const ProgressCard = ({ studio, progress, onIncrease }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Progress.Circle
          size={50}
          progress={progress}
          showsText={true}
          formatText={() => `${Math.round(progress * 100)}%`}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Increase Business Profile Score</Text>
          <Text style={styles.subtitle}>
            {/* Progress: {Math.round(progress * 100)}% */}
            Reach out to more customers
          </Text>
          <TouchableOpacity style={styles.button} onPress={onIncrease}>
            <Text style={styles.buttonText}>Increase Score</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProgressCard;
