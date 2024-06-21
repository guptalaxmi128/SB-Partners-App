import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  BackHandler
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { SelectList } from "react-native-dropdown-select-list";
import Header from "../header/Header";
import Button from "../button/Button";
import { studioStepSecond } from "../../action/yogaStudio/yogaStudio";
import { useDispatch } from "react-redux";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";

const BusinessTimings = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { id } = route.params;

  const timeSlotOptions = [
    { label: "9:00 AM", value: "9:00 AM" },
    { label: "6:00 PM", value: "6:00 PM" },
    { label: "10:00 PM", value: "10:00 PM" },
  ];

  const daysOfWeek = [
    { label: "Sun", value: "Sunday" },
    { label: "Mon", value: "Monday" },
    { label: "Tue", value: "Tuesday" },
    { label: "Wed", value: "Wednesday" },
    { label: "Thu", value: "Thursday" },
    { label: "Fri", value: "Friday" },
    { label: "Sat", value: "Saturday" },
  ];

  const initialValues = {
    timeSlots: [{ selectedDays: [], openAt: "", closeAt: "" }],
  };

  const validationSchema = Yup.object().shape({
    timeSlots: Yup.array().of(
      Yup.object().shape({
        selectedDays: Yup.array().min(1, "Select at least one day."),
        openAt: Yup.string().required("Required"),
        closeAt: Yup.string().required("Required"),
      })
    ),
  });

  useEffect(() => {
    const handleBackPress = () => {
      if (navigation.isFocused()) {
        // Check if the current screen is focused
        navigation.goBack(); // Go back if the current screen is focused
        return true; // Prevent default behavior (exiting the app)
      }
      return false; // If not focused, allow default behavior (exit the app)
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [navigation]);
  const transformTimeSlots = (timeSlots) => {
    return timeSlots.map((slot) => {
      const daysMap = {
        isSun: false,
        isMon: false,
        isTue: false,
        isWed: false,
        isThu: false,
        isFri: false,
        isSat: false,
      };

      slot.selectedDays.forEach((day) => {
        switch (day) {
          case "Sunday":
            daysMap.isSun = true;
            break;
          case "Monday":
            daysMap.isMon = true;
            break;
          case "Tuesday":
            daysMap.isTue = true;
            break;
          case "Wednesday":
            daysMap.isWed = true;
            break;
          case "Thursday":
            daysMap.isThu = true;
            break;
          case "Friday":
            daysMap.isFri = true;
            break;
          case "Saturday":
            daysMap.isSat = true;
            break;
          default:
            break;
        }
      });

      return {
        openAt: slot.openAt,
        closeAt: slot.closeAt,
        ...daysMap,
      };
    });
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const transformedTimings = transformTimeSlots(values.timeSlots);
      const data = {
        businessId: id,
        timings: transformedTimings,
      };

      console.log(data);
      const res = await dispatch(studioStepSecond(data));
      console.log(res);
      if (res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      } else {
        console.error("Unexpected response:", res);
      }
    } catch (error) {
      console.error("Error occurred while registering user:", error);
      Toast.show({
        type: "error",
        text1: "An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 15 }}>
        <Header
          title={"Business Timings"}
          icon={require("../../assets/back.png")}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View>
          <View style={{ flex: 1 }}>
            <Text style={styles.textHeading}>Add Business Timings</Text>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                isSubmitting,
              }) => (
                <View>
                  <FieldArray name="timeSlots">
                    {({ insert, remove, push }) => (
                      <View>
                        {values.timeSlots.map((slot, index) => (
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
                                      backgroundColor:
                                        slot.selectedDays.includes(day.value)
                                          ? "rgba(102, 42, 178, 1)"
                                          : "transparent",
                                    },
                                  ]}
                                  onPress={() => {
                                    const newSelectedDays =
                                      slot.selectedDays.includes(day.value)
                                        ? slot.selectedDays.filter(
                                            (selectedDay) =>
                                              selectedDay !== day.value
                                          )
                                        : [...slot.selectedDays, day.value];
                                    setFieldValue(
                                      `timeSlots.${index}.selectedDays`,
                                      newSelectedDays
                                    );
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.dayText,
                                      {
                                        color: slot.selectedDays.includes(
                                          day.value
                                        )
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
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                              }}
                              onPress={() => {
                                const newSelectedDays =
                                  slot.selectedDays.length === daysOfWeek.length
                                    ? []
                                    : daysOfWeek.map((day) => day.value);
                                setFieldValue(
                                  `timeSlots.${index}.selectedDays`,
                                  newSelectedDays
                                );
                              }}
                            >
                              <FontAwesome
                                name={
                                  slot.selectedDays.length === daysOfWeek.length
                                    ? "check-square"
                                    : "square-o"
                                }
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
                                    setFieldValue(
                                      `timeSlots.${index}.openAt`,
                                      text
                                    )
                                  }
                                  data={timeSlotOptions}
                                  save="value"
                                  fontFamily="Poppins"
                                  placeholder="Select"
                                  defaultOption={{
                                    label: slot.openAt,
                                    value: slot.openAt,
                                  }}
                                  onFocus={() =>
                                    handleBlur(`timeSlots.${index}.openAt`)
                                  }
                                  containerStyle={{ width: wp(40) }}
                                />
                                {errors.timeSlots?.[index]?.openAt &&
                                  touched.timeSlots?.[index]?.openAt && (
                                    <Text style={styles.errorText}>
                                      {errors.timeSlots[index].openAt}
                                    </Text>
                                  )}
                              </View>
                              <View style={{ flex: 0.48 }}>
                                <Text style={styles.label}>Close at</Text>
                                <SelectList
                                  setSelected={(text) =>
                                    setFieldValue(
                                      `timeSlots.${index}.closeAt`,
                                      text
                                    )
                                  }
                                  data={timeSlotOptions}
                                  save="value"
                                  fontFamily="Poppins"
                                  placeholder="Select"
                                  defaultOption={{
                                    label: slot.closeAt,
                                    value: slot.closeAt,
                                  }}
                                  onFocus={() =>
                                    handleBlur(`timeSlots.${index}.closeAt`)
                                  }
                                  containerStyle={{ width: wp(40) }}
                                />
                                {errors.timeSlots?.[index]?.closeAt &&
                                  touched.timeSlots?.[index]?.closeAt && (
                                    <Text style={styles.errorText}>
                                      {errors.timeSlots[index].closeAt}
                                    </Text>
                                  )}
                              </View>
                            </View>
                          </View>
                        ))}
                        <TouchableOpacity
                          onPress={() =>
                            push({ selectedDays: [], openAt: "", closeAt: "" })
                          }
                        >
                          <Text
                            style={[
                              styles.label,
                              { color: "rgba(102, 42, 178, 1)" },
                            ]}
                          >
                            + Add Another Time Slot
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </FieldArray>
                  <View style={{ marginBottom: 20 }}>
                    <Button
                      title={
                        isSubmitting ? (
                          <ActivityIndicator
                            size="small"
                            color="#ffffff"
                            style={styles.indicator}
                          />
                        ) : (
                          "Save"
                        )
                      }
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>
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
    color: "#dcdcdc",
    fontFamily: "Poppins",
  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
  },
});

export default BusinessTimings;
