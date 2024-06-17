import React, { useRef, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
  BackHandler,
  Alert,
  Platform,
  Button,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Location from "expo-location";
import { getInstructor } from "../../action/auth/auth";
import { getYogaStudio } from "../../action/yogaStudio/yogaStudio";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CarouselItem from "../carousel/CarouselItem";
import { getTherapist } from "../../action/therapist/therapist";
import { getTutor } from "../../action/homeTutor/homeTutor";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const studio = useSelector((state) => state.studio.yogaStudio);
  const bottomSheetModalRef = useRef(null);
  const windowWidth = Dimensions.get("window").width;
  const cardWidth = (windowWidth - 60) / 2; // Adjust margin and padding
  const cardHeight = cardWidth * (174 / 164); // Maintain aspect ratio

  const [authToken, setAuthToken] = useState(null);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [therapistTerm, setTherapistTerm] = useState(false);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [therapist, setTherapist] = useState([]);
  const [tutor, setTutor] = useState([]);
  const [qualification, setQualification] = useState([]);

  const fetchAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token !== null) {
        // console.log(token);
        setAuthToken(token);
      } else {
        console.log("No auth token found");
      }
    } catch (error) {
      console.error("Failed to fetch the auth token:", error);
    }
  };

  useEffect(() => {
    fetchAuthToken();
  }, []);
  // console.log(authToken);

  const getLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    setAddress(null);
    try {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      // Get the current location
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Reverse geocode the location to get the address
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setAddress(geocode[0]);
    } catch (error) {
      setErrorMsg("Error fetching location");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  const snapPoints = ["40%", "90%"];

  const cardsData = [
    // {
    //   content: "Create New Course",
    //   subContent: "Find a Doctor or specialist",
    //   backgroundColor: "rgba(249, 245, 255, 1)",
    //   borderColor: "lightblue",
    //   navigateTo: "CreateCourse",
    //   imageSource: require("../../assets/home/menu.png"),
    // },
    {
      content: "Appointment with QR",
      subContent: "Queuing without the hustle",
      backgroundColor: "rgba(237, 252, 242, 1)",
      borderColor: "lightgreen",
      imageSource: require("../../assets/home/scan.png"),
      // navigateTo: "CourseDetails",
    },
    {
      content: "Therapist",
      subContent: "Therapist",
      backgroundColor: "rgba(254, 246, 238, 1)",
      borderColor: "#fccfa1",
      imageSource: require("../../assets/home/message.png"),
      navigateTo: "FirstTherapistScreen",
    },
    {
      content: "Locate yoga studio",
      subContent: "Purchase Medicines",
      backgroundColor: "rgba(254, 243, 242, 1)",
      borderColor: "#f7bbb9",
      imageSource: require("../../assets/home/building.png"),
      navigateTo: "YogaStudio",
    },
    {
      content: "Yoga Classes at Home",
      subContent: "Yoga classes",
      backgroundColor: "rgba(254, 243, 242, 1)",
      borderColor: "#f7bbb9",
      imageSource: require("../../assets/home/video.png"),
      // navigateTo: "HomeTutor", this is for home tutor registration
      navigateTo: "FirstHTutorScreen",
    },
    {
      content: "Register as Yoga Influencer",
      subContent: "yoga influencer",
      backgroundColor: "rgba(249, 245, 255, 1)",
      borderColor: "lightblue",
      imageSource: require("../../assets/home/influencer.png"),
      // navigateTo: "AddTimeSlot",
      // navigateTo: "FirstTherapistScreen",
    },
  ];

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Yes", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (studio && studio.data) {
      setData(studio.data);
    }
  }, [studio]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getInstructor());
        // console.log(res.data);
        setQualification(res.data.qualifications);
        setTermsAndConditions(res.data.homeTutorTermAccepted);
        setTherapistTerm(res.data.therapistTermAccepted);
      } catch (error) {
        console.error("Error fetching data:", error);
        const msg = error.response?.data?.message;
        const statusCode = error.response?.status;
        console.log(statusCode);
        if (msg === "Please complete your profile!") {
          console.log("Navigating to ProfileOverview");
          navigation.navigate("ProfileOverview");
        } 
        // else {
        //   Toast.show({
        //     type: "error",
        //     text1: msg || "An error occurred. Please try again.",
        //     visibilityTime: 2000,
        //     autoHide: true,
        //   });
        // }
      }
    };

    fetchData();
  }, [dispatch, navigation]);

  // console.log("therapist", address);
  // console.log(location)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getYogaStudio());
      } catch (error) {
        console.error("Error fetching data:", error);
        const msg = error.response.data.message;
        if (msg === "Please complete your profile!") {
          console.log("Navigating to ProfileOverview");
          navigation.navigate("ProfileOverview");
        } 
        // else {
        //   Toast.show({
        //     type: "error",
        //     text1: msg || "An error occurred. Please try again.",
        //     visibilityTime: 2000,
        //     autoHide: true,
        //   });
        // }
      }
    };

    fetchData();
  }, [dispatch]);

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

  const handleStudioSelection = (studioId) => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.close();
    }
    navigation.navigate("YogaStudioScreen", { id: studioId });
  };

  const handleNewBusiness = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.close();
    }
    navigation.navigate("YStudioForm");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getTherapist());
        // console.log(res)
        setTherapist(res.data);

       
      } catch (error) {
        console.error("Error fetching data:", error);
          const msg = error.response.data.message;
        if (msg === "Please complete your profile!") {
          console.log("Navigating to ProfileOverview");
          navigation.navigate("ProfileOverview");
        }
        //  else {
        //   Toast.show({
        //     type: "error",
        //     text1: msg || "An error occurred. Please try again.",
        //     visibilityTime: 2000,
        //     autoHide: true,
        //   });
        // }
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

    useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getTutor());
        // console.log(res)
        setTutor(res.data);  
      } catch (error) {
        console.error("Error fetching data:", error);
           const msg = error.response.data.message;
        if (msg === "Please complete your profile!") {
          console.log("Navigating to ProfileOverview");
          navigation.navigate("ProfileOverview");
        } 
        // else {
        //   Toast.show({
        //     type: "error",
        //     text1: msg || "An error occurred. Please try again.",
        //     visibilityTime: 2000,
        //     autoHide: true,
        //   });
        // }
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);
  // console.log(termsAndConditions)
  // console.log(tutor.timeSlotes)

  // console.log(user);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, paddingTop: StatusBar.currentHeight || 0 }}>
            <View style={styles.topHeader}>
              <View style={{ width: "85%" }}>
                <Text style={[styles.text, { fontSize: 20, lineHeight: 32 }]}>
                  Hi, {user && <>{user.data.name}</>}!
                </Text>

                {loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#0000ff" />
                  </View>
                ) : errorMsg ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMsg}</Text>
                    <TouchableOpacity onPress={getLocation}>
                      <Text style={styles.retryText}>Try Again</Text>
                    </TouchableOpacity>
                  </View>
                ) : address ? (
                  <View style={styles.addressContainer}>
                    <Image
                      source={require("../../assets/get-screen/location.png")}
                      style={{ width: 20, height: 22, marginRight: 4 }}
                    />
                    <Text style={styles.addressText}>
                      {address.name ? address.name + ", " : ""}
                      {address.street ? address.street + ", " : ""}
                      {address.city ? address.city + ", " : ""}
                      {address.region ? address.region + ", " : ""}
                      {address.postalCode ? address.postalCode : ""}
                    </Text>
                  </View>
                ) : null}
              </View>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: "rgba(249, 250, 251, 1)",
                  padding: 8,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "gray",
                }}
                onPress={() => navigation.navigate("Notification")}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../assets/notify.png")}
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 8 }}>
              <CarouselItem />
            </View>
            <View style={styles.cardContainer}>
              {cardsData.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.card,
                    {
                      width: cardWidth,
                      height: cardHeight,
                      backgroundColor: card.backgroundColor,
                      padding: 12,
                    },
                  ]}
                  onPress={() => {
                    const hasQualificationIn = (type) => {
                      return qualification.some(
                        (q) => q.qualificationIn === type
                      );
                    };

                    if (
                      therapistTerm === true &&
                      card.content === "Therapist" &&
                      therapist.length === 0
                    ) {
                      navigation.navigate("Therapist");
                    } else if (
                      termsAndConditions === true &&
                      card.content === "Yoga Classes at Home" &&
                      tutor.length === 0
                    ) {
                      navigation.navigate("HomeTutor");
                    } else {
                      if (card.content === "Yoga Classes at Home") {
                        if (hasQualificationIn("HomeTutor")) {
                          navigation.navigate(
                            termsAndConditions
                              ? "AllHomeTutor"
                              : card.navigateTo
                          );
                        } else {
                          navigation.navigate("AddQualification");
                        }
                      } else if (card.content === "Therapist") {
                        if (hasQualificationIn("Therapist")) {
                          navigation.navigate(
                            therapistTerm ? "AllTherapist" : card.navigateTo
                          );
                        } else {
                          navigation.navigate("AddQualification");
                        }
                      } else if (card.navigateTo === "YogaStudio") {
                        handlePresentModal();
                      } else {
                        navigation.navigate(card.navigateTo);
                      }
                    }
                  }}
                >
                  <View
                    style={[
                      styles.imageContainer,
                      { borderColor: card.borderColor },
                    ]}
                  >
                    <Image
                      style={{ width: 32, height: 32 }}
                      source={card.imageSource}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "PoppinsSemiBold",
                      fontSize: 16,
                      lineHeight: 28,
                      marginVertical: 5,
                      fontWeight: "600",
                    }}
                  >
                    {card.content}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontSize: 12,
                      lineHeight: 20,
                      color: "gray",
                    }}
                  >
                    {card.subContent}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Your Business</Text>
            {data.map((studio, index) => (
              <TouchableOpacity
                key={index}
                style={styles.studioCard}
                onPress={() => handleStudioSelection(studio.id)}
              >
                <View style={styles.leftContent}>
                  <Image
                    source={require("../../assets/home/menu.png")}
                    style={styles.studioImage}
                  />
                </View>
                <View style={styles.rightContent}>
                  <Text style={styles.studioName}>{studio.businessName}</Text>
                  <Text style={styles.studioAddress}>
                    {studio.street_colony}
                  </Text>
                  <FontAwesome
                    name="angle-right"
                    size={24}
                    color="black"
                    style={styles.arrowIcon}
                  />
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleNewBusiness}
            >
              <Text style={styles.addButtonText}>Add New Business</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  text: {
    fontFamily: "Poppins",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    // marginTop: 10,
  },
  card: {
    borderRadius: 10,
    marginBottom: 20,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    alignItems: "center",
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
  addButton: {
    backgroundColor: "rgba(102, 42, 178, 1)",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  studioCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  leftContent: {
    marginRight: 20,
  },
  studioImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  rightContent: {
    flex: 1,
  },
  studioName: {
    fontFamily: "Poppins",
    fontSize: hp(2),
    fontWeight: "500",
    marginBottom: 5,
  },
  studioAddress: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  arrowIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  addressText: {
    fontSize: 13,
    fontFamily: "Poppins",
  },
  locationText: {
    color: "#00f",
    textDecorationLine: "underline",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    color: "#f00",
  },
  retryText: {
    color: "#00f",
    textDecorationLine: "underline",
  },
  addressContainer: {
    paddingRight: 10,
    lineHeight: 20,
    textAlign: "justify",
    flexDirection: "row",
  },
});

export default Home;
