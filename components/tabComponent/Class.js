import React, { useState,useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar 
} from "react-native";
import NavigationBarColor from 'react-native-navigation-bar-color';
import Header from "../header/Header";

const Class = ({ navigation }) => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: "History",
      time: "10:00 AM - 11:00 AM",
      avatars: [
        require("../../assets/avatar1.png"),
        require("../../assets/avatar2.jpg"),
        require("../../assets/avatar3.jpg"),
      ],
      numStudents: 5,
    },
    {
        id: 2,
        title: "Physics",
        time: "10:00 AM - 11:00 AM",
        avatars: [
          require("../../assets/avatar1.png"),
          require("../../assets/avatar2.jpg"),
          require("../../assets/avatar3.jpg"),
        ],
        numStudents: 10,
      },
      {
        id: 3,
        title: "History",
        time: "10:00 AM - 11:00 AM",
        avatars: [
          require("../../assets/avatar1.png"),
          require("../../assets/avatar2.jpg"),
          require("../../assets/avatar3.jpg"),
        ],
        numStudents: 5,
      },
      {
        id: 4,
        title: "History",
        time: "10:00 AM - 11:00 AM",
        avatars: [
          require("../../assets/avatar1.png"),
          require("../../assets/avatar2.jpg"),
          require("../../assets/avatar3.jpg"),
        ],
        numStudents: 5,
      },
      {
        id: 5,
        title: "Geography",
        time: "11:00 AM - 12:00 PM",
        avatars: [
          require("../../assets/avatar1.png"),
          require("../../assets/avatar2.jpg"),
          require("../../assets/avatar3.jpg"),
        ],
        numStudents: 8,
      },
      {
        id: 6,
        title: "Physics",
        time: "11:00 AM - 12:00 PM",
        avatars: [
          require("../../assets/avatar1.png"),
          require("../../assets/avatar2.jpg"),
          require("../../assets/avatar3.jpg"),
        ],
        numStudents: 6,
      },

  ]);

  // useEffect(() => {
  //   NavigationBarColor.changeNavigationBarColor('#FFFFFF'); // Change color to white
  //   // Optionally, return a cleanup function to reset the color when the component unmounts
  //   return () => {
  //     NavigationBarColor.changeNavigationBarColor('#000000'); // Reset color to black
  //   };
  // }, []);

  const handleStartClass = (classId) => {
    // Functionality to start the class with the given ID
  };

  return (
    <View style={styles.container}>
    <View style={{paddingTop:15}}>
      <Header
        title={"Today's Classes"}
        icon={require("../../assets/back.png")}
      />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          {classes.map((cls) => (
            <View key={cls.id} style={styles.cardContainer}>
              <View style={styles.leftContainer}>
                <Text style={styles.historyText}>{cls.title}</Text>
                <Text style={styles.timeText}>{cls.time}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.avatarsContainer}>
                    {cls.avatars.map((avatar, index) => (
                      <Image
                        key={index}
                        source={avatar}
                        style={[styles.avatar, index !== 0 && { marginLeft: -15 }]}
                      />
                    ))}
                    <Text style={styles.studentsText}>
                      +{cls.numStudents} Students
                    </Text>
                 
                  </View>
                  <TouchableOpacity
                      style={styles.startButton}
                      onPress={() => handleStartClass(cls.id)}
                    >
                      <Text style={styles.startButtonText}>Start</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 8,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 10,
  },
  leftContainer: {
    flex: 1,
  },
  historyText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily:'Poppins'
  },
  timeText: {
    color: "#666",
    marginTop: 5,
    fontFamily:'Poppins'
  },
  avatarsContainer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth:3,
    borderColor:'#fff'
    // marginRight: 5,
  },
  studentsText: {
    color: "#666",
    marginTop: 5,
    fontFamily:'Poppins'
  },
  startButton: {
    backgroundColor: "lightgray",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  startButtonText: {
    fontWeight: "400",
    fontFamily: "Poppins",
  },
});

export default Class;
