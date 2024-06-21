import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  BackHandler,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Avatar } from "react-native-elements";
import Header from "../header/Header";
import { getInstructor } from "../../action/auth/auth";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getInstructor());
      } catch (error) {
        console.error("Error fetching data:", error);
        const msg = error.response?.data?.message || "An error occurred. Please try again.";
        Toast.show({
          type: "error",
          text1: msg,
          visibilityTime: 2000,
          autoHide: true,
        });

        if (error.response?.status === 401) {
          // Token is expired, log out the user
          handleLogout();
        }
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.setItem("isLoggedIn", "false"); // Update isLoggedIn value to false
      Toast.show({
        type: "success",
        text1: "Logout Successful",
        visibilityTime: 3000,
      });
      // navigation.navigate("authStack");
    } catch (error) {
      console.error("Error occurred while logging out:", error);
      // Show toast message
      Toast.show({
        type: "error",
        text1: "Error Logging Out",
        visibilityTime: 3000,
      });
    }
  };
  

  const imageUrl = user?.data?.imagePath
    ? { uri: user.data.imagePath }
    : require("../../assets/dAvatar.jpg");

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 20 }}>
        <Header title={"Profile"} icon={require("../../assets/back.png")} />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginHorizontal: 20,
              flexDirection: "row",
              marginBottom: 15,
            }}
          >
            <Avatar rounded source={imageUrl} size={75} />
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontFamily: "PoppinsSemiBold", fontSize: 16 }}>
                {user && <>{user.data?.name}</>}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins",
                  color: "gray",
                  marginTop: 3,
                }}
              >
                {user && <>{user.data?.email}</>}
              </Text>
            </View>
          </View>
          {/* <TouchableOpacity
          //   onPress={() => navigation.navigate("MyAppointment")}
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
                  source={require("../../assets/profile-icon/shopping-bag.png")}
                />
                <Text style={styles.textContainer}>My Appointment</Text>
              </View>
              <Image
                style={styles.image}
                source={require("../../assets/profile-icon/arrow-right.png")}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.hr} /> */}
          <TouchableOpacity onPress={() => navigation.navigate("MainProfile")}>
            <View style={styles.viewContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  style={styles.image}
                  source={require("../../assets/profile-icon/profile.png")}
                />
                <Text style={styles.textContainer}>My Profile</Text>
              </View>
              <Image
                style={styles.image}
                source={require("../../assets/profile-icon/arrow-right.png")}
              />
            </View>
          </TouchableOpacity>

          {/* <View style={styles.hr} />
          <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
            <View style={styles.viewContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  style={styles.image}
                  source={require("../../assets/profile-icon/location.png")}
                />
                <Text style={styles.textContainer}>Wallet</Text>
              </View>
              <Image
                style={styles.image}
                source={require("../../assets/profile-icon/arrow-right.png")}
              />
            </View>
          </TouchableOpacity> */}
          {/* <View style={styles.hr} />
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <View style={styles.viewContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  style={styles.image}
                  source={require("../../assets/profile-icon/notify.png")}
                />
                <Text style={styles.textContainer}>Notifications</Text>
              </View>
              <Image
                style={styles.image}
                source={require("../../assets/profile-icon/arrow-right.png")}
              />
            </View>
          </TouchableOpacity> */}
          <View style={styles.hr} />
          <TouchableOpacity onPress={() => navigation.navigate("Help")}>
            <View style={styles.viewContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  style={styles.image}
                  source={require("../../assets/profile-icon/help.png")}
                />
                <Text style={styles.textContainer}>Help & Support</Text>
              </View>
              <Image
                style={styles.image}
                source={require("../../assets/profile-icon/arrow-right.png")}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.hr} />
          <TouchableOpacity
            onPress={() => navigation.navigate("PrivacyPolicy")}
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
                  source={require("../../assets/profile-icon/shield.png")}
                />
                <Text style={styles.textContainer}>Privacy Policy</Text>
              </View>
              <Image
                style={styles.image}
                source={require("../../assets/profile-icon/arrow-right.png")}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.hr} />
          <TouchableOpacity
            onPress={() => navigation.navigate("TermConditions")}
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
                  source={require("../../assets/profile-icon/document.png")}
                />
                <Text style={styles.textContainer}>Terms & Conditions</Text>
              </View>
              <Image
                style={styles.image}
                source={require("../../assets/profile-icon/arrow-right.png")}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.hr} />
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.logoutContainer}
            onPress={handleLogout}
          >
            <Image
              style={styles.image}
              source={require("../../assets/profile-icon/logout.png")}
            />
            <Text
              style={styles.logoutText}
            >
              Logout
            </Text>
          </TouchableOpacity>
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
    paddingHorizontal: 25,
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
  logoutContainer:{
    marginVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "rgba(254, 243, 242, 1)",
    height: 50,
    width: "90%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText:{
    fontFamily: "PoppinsBold",
    fontSize: 16,
    color: "red",
    marginLeft: 10,
  }
});

export default Profile;
