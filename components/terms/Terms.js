import React, { useState,useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler
} from "react-native";
import Header from "../header/Header";

const Terms = ({ navigation }) => {
  useEffect(() => {
    const handleBackPress = () => {
      if (navigation.isFocused()) {
        // Check if the current screen is focused
        navigation.goBack(); // Go back if the current screen is focused
        return true; // Prevent default behavior (exiting the app)
      }
      return false; // If not focused, allow default behavior (exit the app)
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Header
        title={"Legal and Policies"}
        icon={require("../../assets/back.png")}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Poppins",
                fontWeight: "bold",
                marginLeft:20
              }}
            >
              Terms
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins",
                color: "gray",
                fontWeight: "400",
                padding:20,
                textAlign:'justify'
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
              It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </View>
       
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Poppins",
                fontWeight: "bold",
                marginLeft:20
              }}
            >
              Changes to the Service & Terms:
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins",
                color: "gray",
                fontWeight: "400",
                padding:20,
                textAlign:'justify'
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
              It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </View>
        
       
     
        
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Otp")}>
              <View style={styles.button}>
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 18,
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Continue
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  button: {
    marginTop: 80,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "rgba(107, 78, 255, 1)",
    height: 50,
    width: "90%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Terms;
