import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Accordion = ({ title, answer }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setAccordionOpen(!accordionOpen)}
        style={styles.header}
      >
        <Text style={[styles.title, accordionOpen && styles.openTitle]}>
          {title}
        </Text>
        <Text style={styles.icon}>{accordionOpen ? "-" : "+"}</Text>
      </TouchableOpacity>
      {accordionOpen && (
        <View style={styles.content}>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "300",
    fontFamily:'Poppins'
  },
  openTitle: {
    color: "#008000", // Change color when accordion is open
  },
  icon: {
    fontSize: 20,
    fontWeight: "300",
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  answer: {
    fontSize: 14,
    fontFamily:'Poppins'
  },
});

export default Accordion;
