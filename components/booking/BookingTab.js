import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function BookingTab({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = (value) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };
  return (
    <View
      style={{
        height: hp("6.5%"),
        width: "100%",
        backgroundColor: "#5F33E1",
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: wp("100%"),
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          backgroundColor:
            getSelectionMode == 1 ? "#fff" : null,
          borderRadius: wp("100%"),
          justifyContent: "center",
          alignItems: "center",
          height: hp("5%"),
        margin:5
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: wp("3.5%"),
            color: getSelectionMode == 1 ? "#5F33E1" : "#fff",
          }}
        >
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          backgroundColor:
            getSelectionMode == 2 ? "#fff" : null,
          borderRadius: wp("100%"),
          justifyContent: "center",
          alignItems: "center",
          height: hp("5%"),
          margin:5
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: wp("3.5%"),
            color: getSelectionMode == 2 ? "#5F33E1" : "#fff",
          }}
        >
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
