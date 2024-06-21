import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Linking,
  BackHandler
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Header from "../header/Header";
import { getInstructor } from "../../action/auth/auth";

const ProfileOverview = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getInstructor());
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error(error.response.data.message);
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

  const handlePress = (url) => {
    Linking.openURL(url);
  };

  const imageUrl = user.data.imagePath
    ? { uri: user.data.imagePath }
    : require("../../assets/dAvatar.jpg");
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 20 }}>
        <Header title={"My Profile"} icon={require("../../assets/back.png")} />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 15,
            }}
          >
            <Avatar
              rounded
              source={imageUrl}
              size={100}
            />
            <View>
              <Text
                style={{
                  fontFamily: "PoppinsSemiBold",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                {user && <>{user.data.name}</>}
              </Text>
              {/* <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                Trainer
              </Text> */}
            </View>
            {/* <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 16 }}>⭐</Text>
              <Text style={{ fontSize: 16 }}>⭐</Text>
              <Text style={{ fontSize: 16 }}>⭐</Text>
              <Text style={{ fontSize: 16 }}>⭐</Text>
              <Text style={{ fontSize: 16 }}>⭐</Text>
            </View> */}
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "PoppinsSemiBold",
                  fontSize: 20,
                  // fontWeight: "500",
                }}
              >
                General Information
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile")}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../assets/edit.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={{ paddingVertical: 20 }}>
              {user && (
                <View>
                  <Text style={styles.headingText}>Email Address</Text>
                  <Text style={styles.text}>
                    <>{user.data.email}</>
                  </Text>
                </View>
              )}
              {user && (
                <View style={{ marginTop: 5 }}>
                  <Text style={styles.headingText}>Mobile Number</Text>
                  <Text style={styles.text}>
                    +91 <>{user.data.phoneNumber}</>
                  </Text>
                </View>
              )}
              {user && user.data.location &&  (
                <View style={{ marginTop: 5 }}>
                  <Text style={styles.headingText}>Location</Text>
                  <Text style={styles.text}>
                    <>{user.data.location}</>
                  </Text>
                </View>
              )}
              {user && user.data.dateOfBirth &&  (
                <View style={{ marginTop: 5 }}>
                  <Text style={styles.headingText}>Date Of Birth</Text>
                  <Text style={styles.text}>
                    {user.data.dateOfBirth}
                  </Text>
                </View>
              )}

              {user &&
                (user.data.linkedIn ||
                  user.data.instagram ||
                  user.data.twitter_x ||
                  user.data.facebook) && (
                  <View style={{ marginTop: 5 }}>
                    <Text style={styles.headingText}>Social Media</Text>

                    <View style={styles.iconContainer}>
                      {user.data.linkedIn && (
                        <TouchableOpacity
                          onPress={() => handlePress(user.data.linkedIn)}
                        >
                          <Ionicons
                            name="logo-linkedin"
                            size={24}
                            color="#0e76a8"
                            style={styles.icon}
                          />
                        </TouchableOpacity>
                      )}
                      {user.data.instagram && (
                        <TouchableOpacity
                          onPress={() => handlePress(user.data.instagram)}
                        >
                          <Ionicons
                            name="logo-instagram"
                            size={24}
                            color="#bc2a8d"
                            style={styles.icon}
                          />
                        </TouchableOpacity>
                      )}
                      {user.data.twitter_x && (
                        <TouchableOpacity
                          onPress={() => handlePress(user.data.twitter_x)}
                        >
                          <Ionicons
                            name="logo-twitter"
                            size={24}
                            color="#1da1f2"
                            style={styles.icon}
                          />
                        </TouchableOpacity>
                      )}
                      {user.data.facebook && (
                        <TouchableOpacity
                          onPress={() => handlePress(user.data.facebook)}
                        >
                          <Ionicons
                            name="logo-facebook"
                            size={24}
                            color="#3b5998"
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )}

              {user && user.data.bio &&  (
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.headingText}>About me</Text>
                  <Text
                    style={[
                      styles.text,
                      {  textAlign: "justify" },
                    ]}
                  >
                    {user.data.bio}
                  </Text>
                </View>
              )}

              {user && user.data.languages?.length > 0 &&  (
                <View style={{ marginTop: 5 }}>
                  <Text style={styles.headingText}>Languages</Text>
                  {user.data.languages?.length > 0 && (
                    <Text style={styles.text}>
                      {user.data.languages.join(", ")}
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>
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
  headingText:{
    fontFamily:'PoppinsSemiBold',
    fontSize:16
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 14,
    color:'gray'
  },
  iconContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
});

export default ProfileOverview;
