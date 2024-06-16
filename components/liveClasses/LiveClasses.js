import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar
} from "react-native";
import Header from "../header/Header";

const LiveClasses = ({ navigation }) => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: "Morning Yoga Class",
      time: "10 h 20 min",
      date: "19/04/24",
      image: require("../../assets/classes/live.jpg"),
    },
    {
      id: 2,
      title: "Morning Yoga Class",
      time: "10 h 20 min",
      date: "19/04/24",
      image: require("../../assets/classes/live.jpg"),
    },
    {
      id: 3,
      title: "Morning Yoga Class",
      time: "10 h 20 min",
      date: "19/04/24",
      image: require("../../assets/classes/live.jpg"),
    },
    {
      id: 4,
      title: "Morning Yoga Class",
      time: "10 h 20 min",
      date: "19/04/24",
      image: require("../../assets/classes/live.jpg"),
    },
    {
      id: 5,
      title: "Morning Yoga Class",
      time: "10 h 20 min",
      date: "19/04/24",
      image: require("../../assets/classes/live.jpg"),
    },
    {
      id: 6,
      title: "Morning Yoga Class",
      time: "10 h 20 min",
      date: "19/04/24",
      image: require("../../assets/classes/live.jpg"),
    },
  ]);

  const handleStartClass = (classId) => {
    // Functionality to start the class with the given ID
  };

  return (
    <View style={styles.container}>
     <StatusBar translucent backgroundColor="transparent" />
       <View style={{paddingTop:15}}>
      <Header title={"Live Classes"} icon={require("../../assets/back.png")} />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          {classes.map((cls) => (
            <TouchableOpacity
              key={cls.id}
              style={styles.cardContainer}
              onPress={() => handleStartClass(cls.id)}
            >
              <View style={styles.leftContainer}>
                <Image source={cls.image} style={styles.image} />
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.historyText}>{cls.title}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.dateTimeContainer}>
                    <Image
                      style={{ width: 24, height: 24 }}
                      source={require("../../assets/classes/calendar.png")}
                    />
                    <Text style={styles.dateText}>{cls.date}</Text>
                  </View>
                  <View style={styles.dateTimeContainer}>
                    <Image
                      style={{ width: 24, height: 24 }}
                      source={require("../../assets/classes/alarm.png")}
                    />
                    <Text style={styles.timeText}>{cls.time}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f9",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 10,
  },
  leftContainer: {
    marginRight: 15,
  },
  rightContainer: {
    flex: 1,
    paddingRight:15
  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 10,
  },
  historyText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
// paddingHorizontal:5
  },
  dateText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins",
  },
  timeText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins",
  },
});

export default LiveClasses;
