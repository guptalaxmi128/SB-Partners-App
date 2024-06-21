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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomHeader from "../CustomHeader/CustomHeader";
import { useDispatch } from "react-redux";
import { getInstructor } from "../../action/auth/auth";

const Qualification = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getInstructor());
        console.log(res);
        setData(res.data.qualifications);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);
  const handleQualificationPress = (qualificationId) => {
    navigation.navigate("QualificationDetails", { id: qualificationId });
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
          title="Qualification"
          icon={require("../../assets/back.png")}
          buttonText="Add New"
          destination="AddQualification"
        />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : data.length > 0 ? (
        <>
          {data.map((cls) => (
            <TouchableOpacity
              key={cls.id}
              style={styles.cardContainer}
              onPress={() => handleQualificationPress(cls.id)}
            >
              <View style={styles.rightContainer}>
                <Text style={styles.historyText}>{cls.course}</Text>
                <Text style={styles.dateText}>
                  {cls.university_institute_name}
                </Text>
                <View>
                  <View style={styles.dateTimeContainer}>
                    <Text style={styles.dateText}>{cls.year}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 10,
  },

  rightContainer: {
    flex: 1,
    // padding: 10,
  },

  historyText: {
    fontSize: 14,
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

export default Qualification;
