// components/ContentSection.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ContentSection = ({ title, children }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    color: "#5F33E1",
    // marginVertical: 10,
  },
});

export default ContentSection;
