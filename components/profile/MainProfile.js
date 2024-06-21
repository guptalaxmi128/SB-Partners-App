import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  BackHandler
} from "react-native";
import { Avatar } from "react-native-elements";
import Toast from "react-native-toast-message";
import Header from "../header/Header";
import { getInstructor } from "../../action/auth/auth";
import { useDispatch,useSelector } from "react-redux";

const MainProfile = ({ navigation }) => {
  const dispatch=useDispatch();
  const user =useSelector((state)=>state.auth.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getInstructor());
      } catch (error) {
        console.error("Error fetching data:", error);
        const msg=error.response?.data.message
        Toast.show({
          type: "error",
          text1: msg || "An error occurred. Please try again.",
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    };

    fetchData();
  }, [dispatch]);

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


  const imageUrl = user.data.imagePath
  ? { uri: user.data.imagePath }
  : require("../../assets/dAvatar.jpg");


  return (
    <View style={styles.container}>
     <StatusBar translucent backgroundColor="transparent" />
     <View style={{paddingTop:20}}>
      <Header title={"My Profile"} icon={require("../../assets/back.png")} />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 ,marginVetical:20 }}>
        <View style={{ flex: 1 }}>
          <View style={{ marginHorizontal: 20, flexDirection: "row",marginBottom:15 }}>
            <Avatar
              rounded
              source={imageUrl}
              size={75}
            />
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontFamily: "PoppinsSemiBold", fontSize: 16 }}>
                {user && <>{user.data.name}</>}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins",
                  color: "gray",
                  marginTop: 3,
                }}
              >
                  {user && <>{user.data.email}</>}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileOverview")}
          >
            <View style={styles.viewContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  style={styles.image}
                  source={require("../../assets/profile-icon/mydetails.png")}
                />
                <Text style={styles.textContainer}>My Details</Text>
              </View>
              <Image
                style={styles.image}
                source={require("../../assets/profile-icon/arrow-right.png")}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.hr} />
          <TouchableOpacity
          onPress={() => navigation.navigate("Qualification")}
          >
            <View style={styles.viewContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  style={styles.image}
                  source={require("../../assets/profile-icon/qualification.png")}
                />
                <Text style={styles.textContainer}>Qualification</Text>
              </View>
              <Image
                style={styles.image}
                source={require("../../assets/profile-icon/arrow-right.png")}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.hr} />
          <TouchableOpacity
          onPress={() => navigation.navigate("Experience")}
          >
            <View style={styles.viewContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  style={styles.image}
                  source={require("../../assets/profile-icon/experience.png")}
                />
                <Text style={styles.textContainer}>Experience</Text>
              </View>
              <Image
                style={styles.image}
                source={require("../../assets/profile-icon/arrow-right.png")}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.hr} />
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
  hr: {
    position: "relative",
    width: "86%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    opacity: 0.1,
    marginTop: 8,
     marginHorizontal: 25,
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 45,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // marginVertical: 10,
  },
  textContainer: {
    fontSize: 16,
    fontWeight: "200",
    fontFamily: "Poppins",
    paddingHorizontal: 20,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default MainProfile;
