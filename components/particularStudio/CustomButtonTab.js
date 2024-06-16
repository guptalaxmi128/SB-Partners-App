import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

export default function CustomButtonTab({
  selectionMode,
  options,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = (value) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

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
              { color: getSelectionMode === item.id ? "#4185cb" : "gray" },
              { borderColor: getSelectionMode === item.id ? "#4185cb" : "gray" },
              { backgroundColor: getSelectionMode === item.id ? "#cef8ff" : "#f5f5f5" }
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
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
    fontSize: 14,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
