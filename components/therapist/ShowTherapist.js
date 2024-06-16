import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  FlatList,
  ActivityIndicator,
  BackHandler,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import Header from "../header/Header";
import { getTherapistById } from "../../action/therapist/therapist";

const ShowTherapist = ({ navigation, route }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getTherapistById(id));
        console.log(res);

        setData(res.data);
        setImages(res.data.images || []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);
  // console.log(data);

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

  const gridData = [
    {
      id: 1,
      color: "#fed5d3",
      image: require("../../assets/home/slot.png"),
      text: "Add Time Slot",
      navigateTo: "TherapistTimeSlot",
    },
    {
      id: 2,
      color: "#fff2cd",
      image: require("../../assets/home/location.png"),
      text: "Add Location",
      navigateTo: "TherapistLocation",
    },
    {
      id: 3,
      color: "#ffe9d3",
      image: require("../../assets/home/photo.png"),
      text: "Add Photo",
      navigateTo: "TherapistPhoto",
    },
    {
      id: 4,
      color: "#eefced",
      image: require("../../assets/home/therapy.png"),
      text: "Add Therapy",
      navigateTo: "AddTherapy",
    },
  ];

  const banner = [
    { id: 1, image: require("../../assets/get-screen/tutor1.jpg") },
    { id: 2, image: require("../../assets/get-screen/tutor2.webp") },
    { id: 3, image: require("../../assets/get-screen/tutor3.jpg") },
  ];

  const renderBannerItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
    </View>
  );

  const renderApiImageItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.path }} style={styles.carouselImage} />
      <TouchableOpacity
        // onPress={() => showPhotoAlert(item.id)}
        style={styles.closeImg}
      >
        <Image
          source={require("../../assets/delete.png")}
          style={styles.deleteImg}
        />
      </TouchableOpacity>
    </View>
  );

  const imagesToDisplay = images.length > 0 ? images : banner;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate(item.navigateTo, { id: id })}
    >
      <View style={[styles.circle, { backgroundColor: item.color }]}>
        <Image source={item.image} style={styles.studioImage} />
      </View>
      <Text style={styles.imgText}>{item.text}</Text>
    </TouchableOpacity>
  );

  const renderTimeSlot = ({ item }) => (
    <View style={styles.timeSlotContainer}>
      <Text style={styles.timeSlotText}>{item.time}</Text>
      <TouchableOpacity
        // onPress={() => showSlotAlert(item.id)}
        style={styles.deleteIcon}
      >
        <Image
          source={require("../../assets/delete.png")}
          style={styles.deleteImg}
        />
      </TouchableOpacity>
    </View>
  );

  const showSlotAlert = (id) => {
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
          onPress: () => handleSlotDelete(id),
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

  const showPhotoAlert = (id) => {
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
          onPress: () => handlePhotoDelete(id),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await dispatch(deleteTutorLocation(id));
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

  const handleSlotDelete = async (id) => {
    // console.log(id);
    try {
      const res = await dispatch(deleteTutorSlot(id));
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

  const handlePhotoDelete = async (id) => {
    // console.log(id);
    try {
      const res = await dispatch(deleteTutorImage(id));
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
  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={{ paddingTop: 15 }}>
              <Header
                title={"View Therapist"}
                icon={require("../../assets/back.png")}
              />
            </View>
            <ScrollView>
              <View style={{ paddingVertical: 5 }}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                  <Text style={{ fontFamily: "PoppinsSemiBold", fontSize: 16 }}>
                    Therapist : {data && data.therapistName}
                  </Text>
                </View>
                <View style={styles.bannerContainer}>
                  <FlatList
                    data={imagesToDisplay}
                    renderItem={
                      images.length > 0 ? renderApiImageItem : renderBannerItem
                    }
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.bannerContentContainer}
                  />
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                  <View style={{ paddingVertical: 20 }}>
                    <FlatList
                      data={gridData}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id.toString()}
                      numColumns={4}
                      contentContainerStyle={styles.contentContainer}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={styles.headingText}>Bio</Text>
                      <View style={{ paddingVertical: 10 }}>
                        <Text style={styles.text}> {data.instructorBio}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                    //   onPress={() =>
                    // navigation.navigate("UpdateHomeTutor", { id: id })
                    //   }
                    >
                      <Image
                        source={require("../../assets/edit.png")}
                        style={styles.editImg}
                      />
                    </TouchableOpacity>
                  </View>
                  {data.studioLocation && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text style={styles.headingText}>
                          Studio / Clinic Location
                        </Text>
                        <View style={{ paddingVertical: 10 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              width: "100%",
                              marginBottom: 10,
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <Image
                                source={require("../../assets/get-screen/location.png")}
                                style={{
                                  marginRight: 10,
                                  width: 20,
                                  height: 24,
                                }}
                              />
                              <Text style={styles.text}>
                                {data.studioLocation} - {data.pincode}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                      // onPress={() => showAlert(area.id)}
                      >
                        <Image
                          source={require("../../assets/edit.png")}
                          style={styles.editImg}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  {data.serviceAreas?.length >0 && (
                    <View style={{ flexDirection: "row" }}>
                      <View>
                        <Text style={styles.headingText}>
                          Service Areas (Locations)
                        </Text>
                        <View style={{ paddingVertical: 10 }}>
                          {data.serviceAreas.map((area) => (
                            <View
                              key={area.id}
                              style={{
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "space-between",
                                marginBottom: 10,
                              }}
                            >
                              <View style={{ flexDirection: "row" }}>
                                <Image
                                  source={require("../../assets/get-screen/location.png")}
                                  style={{
                                    marginRight: 10,
                                    width: 20,
                                    height: 24,
                                  }}
                                />
                                <Text style={styles.text}>
                                  {area.locationName}
                                </Text>
                              </View>
                              <TouchableOpacity
                              // onPress={() => showAlert(area.id)}
                              >
                                <Image
                                  source={require("../../assets/delete.png")}
                                  style={styles.editImg}
                                />
                              </TouchableOpacity>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>
                  )}

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      // marginVertical:5
                    }}
                  >
                    <View>
                      <Text style={styles.headingText}>Languages</Text>
                      <View style={{ paddingVertical: 10 }}>
                        <FlatList
                          data={data.language}
                          renderItem={({ item }) => (
                            <View style={styles.timeSlotContainer}>
                              <Text style={styles.timeSlotText}>{item}</Text>
                            </View>
                          )}
                          numColumns={3}
                          keyExtractor={(item, index) => index.toString()}
                          contentContainerStyle={styles.timeSlotList}
                        />
                      </View>
                    </View>
                    <TouchableOpacity
                    //   onPress={() =>
                    //     navigation.navigate("UpdateHomeTutor", { id: id })
                    //   }
                    >
                      <Image
                        source={require("../../assets/edit.png")}
                        style={styles.editImg}
                      />
                    </TouchableOpacity>
                  </View>
                  {data.therapyTypeOffered?.length >0 && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={styles.headingText}>Session Offered</Text>
                      <View style={{ paddingVertical: 10 }}>
                        <FlatList
                          data={data.serviceOffered}
                          renderItem={({ item }) => (
                            <View style={styles.timeSlotContainer}>
                              <Text style={styles.timeSlotText}>{item}</Text>
                            </View>
                          )}
                          numColumns={3}
                          keyExtractor={(item, index) => index.toString()}
                          contentContainerStyle={styles.timeSlotList}
                        />
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("UpdateHomeTutor", { id: id })
                      }
                    >
                      <Image
                        source={require("../../assets/edit.png")}
                        style={styles.editImg}
                      />
                    </TouchableOpacity>
                  </View>
                  )}
                  {data.timeSlotes?.length >0 && (
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View>
                      <Text style={styles.headingText}>Time Availability</Text>
                      <View style={{ paddingVertical: 10 }}>
                        <FlatList
                          data={data.timeSlotes}
                          renderItem={renderTimeSlot}
                          keyExtractor={(item) => item.id}
                          numColumns={3}
                          contentContainerStyle={styles.timeSlotList}
                        />
                      </View>
                    </View>
                  </View>)}
                </View>
              </View>
            </ScrollView>
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
  bannerContainer: {
    // height: 200,
    paddingHorizontal: 10,
  },
  bannerContentContainer: {
    paddingHorizontal: 10,
  },
  carouselItem: {
    width: 110,
    height: 105,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5, // Added margin to create space between items
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  contentContainer: {
    alignItems: "center",
  },
  itemContainer: {
    alignItems: "center",
    margin: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  studioImage: {
    width: 25,
    height: 25,
  },
  imgText: {
    fontFamily: "Poppins",
    fontSize: 13,
    width: 75,
    textAlign: "center",
  },
  horizontalContainer: {
    paddingVertical: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    marginHorizontal: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins",
    marginRight: 15,
  },
  cardImage: {
    width: 50,
    height: 50,
  },
  cardText1: {
    fontSize: 12,
    fontFamily: "Poppins",
    marginRight: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headingText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 14,
    textAlign: "justify",
    lineHeight: 24,
  },
  editImg: {
    width: 15,
    height: 15,
  },
  timeSlotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "rgba(0, 0, 0, 1)",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
    position: "relative",
  },
  timeSlotText: {
    fontFamily: "Poppins",
    fontSize: 14,
    backgroundColor: "#eeedfc",
    borderRadius: 8,
    padding: 8,
  },
  timeSlotList: {
    flexDirection: "column",
  },
  deleteImg: {
    width: 15,
    height: 15,
    // marginLeft: 10,
  },
  deleteIcon: {
    position: "absolute",
    top: 5,
    right: 3,
  },
  closeImg: {
    position: "absolute",
    top: 0,
    right: 2,
  },
});

export default ShowTherapist;
