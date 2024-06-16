import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  BackHandler,
  Image,
  FlatList,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { deleteHomeTutor, getTutor } from "../../action/homeTutor/homeTutor";
import CustomHeader from "../CustomHeader/CustomHeader"
import { getTherapist } from "../../action/therapist/therapist";

const AllTherapist = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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
      const res = await dispatch(deleteHomeTutor(id));
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getTherapist());
        // console.log(res)
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        const msg = error.response.data.message;
        Toast.show({
          type: "error",
          text1: msg,
          visibilityTime: 2000,
          autoHide: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleTherapistPress = (therapistId) => {
    navigation.navigate("ShowTherapist", { id: therapistId });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 20 }}>
      <CustomHeader
          title="All Therapist"
          icon={require("../../assets/back.png")}
          buttonText="Add New"
          destination="Therapist"
        />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          {data.map((therapist) => (
            <View style={styles.cardContainer}>
              <TouchableOpacity
                style={styles.deleteButtonContainer}
                // onPress={() => showAlert(therapist.id)}
              >
                <Image
                  source={require("../../assets/delete.png")}
                  style={styles.deleteButtonIcon}
                />
              </TouchableOpacity>
              <View style={styles.leftContainer}>
                <Image
                  source={require("../../assets/get-screen/tutor1.jpg")}
                  style={styles.tutorImage}
                />
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.dateText}>{therapist.therapistName} </Text>
                {/* <View style={{ paddingVertical: 5 }}>
                  <FlatList
                    data={tutor.serviceOffered}
                    renderItem={({ item }) => (
                      <View style={styles.timeSlotContainer}>
                        <Text style={styles.timeSlotText}>{item}</Text>
                      </View>
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.timeSlotList}
                  />
                </View> */}
                <TouchableOpacity
                  onPress={() => handleTherapistPress(therapist.id)}
                >
                  <Text style={styles.detailsButton}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 10,
  },
  leftContainer: {
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
    paddingVertical: 5,
  },
  historyText: {
    fontSize: 18,
    fontFamily: "Poppins",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "PoppinsSemiBold",
  },
  serviceText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Poppins",
  },
  detailsButton: {
    fontSize: 14,
    color: "#1E90FF",
    fontFamily: "Poppins",
    marginTop: 10,
  },
  deleteButton: {
    fontSize: 14,
    color: "red",
    fontFamily: "Poppins",
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tutorImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  timeSlotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "rgba(0, 0, 0, 1)",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
    // marginBottom: 5,
  },
  timeSlotText: {
    fontFamily: "Poppins",
    fontSize: 12,
    backgroundColor: "#eeedfc",
    borderRadius: 8,
    padding: 5,
  },
  deleteButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  deleteButtonIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default AllTherapist;
