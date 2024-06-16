import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  option3,
  option4,
  option5,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = (value) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  const options = [
    { id: 1, label: option1 },
    { id: 2, label: option2 },
    { id: 3, label: option3 },
    { id: 4, label: option4 },
    { id: 5, label: option5 },
  ];

  return (
    <FlatList
      horizontal
      data={options}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updateSwitchData(item.id)}
          style={styles.touchable}
        >
          <Text
            style={[
              styles.text,
              { color: getSelectionMode === item.id ? "#284F49" : "gray" },
            ]}
          >
            {item.label}
          </Text>
          <View
            style={[
              styles.underline,
              { borderBottomColor: getSelectionMode === item.id ? "#284F49" : "white" },
            ]}
          />
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    alignItems: "center",
  },
  touchable: {
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 16,
  },
  underline: {
    position: "relative",
    width: "75%",
    borderBottomWidth: 2,
    opacity: 10,
    marginTop: 5,
  },
});
