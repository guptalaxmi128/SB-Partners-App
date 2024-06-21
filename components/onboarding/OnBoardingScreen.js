// import React from 'react';
// import { View, Text, ImageBackground, StyleSheet, TouchableOpacity,StatusBar } from 'react-native';

// const OnBoarding = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//      <StatusBar translucent backgroundColor="transparent" />
//       <ImageBackground
//         source={{uri: 'https://images.unsplash.com/photo-1566501206188-5dd0cf160a0e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
//         style={[styles.image, { height: 400 }]} 
//       >
//       </ImageBackground>
//       <View style={styles.containerBelow}>
//         <Text style={styles.text}>Today, investigate your new talent!</Text>
//         <Text style={styles.ptext}>According to your needs, we provide a variety of learning options.</Text>
//         <TouchableOpacity style={styles.button} onPress=  {()=>navigation.navigate('Login')}>
//           <Text style={styles.buttonText}>Get Started</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
//   containerBelow: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//   },
//   text: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     textAlign:'center',
//     marginBottom: 10,
//     fontFamily:'Poppins'
//   },
//   ptext: {
//     fontSize: 18,
//     textAlign:'center',
//     color:'gray',
//     marginBottom: 40,
//     lineHeight: 24,
//     fontFamily:'Poppins'
//   },
//   button: {
//     backgroundColor: "rgba(107, 78, 255, 1)",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: "bold",
//     fontFamily:'Poppins'
//   },
// });

// export default OnBoarding;



import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Onboarding from "react-native-onboarding-swiper";



export default function OnBoardingScreen({ navigation }) {
  const renderImage = (source) => (
    <View style={{ width: wp(100), height: hp(40) }}>
      <Image source={source} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
    </View>
  );

  const handleDone = async () => {
    navigation.navigate("authStack");
  }

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.nextButton} {...props}>
        <Image
          source={require("../../assets/arrow-right.png")}
          style={{ height: 20, width: 20 }}
        />
      </TouchableOpacity>
    );
  };

  const skipButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.skipButton} {...props}>
        <Text style={{ color: "#000", fontFamily: "Poppins" }}>Skip</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
     
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
     
      <Onboarding
        onSkip={handleDone}
        onDone={handleDone}
        bottomBarHighlight={false}
        DoneButtonComponent={doneButton}
        NextButtonComponent={doneButton}
        SkipButtonComponent={skipButton}
        bottomBarContainerStyle={{ marginBottom: 30 }}
        containerStyles={{ paddingHorizontal: 20 }}
        titleStyles={styles.textHeading}
        subTitleStyles={styles.textP}
        pages={[
          {
            backgroundColor: "#fff2cd",
            image: renderImage(require("../../assets/bording/onboarding2.png")),
            title: "Welcome to Swasti Bharat Partners!",
            subtitle:
              "Join our yoga community. List your services, connect with clients, and grow your practice.",
          },
          {
            backgroundColor: "#f2f9ca",
            image: renderImage(require("../../assets/bording/onboarding1.png")),
            title: "Set Up Your Profile",
            subtitle:
              "Add your details, set availability, and list services. Stand out with clear, quality images.",
          },
          {
            backgroundColor: "#fce1cf",
            image: 
              renderImage(require("../../assets/bording/onboarding3.png")),
            
            title: "Manage Bookings Easily",
            subtitle:
              "Receive and manage bookings through the app. Secure payments and easy communication await.",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textHeading: {
    fontSize: hp(3),
    lineHeight: 28,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Poppins",
    color:'green'
  },
  textP: {
    // marginVertical: 3,
    fontSize: hp(2),
    // lineHeight: 20,
    textAlign: "center",
    color: "green",
    fontFamily: "Poppins",
  },
  nextButton: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginRight: 15,
    marginBottom: 10,
  },
  skipButton: {
    // marginBottom: 10,
    marginLeft: 15,
  },
});
