import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = ({ title, icon, buttonText, onPress, destination }) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    if (destination) {
      navigation.navigate(destination);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Image source={icon} style={styles.back} />
      </TouchableOpacity>

      <Text style={[styles.title, { marginLeft: 20 }]}>{title}</Text>

      {buttonText && (
        <TouchableOpacity onPress={handleNavigation}>
          <View style={styles.btnContainer}>
            <Text style={styles.btn}>{buttonText}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    height: 70,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    elevation: 0.1,
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 15,
  },
  back: {
    width: 20,
    height: 20,
    marginTop: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily:'Poppins',
    width: 190,
  },
  btnContainer: {
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(107, 78, 255, 1)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  btn: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
