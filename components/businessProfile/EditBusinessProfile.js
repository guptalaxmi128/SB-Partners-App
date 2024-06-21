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
  BackHandler,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../header/Header";
import { getYogaStudioById } from "../../action/yogaStudio/yogaStudio";
import { useDispatch } from "react-redux";

const EditBusinessProfile = ({ navigation, route }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [timing, setTiming] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getYogaStudioById(id));
        console.log(res.data);
        setSelectedBusiness(res.data);
        setAddress(
          `${res.data.block_building}, ${res.data.street_colony}, ${res.data.pincode}`
        );
        setMobileNumber(res.data.contacts.mobileNumber[0]);
       
        setTiming(res.data.timings[0].openAt);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);
  console.log(address)

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
  const profileOptions = [
    {
      id: 1,
      title: "Business Name",
      description: selectedBusiness.businessName,
      icon: require("../../assets/profile-icon/note.png"),
      navigateTo: "EditYStudioForm",
    },
    {
      id: 2,
      title: "Contact Details",
      description: mobileNumber ? (
        `+91 ${mobileNumber}`
      ) : (
        <View
          style={{
            backgroundColor: "rgba(254, 243, 242, 1)",
            padding: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "red", fontFamily: "Poppins", fontSize: 12 }}>
            Add Contact
          </Text>
        </View>
      ),
      icon: require("../../assets/profile-icon/note.png"),
      navigateTo: "EditContactDetails",
      navigateTo: mobileNumber ? "EditContactDetails" : "AddBusinessContact",
    },
    {
      id: 3,
      title: "Business Address",
      description: address,
      icon: require("../../assets/profile-icon/note.png"),
      navigateTo: "EditYStudioForm",
    },
    {
      id: 4,
      title: "Business Timings",
      description: timing ? `Open at ${timing}` :  (
        <View
          style={{
            backgroundColor: "rgba(254, 243, 242, 1)",
            padding: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "red", fontFamily: "Poppins", fontSize: 12 }}>
            Add Business Timings
          </Text>
        </View>
      ),
      icon: require("../../assets/profile-icon/note.png"),
      navigateTo: timing ? "EditTiming" : "BusinessTiming",
    },
    {
      id: 5,
      title: "Business Categories",
      description: "Update KYC & GST Details",
      icon: require("../../assets/profile-icon/note.png"),
    },
    {
      id: 6,
      title: "Photo and Videos",
      description: "Update Services, Benefits",
      icon: require("../../assets/profile-icon/note.png"),
    },
    {
      id: 7,
      title: "Rate Card / Catalogue",
      description: "Connect with Us",
      icon: require("../../assets/profile-icon/note.png"),
    },
    {
      id: 8,
      title: "Business Website",
      description: "Connect with Us",
      icon: require("../../assets/profile-icon/note.png"),
    },
    {
      id: 9,
      title: "Social Media",
      description: "Connect with Us",
      icon: require("../../assets/profile-icon/note.png"),
    },
  ];
  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" />
          <View style={{ paddingTop: 20 }}>
            <Header
              title={"Edit Profile"}
              icon={require("../../assets/back.png")}
            />
          </View>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
          >
            <View style={{ paddingVertical: 5 }}>
              {profileOptions.map((option) => (
                <>
                  <TouchableOpacity
                    key={option.id}
                    onPress={() =>
                      navigation.navigate(option.navigateTo, { id: id })
                    }
                  >
                    <View style={styles.viewContainer}>
                      <View style={styles.rowContainer} key={option.id}>
                        <Image style={styles.image} source={option.icon} />
                        <View>
                          <Text style={styles.textContainer}>
                            {option.title}
                          </Text>
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
      )}
    </>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditBusinessProfile;
