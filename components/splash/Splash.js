import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image,StatusBar } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("MainStack");
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
     <StatusBar translucent backgroundColor="#284F49" />
      <Image source={require("../../assets/sb.jpg")} style={styles.logo} />
      <Text style={styles.title}> Welcome Partner</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#284F49",
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
  },
});

export default SplashScreen;
