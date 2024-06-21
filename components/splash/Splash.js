import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("MainStack");
    }, 3000);
  }, []);

  return (
    <LinearGradient
      colors={["#EEE9FF", "#5F33E1"]}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <Image source={require("../../assets/sb.jpg")} style={styles.logo} />
      <Text style={styles.title}> Welcome Partner</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 20,
    fontFamily:'PoppinsSemiBold'
  },
});

export default SplashScreen;
