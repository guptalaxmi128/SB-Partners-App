import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const CustomService = ({ heading, options }) => {
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const optionRows = chunkArray(options, 2);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}>
        <View>
          <View style={{ flex: 1,marginVertical:10 }}>
            <Text style={styles.textHeading}>{heading}</Text>
            {optionRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.optionRow}>
                {row.map((option, index) => (
                  <View key={index} style={styles.optionContainer}>
                    <FontAwesome name="check-circle-o" size={24} color="green" />
                    <Text style={styles.optionText}>{option}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textHeading: {
    fontFamily: "PoppinsBold",
    fontSize: hp(2.2),
    fontWeight: "500",
    marginVertical: 10,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontFamily: "Poppins",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default CustomService;
