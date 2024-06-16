import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import Header from "../header/Header";


const PrivacyPolicy = ({ navigation }) => {
  return (
    <View style={styles.container}>
     <StatusBar translucent backgroundColor="#fff" />
      <View style={{ paddingTop: 15 }}>
      <Header
        title={"Privacy Policy"}
        icon={require("../../assets/back.png")}
      />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}>
        <View style={{ flex: 1 }}>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins",
                marginLeft: 20,
                fontWeight: "200",
                color: "gray",
              }}
            >
              Last update: 16-04-2024
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins",
                color: "gray",
                fontWeight: "500",
                padding: 20,
                textAlign: "justify",
              }}
            >
              Please read these terms of service, carefully before using our app
              operated by us.
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins",
                fontWeight: "bold",
                marginLeft: 20,
                marginBottom: 20,
                color: "rgba(107, 78, 255, 1)",
              }}
            >
              Privacy Policy
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins",
                color: "gray",
                fontWeight: "400",
                paddingHorizontal: 20,
                textAlign: "justify",
              }}
            >
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that is has a more-or-less normal
              distribution of letters.
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins",
                color: "gray",
                fontWeight: "400",
                paddingHorizontal: 20,
                textAlign: "justify",
              }}
            >
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that is has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Lorem Ipsum
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins",
                color: "gray",
                fontWeight: "400",
                paddingHorizontal: 20,
                textAlign: "justify",
              }}
            >
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that is has a more-or-less normal
              distribution of letters.
            </Text>
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
});

export default PrivacyPolicy;
