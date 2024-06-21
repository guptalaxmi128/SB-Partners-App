// import React, { useEffect, useState } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   BackHandler,
//   FlatList,
// } from "react-native";
// import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
// import LinearGradient from "expo-linear-gradient";

// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

// const dummyData = [
//   {
//     id: "1",
//     name: "Aman Gupta",
//     address: "68, Ashoka Road, New Delhi, 110010",
//     session: "Session For Childrens",
//     time: "08:30",
//     image: require("../../assets/get-screen/tutor1.jpg"),
//   },
//   {
//     id: "2",
//     name: "Ravi Kumar",
//     address: "24, MG Road, Bangalore, 560001",
//     session: "Session For Childrens",
//     time: "10:00",
//     image: require("../../assets/get-screen/tutor3.jpg"),
//   },
//   {
//     id: "3",
//     name: "Rohit Gupta",
//     address: "24, MG Road, Bangalore, 560001",
//     session: "Session For Parents",
//     time: "10:00",
//     image: require("../../assets/get-screen/tutor1.jpg"),
//   },
//   {
//     id: "4",
//     name: "Ankush Gupta",
//     address: "24, MG Road, Bangalore, 560001",
//     session: "Session For Parents",
//     time: "10:00",
//     image: require("../../assets/get-screen/tutor3.jpg"),
//   },
//   {
//     id: "5",
//     name: "Rahul Kumar",
//     address: "24, MG Road, Bangalore, 560001",
//     session: "Session For Childrens",
//     time: "10:00",
//     image: require("../../assets/get-screen/tutor1.jpg"),
//   },
// ];

// const TutorCard = ({ tutor }) => (
//   <View style={styles.cardContainer}>
//     <View style={styles.leftContainer}>
//       <Image source={tutor.image} style={styles.tutorImage} />
//     </View>
//     <View style={styles.rightContainer}>
//       <Text style={styles.text}>{tutor.name}</Text>
//       <View style={styles.locationContainer}>
//         <Image
//           source={require("../../assets/booking/location.png")}
//           style={styles.locationIcon}
//         />
//         <Text style={styles.text1}>{tutor.address}</Text>
//       </View>
//       <View style={styles.locationContainer}>
//         <Image
//           source={require("../../assets/booking/session.png")}
//           style={styles.icon}
//         />
//         <Text style={styles.text1}>{tutor.session}</Text>
//       </View>
//       <View style={styles.locationContainer}>
//         <Image
//           source={require("../../assets/booking/clock.png")}
//           style={styles.icon}
//         />
//         <Text style={styles.text1}>{tutor.time}</Text>
//       </View>
//     </View>
//   </View>
// );

// const ShimmerLoader = () => (
//   <View style={styles.cardContainer1}>
//     <ShimmerPlaceholder style={[styles.tutorImage,{marginRight:10}]} />
//     <View style={styles.rightContainer}>
//       <ShimmerPlaceholder style={styles.text} />
//       <ShimmerPlaceholder style={styles.locationIcon} />
//       <ShimmerPlaceholder style={styles.text1} />
//       <ShimmerPlaceholder style={styles.icon} />
//       <ShimmerPlaceholder style={styles.text1} />
//       <ShimmerPlaceholder style={styles.icon} />
//       <ShimmerPlaceholder style={styles.text1} />
//     </View>
//   </View>
// );

// const TherapistBooking = ({ navigation }) => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const handleBackPress = () => {
//       if (navigation.isFocused()) {
//         navigation.goBack();
//         return true;
//       }
//       return false;
//     };

//     BackHandler.addEventListener("hardwareBackPress", handleBackPress);

//     const timer = setTimeout(() => setLoading(false), 3000); // Simulate loading for 3 seconds

//     return () => {
//       BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
//       clearTimeout(timer);
//     };
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <FlatList
//           data={[1, 2, 3, 4, 5]}
//           renderItem={() => <ShimmerLoader />}
//           keyExtractor={(item) => item.toString()}
//         />
//       ) : (
//         <FlatList
//           data={dummyData}
//           renderItem={({ item }) => <TutorCard tutor={item} />}
//           keyExtractor={(item) => item.id}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   cardContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 10,
//     marginTop: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     backgroundColor: "rgba(95, 51, 225, 1)",
//     elevation: 5,
//     borderRadius: 10,
//   },
//   cardContainer1: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 10,
//     marginTop: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     borderRadius: 10,
//   },
//   leftContainer: {
//     marginRight: 10,
//   },
//   rightContainer: {
//     flex: 1,
//     paddingVertical: 5,
//   },
//   text: {
//     fontSize: 14,
//     fontWeight: "600",
//     fontFamily: "Poppins",
//     lineHeight: 24,
//     color: "#fff",
//   },
//   text1: {
//     fontFamily: "Poppins",
//     fontSize: 11,
//     lineHeight: 19,
//     fontWeight: "400",
//     color: "#fff",
//   },
//   tutorImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 6,
//   },
//   locationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 4,
//   },
//   locationIcon: {
//     width: 8,
//     height: 10,
//     marginRight: 4,
//   },
//   icon: {
//     width: 10,
//     height: 10,
//     marginRight: 4,
//   },
// });

// export default TherapistBooking;

// import React, { useEffect, useState } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   BackHandler,
//   FlatList,
// } from "react-native";
// import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
// import LinearGradient from "expo-linear-gradient";

// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

