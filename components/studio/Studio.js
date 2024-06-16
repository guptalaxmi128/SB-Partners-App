import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import CustomHeader from "../CustomHeader/CustomHeader";

const Studio = ({ navigation }) => {
  const profileOptions = [
    {
      title: "Business Profile",
      description:
        "Update Categories, WhatsApp / Mobile Numbers & Business Timings",
      icon: require("../../assets/profile-icon/note.png"),
    },
    {
      title: "Catalogue",
      description: "Showcase Products & Services",
      icon: require("../../assets/profile-icon/note.png"),
    },
    {
      title: "Business Tool",
      description: "Manage Offers, Campaigns & Rating",
      icon: require("../../assets/profile-icon/note.png"),
    },
    {
      title: "Advertise on Partners",
      description: "Reach Out to 17 Crore New Customers",
      icon: require("../../assets/profile-icon/note.png"),
    },
    {
      title: "KYC, Payments & Invoice",
      description: "Update KYC & GST Details",
      icon: require("../../assets/profile-icon/note.png"),
    },
    {
      title: "Additional Business Info",
      description: "Update Services, Benefits",
      icon: require("../../assets/profile-icon/note.png"),
    },
    {
      title: "Support",
      description: "Connect with Us",
      icon: require("../../assets/profile-icon/note.png"),
    },
  ];
  return (
    <View style={styles.container}>
     <StatusBar translucent backgroundColor="transparent" />
     <View style={{paddingTop:15}}>
      <CustomHeader
        title={"Yoga Studio"}
        icon={require("../../assets/back.png")}
        destination={"Support"}
        buttonText={"Support"}
      />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View style={{ paddingVertical: 5 }}>
          {profileOptions.map((option, index) => (
            <>
            <TouchableOpacity key={index}>
              <View style={styles.viewContainer}>
                <View style={styles.rowContainer}>
                  <Image style={styles.image} source={option.icon} />
                  <View>
                    <Text style={styles.textContainer}>{option.title}</Text>
                    <Text style={styles.text}>{option.description}</Text>
                  </View>
                </View>
                <Image
                  style={styles.image}
                  source={require("../../assets/profile-icon/arrow-right.png")}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.hr} />
            </>
          ))}

       
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
    width: "100%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    opacity: 0.1,
    marginTop: 5,
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: hp(8),
    // paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  textContainer: {
    fontSize: 16,
    fontWeight: "200",
    fontFamily: "Poppins",
    paddingHorizontal: 20,
  },
  image: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: hp(1.8),
    fontWeight: "200",
    fontFamily: "Poppins",
    color: "gray",
    paddingHorizontal: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Studio;
