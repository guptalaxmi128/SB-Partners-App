import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  BackHandler,
} from "react-native";
import Header from "../header/Header";

const PrivacyPolicy = ({ navigation }) => {
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
      <StatusBar translucent backgroundColor="#fff" />
      <View style={{ paddingTop: 20 }}>
        <Header
          title={"Privacy Policy"}
          icon={require("../../assets/back.png")}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View style={{ flex: 1 }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "PoppinsSemiBold",

                marginVertical: 10,
                color: "#5F33E1",
              }}
            >
              Introduction
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins",
                color: "gray",

                textAlign: "justify",
              }}
            >
              We are committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our application.
            </Text>
          </View>

          <View style={{ paddingVertical: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "PoppinsSemiBold",

                marginVetical: 10,
                color: "#5F33E1",
              }}
            >
              Data Collection
            </Text>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.dot} />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "PoppinsSemiBold",
                  color: "#5F33E1",
                }}
              >
                &nbsp; Personal Information :
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins",
                color: "gray",

                textAlign: "justify",
              }}
            >
              Name, email address, phone number, address, payment information,
              etc.
            </Text>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.dot} />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "PoppinsSemiBold",
                  color: "#5F33E1",
                }}
              >
                &nbsp; Usage Data :
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins",
                color: "gray",

                textAlign: "justify",
              }}
            >
              Information on how the app is accessed and used, including device
              information, IP address, browser type, etc.
            </Text>
            <View style={{ paddingVertical: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "PoppinsSemiBold",

                  marginVetical: 10,
                  color: "#5F33E1",
                }}
              >
                Data Usage
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.dot} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins",
                    color: "gray",

                    textAlign: "justify",
                  }}
                >
                  &nbsp; To provide and maintain our services.
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.dot} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins",
                    color: "gray",

                    textAlign: "justify",
                  }}
                >
                  &nbsp; To notify you about changes to our services.
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.dot} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins",
                    color: "gray",

                    textAlign: "justify",
                  }}
                >
                  &nbsp; To allow you to participate in interactive features.
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.dot} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins",
                    color: "gray",

                    textAlign: "justify",
                  }}
                >
                  &nbsp; To provide customer support.
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.dot} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins",
                    color: "gray",

                    textAlign: "justify",
                  }}
                >
                  &nbsp; To gather analysis for service improvement.
                </Text>
              </View>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "PoppinsSemiBold",
                  marginVetical: 10,
                  color: "#5F33E1",
                }}
              >
                Data Protection
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.dot} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins",
                    color: "gray",

                    textAlign: "justify",
                  }}
                >
                  &nbsp; We implement security measures to protect your
                  information.
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.dot} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins",
                    color: "gray",

                    textAlign: "justify",
                  }}
                >
                  &nbsp; Data encryption and secure server storage.
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.dot} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins",
                    color: "gray",

                    textAlign: "justify",
                  }}
                >
                  &nbsp; Regular security audits and updates.
                </Text>
              </View>
            </View>
            <View style={{ paddingVertical: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "PoppinsSemiBold",

                  marginVetical: 10,
                  color: "#5F33E1",
                }}
              >
                User Rights
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.dot} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins",
                    color: "gray",
                  }}
                >
                  &nbsp; Access: You can request access to your personal
                  information.
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.dot} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins",
                    color: "gray",

                    textAlign: "justify",
                  }}
                >
                  &nbsp; Correction: You can request corrections to any
                  inaccurate information.
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.dot} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins",
                    color: "gray",
                    textAlign: "justify",
                  }}
                >
                  &nbsp; Deletion: You can request the deletion of your personal
                  information.
                </Text>
              </View>
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
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "#5F33E1",
    marginVertical: 5,
    // marginLeft: 20,
  },
});

export default PrivacyPolicy;
