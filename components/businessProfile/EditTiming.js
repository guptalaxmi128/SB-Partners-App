import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Image,
  Alert,
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
import {
  deleteStudioTime,
  getYogaStudioById,
  submitYogaStudioTime,
  updateStudioStepSecond,
} from "../../action/yogaStudio/yogaStudio";
import { useDispatch } from "react-redux";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";

const EditTiming = ({ route,navigation }) => {
  const dispatch = useDispatch();
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    timeSlots: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getYogaStudioById(id));
        const fetchedData = res.data.timings;
        console.log(fetchedData);

        const transformedData = fetchedData.map((slot) => ({
          selectedDays: [
            slot.isSun && "Sunday",
            slot.isMon && "Monday",
            slot.isTue && "Tuesday",
            slot.isWed && "Wednesday",
            slot.isThu && "Thursday",
            slot.isFri && "Friday",
            slot.isSat && "Saturday",
          ].filter(Boolean),
          openAt: slot.openAt,
          closeAt: slot.closeAt,
          id: slot.id,
          isModified: false, // Add this to track modifications
        }));

        setInitialValues({
          timeSlots: transformedData,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const validationSchema = Yup.object().shape({
    timeSlots: Yup.array()
      .of(
        Yup.object().shape({
          selectedDays: Yup.array()
            .min(1, "Select at least one day")
            .required("Days are required"),
          openAt: Yup.string().required("Open time is required"),
          closeAt: Yup.string().required("Close time is required"),
        })
      )
      .required("At least one time slot is required"),
  });

  
  const showAlert = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDelete(id),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await dispatch(deleteStudioTime(id));
      console.log(res);
      if (res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      const msg = error.response.data.message;
      Toast.show({
        type: "error",
        text1: msg || "An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const showSubmitAlert = (id) => {
    Alert.alert(
      "Send For Approval",
      "Are you sure you want to send this time slot for approval?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Send",
          onPress: () => handleApproval(id),
        },
      ],
      { cancelable: false }
    );
  };

  const handleApproval = async (id) => {
    console.log(id);
    try {
      const res = await dispatch(submitYogaStudioTime(id));
      console.log(res);
      if (res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      const msg = error.response.data.message;
      Toast.show({
        type: "error",
        text1: msg || "An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      console.log("Submitting values:", values);
      for (const slot of values.timeSlots) {
        if (slot.isModified) {
          const transformedTimings = [
            {
              id: slot.id,
              openAt: slot.openAt,
              closeAt: slot.closeAt,
              selectedDays: slot.selectedDays,
            },
          ];

          const data = {
            id: slot.id,
            timings: transformedTimings,
          };

          console.log("Sending data:", data);
          const res = await dispatch(updateStudioStepSecond(data));
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
        }
      }
    } catch (error) {
      console.error("Error occurred while updating timings:", error);
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

  const timeSlot = [
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

  const toggleSelectAll = (index, values, setFieldValue) => {
    const allSelected = values.timeSlots[index].selectedDays.length === 7;
    const newSelectedDays = allSelected
      ? []
      : daysOfWeek.map((day) => day.value);
    setFieldValue(`timeSlots.${index}.selectedDays`, newSelectedDays);
    setFieldValue(`timeSlots.${index}.isModified`, true); // Mark as modified
  };

  useEffect(() => {
    const handleBackPress = () => {
      if (navigation.isFocused()) {
        navigation.goBack();
        return true;
      }
      return false;
    };
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 15 }}>
        <Header
          title={"Edit Studio Timings"}
          icon={require("../../assets/back.png")}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View style={{ paddingVertical: 5 }}>
          <View style={{ flex: 1, marginVertical: 10 }}>
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
                  <Text style={styles.textHeading}>Edit Business Timings</Text>
                  <FieldArray name="timeSlots">
                    <View>
                      {values.timeSlots.map((slot, index) => (
                        <View key={index} style={{ marginBottom: 20 }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                          <Text
                            style={{
                              fontFamily: "Poppins",
                              fontSize: hp(2),
                              marginTop: 10,
                            }}
                          >
                            Select Days of The Week for Slot {index + 1}
                          </Text>
                         <View style={{flexDirection:'row'}}>
                          <TouchableOpacity
                          style={{marginTop:10,marginRight:8}}
                          onPress={() => showSubmitAlert(slot.id)}
                          >
                            <Image
                              source={require("../../assets/timeApprove.png")}
                              style={{width:22,height:22}}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                          style={{marginTop:10}}
                          onPress={() => showAlert(slot.id)}
                          >
                            <Image
                              source={require("../../assets/delete.png")}
                              style={styles.editImg}
                            />
                          </TouchableOpacity>
                          </View>
                          </View>
                          <View style={styles.daycontainer}>
                            {daysOfWeek.map((day) => (
                              <TouchableOpacity
                                key={day.value}
                                style={[
                                  styles.dayButton,
                                  {
                                    backgroundColor: slot.selectedDays.includes(
                                      day.value
                                    )
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
                                  setFieldValue(
                                    `timeSlots.${index}.isModified`,
                                    true
                                  ); // Mark as modified
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
                            style={[
                              {
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                              },
                              {
                                backgroundColor: "transparent",
                              },
                            ]}
                            onPress={() =>
                              toggleSelectAll(index, values, setFieldValue)
                            }
                          >
                            <FontAwesome
                              name={
                                values.timeSlots[index].selectedDays.length ===
                                7
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
                                setSelected={(text) => {
                                  console.log(`Selected openAt: ${text}`);
                                  setFieldValue(
                                    `timeSlots.${index}.openAt`,
                                    text
                                  );
                                  setFieldValue(
                                    `timeSlots.${index}.isModified`,
                                    true
                                  ); // Mark as modified
                                }}
                                data={timeSlot}
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
                              <Text style={styles.errorText}>
                                {errors.timeSlots?.[index]?.openAt &&
                                  touched.timeSlots?.[index]?.openAt &&
                                  errors.timeSlots[index].openAt}
                              </Text>
                            </View>
                            <View style={{ flex: 0.48 }}>
                              <Text style={styles.label}>Close at</Text>
                              <SelectList
                                setSelected={(text) => {
                                  setFieldValue(
                                    `timeSlots.${index}.closeAt`,
                                    text
                                  );
                                  setFieldValue(
                                    `timeSlots.${index}.isModified`,
                                    true
                                  ); // Mark as modified
                                }}
                                data={timeSlot}
                                save="value"
                                fontFamily="Poppins"
                                placeholder="Select"
                                value={slot.closeAt}
                                defaultOption={{
                                  label: slot.closeAt,
                                  value: slot.closeAt,
                                }}
                                onFocus={() =>
                                  handleBlur(`timeSlots.${index}.closeAt`)
                                }
                                containerStyle={{ width: wp(40) }}
                              />
                              <Text style={styles.errorText}>
                                {errors.timeSlots?.[index]?.closeAt &&
                                  touched.timeSlots?.[index]?.closeAt &&
                                  errors.timeSlots[index].closeAt}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
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
                          "Update"
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
    fontSize: hp(1.9),
    color: "#dcdcdc",
    fontFamily: "Poppins",
  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  editImg: {
    width: 20,
    height: 20,
  },
});

export default EditTiming;
