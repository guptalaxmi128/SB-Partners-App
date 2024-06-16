import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const AddCustomData = ({ languages, setLanguages,label,isRequired=false }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleInputConfirm = () => {
    if (inputValue) {
      setLanguages([...languages, inputValue]); // Add the new language to the list
    }
    setInputVisible(false);
    setInputValue("");
  };

  const showInput = () => {
    setInputVisible(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}{isRequired && <Text style={{ color: 'red' }}> *</Text>}</Text>
      <View style={styles.languageContainer}>
        {inputVisible ? (
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={inputValue}
            onChangeText={handleInputChange}
            onBlur={handleInputConfirm}
            placeholder={label}
          />
        ) : (
          <TouchableOpacity onPress={showInput} style={styles.tag}>
            <AntDesign name="plus" size={16} color="#333" />
            <Text style={styles.tagText}>New {label}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  tagText: {
    marginLeft: 5,
  },
});

export default AddCustomData;
