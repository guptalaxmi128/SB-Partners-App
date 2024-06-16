import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import Header from "../header/Header";
import Button from "../button/Button";

const TestStepSecond = () => {
  const totalSteps = 3;
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [timeSlots, setTimeSlots] = useState([
    { selectedDays: [], openAt: "", closeAt: "" },
  ]);
  const [selectAll, setSelectAll] = useState(false);

  const nextStep = () => {
    setCurrentStep((prevStep) =>
      prevStep < totalSteps ? prevStep + 1 : prevStep
    );
  };

  const validate2 = () => {
    let isValid = true;
    // Add your validation logic here
    if (isValid) {
      nextStep();
    }
    return isValid;
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const handleSelectChange = (val, input, index) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index][input] = val;
    setTimeSlots(newTimeSlots);
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { selectedDays: [], openAt: "", closeAt: "" }]);
  };

  const toggleDaySelection = (index, day) => {
    setTimeSlots((prevTimeSlots) =>
      prevTimeSlots.map((slot, i) =>
        i === index
          ? {
              ...slot,
              selectedDays: slot.selectedDays.includes(day)
                ? slot.selectedDays.filter((selectedDay) => selectedDay !== day)
                : [...slot.selectedDays, day],
            }
          : slot
      )
    );
  };

  const daysOfWeek = [
    { label: "Sun", value: "Sunday" },
    { label: "Mon", value: "Monday" },
    { label: "Tue", value: "Tuesday" },
    { label: "Wed", value: "Wednesday" },
    { label: "Thu", value: "Thursday" },
    { label: "Fri", value: "Friday" },
    { label: "Sat", value: "Saturday" },
  ];

  const toggleSelectAll = () => {
    if (selectAll) {
      setTimeSlots((prevTimeSlots) =>
        prevTimeSlots.map((slot) => ({ ...slot, selectedDays: [] }))
      );
    } else {
      setTimeSlots((prevTimeSlots) =>
        prevTimeSlots.map((slot) => ({
          ...slot,
          selectedDays: daysOfWeek.map((day) => day.value),
        }))
      );
    }
    setSelectAll(!selectAll);
  };

  const renderStep2 = () => {
    return (
      <View>
        <Text style={styles.textHeading}>Add Business Timings</Text>
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.label}>
            Let your customers know when you are open for business
          </Text>
          {timeSlots.map((slot, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: hp(2.5),
                  marginTop: 10,
                }}
              >
                Select Days of The Week for Slot {index + 1}
              </Text>
              <View style={styles.daycontainer}>
                {daysOfWeek.map((day) => (
                  <TouchableOpacity
                    key={day.value}
                    style={[
                      styles.dayButton,
                      {
                        backgroundColor: slot.selectedDays.includes(day.value)
                          ? "rgba(102, 42, 178, 1)"
                          : "transparent",
                      },
                    ]}
                    onPress={() => toggleDaySelection(index, day.value)}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        {
                          color: slot.selectedDays.includes(day.value)
                            ? "#fff"
                            : "#000",
                        },
                      ]}
                    >
                      {day.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                style={[
                  { flexDirection: "row", alignItems: "center", marginTop: 10 },
                  {
                    backgroundColor: "transparent",
                  },
                ]}
                onPress={toggleSelectAll}
              >
                <FontAwesome
                  name={selectAll ? "check-square" : "square-o"}
                  size={24}
                  color="#000"
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={{
                    color: "#000",
                    fontFamily: "Poppins",
                    fontSize: hp(2),
                  }}
                >
                  Select All Days
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 0.48 }}>
                  <Text style={styles.label}>Open at</Text>
                  <SelectList
                    setSelected={(text) =>
                      handleSelectChange(text, "openAt", index)
                    }
                    data={daysOfWeek}
                    save="value"
                    fontFamily="Poppins"
                    placeholder="Select"
                    onFocus={() => handleError(null, "openAt")}
                    containerStyle={{ width: wp(40) }}
                  />
                  <Text style={styles.errorText}>{errors.openAt}</Text>
                </View>
                <View style={{ flex: 0.48 }}>
                  <Text style={styles.label}>Close at</Text>
                  <SelectList
                    setSelected={(text) =>
                      handleSelectChange(text, "closeAt", index)
                    }
                    data={daysOfWeek}
                    save="value"
                    fontFamily="Poppins"
                    placeholder="Select"
                    onFocus={() => handleError(null, "closeAt")}
                    containerStyle={{ width: wp(40) }}
                  />
                  <Text style={styles.errorText}>{errors.closeAt}</Text>
                </View>
              </View>
            </View>
          ))}
          <TouchableOpacity onPress={addTimeSlot}>
            <Text style={[styles.label, { color: "rgba(102, 42, 178, 1)" }]}>
              + Add Another Time Slot
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Button title={"Save and Continue"} onPress={validate2} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 15 }}>
        <Header
          title={"List Yoga Studio"}
          icon={require("../../assets/back.png")}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View style={{ paddingVertical: 5 }}>
          <View style={styles.progressContainer}>
            {[...Array(totalSteps)].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressBar,
                  index < currentStep ? styles.progressBarActive : null,
                ]}
              />
            ))}
          </View>
          <View style={{ flex: 1, marginVertical: 10 }}>
            <View>{renderStep2()}</View>
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
    fontFamily: "Poppins",
    fontSize: hp(2.5),
    fontWeight: "500",
    marginVertical: 10,
  },
  label: {
    fontSize: hp(2),
    fontFamily: "Poppins",
  },
  errorText: {
    marginTop: 7,
    color: "red",
    fontSize: hp(1.6),
    fontFamily: "Poppins",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  progressBar: {
    backgroundColor: "#ccc",
    height: 5,
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 5,
  },
  progressBarActive: {
    backgroundColor: "rgba(102, 42, 178, 1)",
  },
  daycontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 10,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
  },
  dayText: {
    fontSize: hp(2),
    fontFamily: "Poppins",
  },
});

export default TestStepSecond;
