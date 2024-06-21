import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Image,
  BackHandler,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "../header/Header";
import BookingTab from "./BookingTab";
import HomeTutorBooking from "./HomeTutorBooking";
import TherapistBooking from "./TherapistBooking";


const MainBooking = ({ route, navigation }) => {
    const [bookingTab, setBookingTab] = useState(1);
    const onSelectSwitch = (value) => {
      setBookingTab(value);
    };
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

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 20 }}>
        <Header title={"Booking"} icon={require("../../assets/back.png")} />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1,paddingHorizontal:10 }}
      >
     
          <View style={{ flex: 1, marginVertical: 10 }}>
       <View style={{marginHorizontal:10}}>
          <BookingTab
            selectionMode={1}
            option1="Home Tutor"
            option2="Therapist"
            onSelectSwitch={onSelectSwitch}
          />
          </View>
          {bookingTab === 1 && <HomeTutorBooking />  }
          {bookingTab === 2 && <TherapistBooking /> }
      
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

export default MainBooking;