// const dummyData = [
//   {
//     id: "1",
//     name: "Aman Gupta",
//     address: "68, Ashoka Road, New Delhi, 110010",
//     session: "Session For Childrens",
//     time: "08:30",
//     image: require("../../assets/get-screen/tutor1.jpg"),
//   },
//   {
//     id: "2",
//     name: "Ravi Kumar",
//     address: "24, MG Road, Bangalore, 560001",
//     session: "Session For Childrens",
//     time: "10:00",
//     image: require("../../assets/get-screen/tutor3.jpg"),
//   },
//   {
//     id: "3",
//     name: "Rohit Gupta",
//     address: "24, MG Road, Bangalore, 560001",
//     session: "Session For Parents",
//     time: "10:00",
//     image: require("../../assets/get-screen/tutor1.jpg"),
//   },
//   {
//     id: "4",
//     name: "Ankush Gupta",
//     address: "24, MG Road, Bangalore, 560001",
//     session: "Session For Parents",
//     time: "10:00",
//     image: require("../../assets/get-screen/tutor3.jpg"),
//   },
//   {
//     id: "5",
//     name: "Rahul Kumar",
//     address: "24, MG Road, Bangalore, 560001",
//     session: "Session For Childrens",
//     time: "10:00",
//     image: require("../../assets/get-screen/tutor1.jpg"),
//   },
// ];

// const TutorCard = ({ tutor }) => (
//   <View style={styles.cardContainer}>
//     <View style={styles.leftContainer}>
//       <Image source={tutor.image} style={styles.tutorImage} />
//     </View>
//     <View style={styles.rightContainer}>
//       <Text style={styles.text}>{tutor.name}</Text>
//       <View style={styles.locationContainer}>
//         <Image
//           source={require("../../assets/booking/location.png")}
//           style={styles.locationIcon}
//         />
//         <Text style={styles.text1}>{tutor.address}</Text>
//       </View>
//       <View style={styles.locationContainer}>
//         <Image
//           source={require("../../assets/booking/session.png")}
//           style={styles.icon}
//         />
//         <Text style={styles.text1}>{tutor.session}</Text>
//       </View>
//       <View style={styles.locationContainer}>
//         <Image
//           source={require("../../assets/booking/clock.png")}
//           style={styles.icon}
//         />
//         <Text style={styles.text1}>{tutor.time}</Text>
//       </View>
//     </View>
//   </View>
// );

// const ShimmerLoader = () => (
//   <View style={styles.cardContainer1}>
//     <ShimmerPlaceholder style={[styles.tutorImage,{marginRight:10}]} />
//     <View style={styles.rightContainer}>
//       <ShimmerPlaceholder style={styles.text} />
//       <ShimmerPlaceholder style={styles.locationIcon} />
//       <ShimmerPlaceholder style={styles.text1} />
//       <ShimmerPlaceholder style={styles.icon} />
//       <ShimmerPlaceholder style={styles.text1} />
//       <ShimmerPlaceholder style={styles.icon} />
//       <ShimmerPlaceholder style={styles.text1} />
//     </View>
//   </View>
// );

// const HomeTutorBooking = ({ navigation }) => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const handleBackPress = () => {
//       if (navigation.isFocused()) {
//         navigation.goBack();
//         return true;
//       }
//       return false;
//     };

//     BackHandler.addEventListener("hardwareBackPress", handleBackPress);

//     const timer = setTimeout(() => setLoading(false), 3000); // Simulate loading for 3 seconds

//     return () => {
//       BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
//       clearTimeout(timer);
//     };
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <FlatList
//           data={[1, 2, 3, 4, 5]}
//           renderItem={() => <ShimmerLoader />}
//           keyExtractor={(item) => item.toString()}
//         />
//       ) : (
//         <FlatList
//           data={dummyData}
//           renderItem={({ item }) => <TutorCard tutor={item} />}
//           keyExtractor={(item) => item.id}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   cardContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 10,
//     marginTop: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     backgroundColor: "rgba(95, 51, 225, 1)",
//     elevation: 5,
//     borderRadius: 10,
//   },
//   cardContainer1: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 10,
//     marginTop: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     borderRadius: 10,
//   },
//   leftContainer: {
//     marginRight: 10,
//   },
//   rightContainer: {
//     flex: 1,
//     paddingVertical: 5,
//   },
//   text: {
//     fontSize: 14,
//     fontWeight: "600",
//     fontFamily: "Poppins",
//     lineHeight: 24,
//     color: "#fff",
//   },
//   text1: {
//     fontFamily: "Poppins",
//     fontSize: 11,
//     lineHeight: 19,
//     fontWeight: "400",
//     color: "#fff",
//   },
//   tutorImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 6,
//   },
//   locationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 4,
//   },
//   locationIcon: {
//     width: 8,
//     height: 10,
//     marginRight: 4,
//   },
//   icon: {
//     width: 10,
//     height: 10,
//     marginRight: 4,
//   },
// });

// export default HomeTutorBooking;


import React, { useEffect } from "react";
import { Text, View, StyleSheet,  Image, BackHandler } from "react-native";


const TherapistBooking = ({ navigation }) => {
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
    

      <View style={styles.contentContainer}>
      <View style={styles.imageContainer}>
          <Image source={require("../../assets/booking1.png")} style={styles.image} />
        </View>
  
        <Text style={styles.text}>No Booking Found!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
      // backgroundColor:'#5F33E1'
    // paddingHorizontal: 20,
  },
  imageContainer: {
    width: 250,
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text: {
    marginTop: 5,
    fontFamily: "Poppins",
    fontSize: 18,
    textAlign: "center",
    color:'#5F33E1'
  },
  // text1: {
  //   marginTop: 40,
  //   fontFamily: "PoppinsSemiBold",
  //   fontSize: 20,
  //   textAlign: "center",
  //   color:'#fff'
  // },
});

export default TherapistBooking;

