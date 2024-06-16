import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../header/Header";

const Language = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title={"Language"} icon={require("../../assets/back.png")} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View></View>
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
    marginTop: 170,
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

export default Language;
