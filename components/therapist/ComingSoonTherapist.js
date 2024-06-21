import React, { useEffect } from "react";
import { Text, View, StyleSheet, StatusBar, Image, BackHandler } from "react-native";
import Header from "../header/Header";

const ComingSoonTherapist = ({ navigation }) => {
  useEffect(() => {
    const handleBackPress = () => {
      if (navigation.isFocused()) {
        navigation.goBack();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 20 }}>
        <Header title={"Therapist"} icon={require("../../assets/back.png")} />
      </View>

      <View style={styles.contentContainer}>
      <View style={styles.imageContainer}>
          <Image source={require("../../assets/coming-soon.png")} style={styles.image} />
        </View>
        <Text style={styles.text1}>Coming Soon....</Text>
        <Text style={styles.text}>We will start this service soon</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
      backgroundColor:'#5F33E1'
    // paddingHorizontal: 20,
  },
  imageContainer: {
    width: 250,
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text: {
    marginTop: 5,
    fontFamily: "Poppins",
    fontSize: 18,
    textAlign: "center",
    color:'#fff'
  },
  text1: {
    marginTop: 40,
    fontFamily: "PoppinsSemiBold",
    fontSize: 20,
    textAlign: "center",
    color:'#fff'
  },
});

export default ComingSoonTherapist;
