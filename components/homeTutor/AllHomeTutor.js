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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import {
  deleteHomeTutor,
  getTutor,
  publishHomeTutor,
  submitHomeTutor,
} from "../../action/homeTutor/homeTutor";
import CustomHeader from "../CustomHeader/CustomHeader";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const AllHomeTutor = ({ navigation }) => {
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

  const handlePublishPress = async (id, isPublish) => {
    try {
      const res = await dispatch(
        publishHomeTutor({ id, isPublish: isPublish })
      );
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
    }
  };

  const showPublishAlert = (id, isPublish) => {
    Alert.alert(
      "Confirm for Publish",
      "Are you sure you want to send this item for publish?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Send",
          onPress: () => handlePublishPress(id, isPublish),
        },
      ],
      { cancelable: false }
    );
  };

  const handleSubmitPress = async (id) => {
    try {
      const res = await dispatch(submitHomeTutor(id));
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
        const res = await dispatch(getTutor());
        console.log(res.data[0].images);
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

  const handleHomeTutorPress = (tutorId) => {
    navigation.navigate("ShowHomeTutor", { id: tutorId });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 20 }}>
        <CustomHeader
          title="All Home Tutor"
          icon={require("../../assets/back.png")}
          buttonText="Add New"
          destination="HomeTutor"
        />
      </View>
      {loading ? (
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <View style={styles.cardContainer1}>
            <ShimmerPlaceholder
              style={[styles.tutorImage, { marginRight: 10 }]}
            />
            <View style={styles.rightContainer}>
              <ShimmerPlaceholder
                style={[styles.text, { marginVertical: 10 }]}
              />
              <ShimmerPlaceholder style={styles.text1} />
              <ShimmerPlaceholder
                style={[styles.text1, { marginVertical: 10 }]}
              />
            </View>
          </View>
        </View>
      ) : (
        <ScrollView>
          {data.map((tutor, index) => {
            const tutorImage =
              tutor.images && tutor.images.length > 0
                ? tutor.images[0].path
                : null;
            return (
              <View style={styles.cardContainer} key={index}>
                <TouchableOpacity
                  style={styles.deleteButtonContainer}
                  onPress={() => showAlert(tutor.id)}
                >
                  <Image
                    source={require("../../assets/delete.png")}
                    style={styles.deleteButtonIcon}
                  />
                </TouchableOpacity>
                <View style={styles.leftContainer}>
                  <Image
                    source={
                      tutorImage
                        ? { uri: tutorImage }
                        : require("../../assets/get-screen/tutor1.jpg")
                    }
                    style={styles.tutorImage}
                  />
                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.dateText}>Services Offered </Text>
                  <View style={{ paddingVertical: 5 }}>
                    <View style={styles.timeSlotContainer}>
                      <Text style={styles.timeSlotText}>
                        {(tutor.isGroupSO ? "Group" : "") +
                          (tutor.isGroupSO && tutor.isPrivateSO ? " & " : "") +
                          (tutor.isPrivateSO ? "Individual" : "")}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{ marginRight: 10 }}
                      onPress={() => showSubmitAlert(tutor.id)}
                    >
                      <Text style={styles.detailsButton}>
                        Submit Home Tutor
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ marginRight: 10 }}
                      onPress={() => showPublishAlert(tutor.id, true)}
                    >
                      <Text style={styles.detailsButton}>
                        {data.isPublish ? "Published" : "Publish"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleHomeTutorPress(tutor.id)}
                    >
                      <Text style={styles.detailsButton}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
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
    fontSize: 10,
    color: "#5F33E1",
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
    width: 100,
    height: 110,
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
  text1: {
    fontFamily: "Poppins",
    fontSize: 11,
    lineHeight: 19,
    fontWeight: "400",
    color: "#fff",
  },
  tutorImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  cardContainer1: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default AllHomeTutor;
