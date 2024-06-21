import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Alert,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import {
  deleteStudioContact,
  getYogaStudioById,
  submitYogaStudioContact,
} from "../../action/yogaStudio/yogaStudio";
import { useDispatch } from "react-redux";

const QuickInformation = ({ id }) => {
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [contactId, setContactId] = useState("");
  const [time, setTime] = useState([]);

  const snapPoints = ["60%"];

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSubmitPress = async (id) => {
    try {
      const res = await dispatch(submitYogaStudioContact(id));
      if (res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("Error approve item:", error);
      const msg = error.response.data.message;
      Toast.show({
        type: "error",
        text1: msg || "An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setDropdownVisible(false);
    }
  };

  const showSubmitAlert = (id) => {
    Alert.alert(
      "Confirm for Approval",
      "Are you sure you want to send this item for approval?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Send",
          onPress: () => handleSubmitPress(id),
        },
      ],
      { cancelable: false }
    );
  };

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
    try {
      const res = await dispatch(deleteStudioContact(id));
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
    } finally {
      setDropdownVisible(false);
    }
  };

  // console.log(id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getYogaStudioById(id));
        console.log(res.data.timings);
        setData(res.data);
        setContactId(res.data.id);
        setTime(res.data.timings);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

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

  const handleOutsidePress = () => {
    if (isDropdownVisible) {
      setDropdownVisible(false);
    }
  };

  const daysOfWeek = [
    { name: "SUN", key: "isSun" },
    { name: "MON", key: "isMon" },
    { name: "TUE", key: "isTue" },
    { name: "WED", key: "isWed" },
    { name: "THU", key: "isThu" },
    { name: "FRI", key: "isFri" },
    { name: "SAT", key: "isSat" },
  ];

  const getCurrentDayName = () => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const today = new Date().getDay();
    return days[today];
  };

  const formatTimings = (timings) => {
    const currentDayName = getCurrentDayName();
    const formatted = daysOfWeek.map((day) => {
      const openHours = timings.find((timing) => timing[day.key]);
      return {
        day: day.name === currentDayName ? `${day.name} (Today)` : day.name,
        open: openHours
          ? `${openHours.openAt} - ${openHours.closeAt}`
          : "Closed",
        isToday: day.name === currentDayName,
      };
    });
    return formatted;
  };

  const formattedTimings = formatTimings(time);

  useEffect(() => {
    return () => {
      if (bottomSheetModalRef.current) {
        bottomSheetModalRef.current.close();
      }
    };
  }, []);

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.outsidePressArea}
              onPress={handleOutsidePress}
            >
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.contentContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {data  && (
                      <>
                        <View>
                          <Text style={styles.textHeading}>Contact</Text>
                        </View>
                      </>
                    )}
                    <TouchableOpacity
                      style={{ paddingHorizontal: 5 }}
                      onPress={toggleDropdown}
                    >
                      <FontAwesome name="ellipsis-v" size={15} color="black" />
                    </TouchableOpacity>
                  </View>
                  {data &&  (
                    <>
                      <View>
                        <Text style={styles.text}>
                          +91 {data?.contacts?.mobileNumber[0]}
                        </Text>
                      </View>
                    </>
                  )}

                  {/* {data.timings && data.timings.length > 0 && (
              <View style={{ marginVertical: 5 }}>
                <Text style={styles.textHeading}>Business Hours</Text>
                <Text style={styles.text}>Open Now : until {data.timings[0].closeAt}</Text>
              </View>
            )} */}
                  {data.timings && data?.timings.length > 0 && (
                    <View
                      style={[
                        styles.businessHoursContainer,
                        { marginVertical: 5 },
                      ]}
                    >
                      <Text style={styles.textHeading}>Business Hours</Text>
                      <View style={styles.businessHoursTextContainer}>
                        <Text style={styles.text}>
                          Open Now: until {data?.timings[0].closeAt}
                        </Text>
                        <TouchableOpacity onPress={handlePresentModal}>
                          <Image
                            source={require("../../assets/arrow-right.png")}
                            style={styles.arrowIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  <View style={{ marginVertical: 5 }}>
                    <Text style={styles.textHeading}>
                      Year of Establistment
                    </Text>
                    <Text style={styles.text}>2024</Text>
                  </View>
                </View>
                <View style={{ marginVertical: 5 }}>
                  <Text style={styles.textHeading}>Website</Text>
                  <Text style={styles.text}>www.swastibharat.com</Text>
                </View>
                <Text style={styles.textHeading}>Social Media Presence</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: 20,
                  }}
                >
                  <View style={styles.socialText}>
                    <FontAwesome
                      name="facebook-square"
                      size={24}
                      color="blue"
                    />
                    <Text style={styles.text}>facebook</Text>
                  </View>
                  <View style={styles.socialText}>
                    <FontAwesome name="twitter" size={24} color="lightblue" />
                    <Text style={styles.text}>Twitter</Text>
                  </View>
                  <View style={styles.socialText}>
                    <FontAwesome name="youtube-play" size={24} color="red" />
                    <Text style={styles.text}>Youtube</Text>
                  </View>
                </View>
                {isDropdownVisible && (
                  <View style={styles.dropdown}>
                    <TouchableOpacity
                      onPress={() => showSubmitAlert(contactId)}
                    >
                      <Text style={styles.dropdownText}>
                        Submit for Approval
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => showAlert(contactId)}>
                      <Text style={[styles.dropdownText, { color: "red" }]}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </TouchableOpacity>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              style={styles.bottomSheet}
              backdropComponent={(props) => (
                <BottomSheetBackdrop
                  {...props}
                  disappearsOnIndex={-1}
                  appearsOnIndex={0}
                  opacity={0.5}
                />
              )}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Business Hours</Text>
                <View style={styles.horizontalLine} />
                {formattedTimings.map((time, index) => (
                  <View key={index} style={styles.timeRow}>
                    <Text style={[styles.day, time.isToday && styles.today]}>
                      {time.day}
                    </Text>
                    <Text style={[styles.hours, time.isToday && styles.today]}>
                      {time.open}
                    </Text>
                  </View>
                ))}
              </View>
            </BottomSheetModal>
          </View>
        </GestureHandlerRootView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
  },
  textHeading: {
    fontFamily: "PoppinsBold",
    fontSize: hp(2),
    fontWeight: "500",
    marginVertical: 10,
    color: "#000",
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 14,
    marginLeft: 5,
  },
  socialText: {
    fontFamily: "Poppins",
    fontSize: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f7f7f7",
    borderRadius: 5,
    flexDirection: "row",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    position: "absolute",
    right: 20,
    top: 50,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  dropdownText: {
    padding: 10,
    fontSize: 14,
    fontFamily: "Poppins",
  },
  outsidePressArea: {
    flex: 1,
  },
  businessHoursContainer: {
    flexDirection: "column",
  },
  businessHoursTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrowIcon: {
    marginLeft: 10,
    marginBottom: 10,
    width: 20,
    height: 20,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontFamily: "Poppins",
    fontSize: hp(2.2),
    fontWeight: "500",
    marginBottom: 10,
  },
  // modalContent: {
  //   padding: 20,
  //   backgroundColor: 'white',
  // },
  // modalTitle: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  // },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  day: {
    fontSize: 16,
    fontFamily: "Poppins",
  },
  hours: {
    fontSize: 16,
    fontFamily: "Poppins",
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  today: {
    color: "black",
    fontFamily: "PoppinsSemiBold",
  },
});

export default QuickInformation;
