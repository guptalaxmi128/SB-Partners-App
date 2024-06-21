import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  BackHandler
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import Header from "../header/Header";
import { deleteQualification, getQualification } from "../../action/qualification/qualification";

const QualificationDetails = ({ navigation,route }) => {
  const {id}=route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getQualification(id));
        // console.log(res);
        setData(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);
  // console.log(id)

  const handlePress = (qualificationId) => {
    navigation.navigate("EditQualification", { id: qualificationId });
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              // Show loading indicator or any pre-delete logic here
              setLoading(true);

              // Call the function to delete the item
              const res = await dispatch(deleteQualification(id));
              console.log(res)
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
              Toast.show({
                type: "error",
                text1: "An error occurred. Please try again.",
                visibilityTime: 2000,
                autoHide: true,
              });
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  
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

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 15 }}>
        <Header
          title="View Qualification"
          icon={require("../../assets/back.png")}
        />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View key={data.id} style={styles.cardContainer}>
          <View style={styles.rightContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.historyText}>{data.course}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width:wp(10)
                }}
              >
                <TouchableOpacity
                 onPress={() => handlePress(data.id)}
                 >
                  <Image
                    style={styles.image}
                    source={require("../../assets/edit.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(data.id)}
                >
                  <Image
                    style={styles.image}
                    source={require("../../assets/delete.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.dateText}>
              {data.university_institute_name}
            </Text>

            <View style={styles.dateTimeContainer}>
              <Text style={styles.dateText}>{data.year}</Text>
            </View>
          </View>
        </View>
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
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

  rightContainer: {
    flex: 1,
    padding: 10,
  },

  historyText: {
    fontSize: 14,
    fontFamily: "Poppins",
    width:wp(72),
    // textAlign:'justify'
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins",
  },
  image: {
    width: 20,
    height: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QualificationDetails;
