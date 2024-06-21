import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  BackHandler
} from "react-native";
import CustomHeader from "../CustomHeader/CustomHeader";
import { getInstructor } from "../../action/auth/auth";
import { useDispatch } from "react-redux";

const Experience = ({ navigation }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getInstructor());
        setData(res.data.experience);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  // console.log("data",data)

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const handlePress = (experienceId) => {
    navigation.navigate("ExperienceDetails", { id: experienceId });
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
      <View style={{ paddingTop: 20 }}>
        <CustomHeader
          title="Experience"
          icon={require("../../assets/back.png")}
          buttonText="Add New"
          destination="AddExperience"
        />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : data.length > 0 ? (
        data.map((cls) => (
          <TouchableOpacity
            key={cls.id}
            style={styles.cardContainer}
            onPress={() => handlePress(cls.id)}
          >
            <View style={styles.rightContainer}>
              <Text style={styles.historyText}>{cls.workHistory}</Text>
              <Text style={styles.dateText}>Department: {cls.department}</Text>
              <View style={styles.dateTimeContainer}>
                <Text style={styles.dateText}>
                  Join Date: {formatDate(cls.joinDate)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.content}>
          <View
            style={{
              width: 255,
              height: 255,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "gray",
              backgroundColor: "rgba(212, 220, 219, 0.5)",
            }}
          >
            <View style={styles.imageContainer}>
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../../assets/imagebg.png")}
              />
              <Text style={styles.text}>No data found!</Text>
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
    padding: 12,
  },

  historyText: {
    fontSize: 18,
    fontFamily: "Poppins",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Experience;
