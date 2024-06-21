import React, { useEffect } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  StatusBar,
  Image,
  BackHandler,
  ScrollView
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "../header/Header";
import Accordion from "../accordion/Accordion";
import { useNavigation } from "@react-navigation/native";


const Help = () => {
  const navigation = useNavigation();
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
          title={"Help and Support"}
          icon={require("../../assets/back.png")}
        />
      </View>
      <View style={{ marginVertical: 5, paddingHorizontal: 20 }}>
        {/* <View style={{ marginBottom: 30 }}>
          <View style={styles.inputContainer}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/search.png")}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#000" // Placeholder color
              style={styles.input}
            />
          
          </View>
        </View> */}
        <ScrollView showsVerticalScrollIndicator={false} >
        <Accordion
          title="What is Swasti Bharat Partners App?"
          answer="Swasti Bharat Partners App is a platform where yoga instructors, therapists, and studios can list their services to connect with users seeking yoga-related services like home tutoring, therapy sessions, and studio classes."
        />
        <Accordion
          title="How do I register as a service provider on the app?"
          answer="To register, download the Swasti Bharat Partners App, complete the registration form with your personal and professional details, and submit the required documents for verification."
        />
        <Accordion
          title="How does the verification process work?"
          answer="After submitting your registration, our team will review your credentials and documents. Once verified, you will receive a confirmation email, and your profile will be live on the app."
        />
        <Accordion
          title="How can I manage my profile and services?"
          answer="You can manage your profile, update your services, set your availability, and modify your pricing directly through the Swasti Bharat Partners App."
        />
        <Accordion
          title="How do I receive bookings from users?"
          answer="Users will search for services based on their preferences and book directly through the app. You will receive notifications for new bookings, which you can accept or decline."
        />

<Accordion
          title="How are payments handled?"
          answer="Payments are processed securely through the app. Users pay at the time of booking, and funds are transferred to your account after the service is completed."
        />
        <Accordion
          title="How can I ensure my profile stands out?"
          answer="Ensure your profile is complete with accurate information, high-quality images, and detailed descriptions of your services. Encourage satisfied clients to leave positive reviews and ratings."
        />
        <Accordion
          title="How can I contact support if I have an issue?"
          answer="You can contact our support team through the app’s help and support section. We are available to assist you with any issues or questions you may have."
        />
        <Accordion
          title="What are the guidelines for reviews and ratings?"
          answer="Users can leave reviews and ratings based on their experience. Ensure you provide high-quality service to maintain a good rating. If you encounter any issues with a review, contact support for assistance."
        />
        <Accordion
          title="Can I list multiple services or locations?"
          answer="Yes, you can list multiple services and locations. Update your profile to include all the services you offer and specify different locations if applicable."
        />

<Accordion
          title="What are the requirements for listing a yoga studio?"
          answer="To list a yoga studio, provide the studio’s name, location, class schedule, types of classes offered, pricing, and images of the studio. Ensure all information is accurate and up-to-date."
        />
        <Accordion
          title="Are there any fees for using the app?"
          answer="The app may charge a commission or service fee for each booking. Details about fees will be provided during registration and in your service agreement."
        />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(90),
    height: 48,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: "#000",
    fontFamily: "Poppins",
    marginLeft: 10,
  },
});

export default Help;
