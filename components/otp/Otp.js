// import React, { useState,useEffect } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   Alert,
// } from "react-native";
// // import Clipboard from "@react-native-community/clipboard";
// import OTPInputView from "@twotalltotems/react-native-otp-input";
// import Button from "../button/Button";
// import { useRoute } from "@react-navigation/native";

// const Otp = ({ navigation }) => {
//   const [otp, setOtp] = useState("");

//   const handleOtpChange = (code) => {
//     setOtp(code);
//   };

//   const handleSubmit = () => {
//     Alert.alert("OTP Submitted", `OTP Code: ${otp}`);
//     navigation.navigate("TabNavigator")
//   };

//   const checkClipboard = async () => {
//     const clipboardContent = await Clipboard.getString();
//     console.log("Clipboard Content:", clipboardContent);
//   };

//   useEffect(() => {
//     checkClipboard();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <StatusBar translucent backgroundColor="transparent" />
//       <View style={{ marginLeft: 20, paddingTop: 50 }}>
//         <Text style={styles.headerText}>Send OTP Code</Text>
//         <Text style={styles.subHeaderText}>
//           Enter the 6-digit that we have sent via the phone number to 9876543210
//           {/* {mobileNumber} */}
//         </Text>
//       </View>

//       <View style={{ marginHorizontal: 20, marginVertical: 30 }}>
//         <OTPInputView
//           style={styles.otpInput}
//           pinCount={6}
//           code={otp}
//           onCodeChanged={handleOtpChange}
//           autoFocusOnLoad
//           codeInputFieldStyle={styles.underlineStyleBase}
//           codeInputHighlightStyle={styles.underlineStyleHighLighted}
//         />
//       </View>

//       <View style={styles.resendContainer}>
//         <Text style={styles.resendText}>Resend Code</Text>
//       </View>
//       <View style={{ marginBottom: 10, paddingHorizontal: 20 }}>
//         <Button
//           title={"Continue"}
//           onPress={handleSubmit}
//         />
//       </View>
//       <View style={styles.termsContainer}>
//         <Text style={styles.termsText}>
//           By signing up or logging in, I accept the app's{" "}
//         </Text>
//         <TouchableOpacity onPress={() => navigation.navigate("TermConditions")}>
//           <Text style={styles.linkText}>Terms of Services</Text>
//         </TouchableOpacity>
//         <Text style={styles.termsText}> and </Text>
//         <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
//           <Text style={styles.linkText}>Privacy Policy</Text>
//         </TouchableOpacity>
//         <Text style={styles.termsText}>.</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   headerText: {
//     fontSize: 28,
//     fontFamily: "Poppins",
//     fontWeight: "bold",
//   },
//   subHeaderText: {
//     fontSize: 16,
//     fontFamily: "Poppins",
//     fontWeight: "400",
//     marginTop: 5,
//     lineHeight: 24,
//   },
//   resendContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 230,
//   },
//   resendText: {
//     fontFamily: "Poppins",
//     fontWeight: "400",
//     fontSize: 16,
//     paddingHorizontal: 20,
//     color: "rgba(107, 78, 255, 1)",
//   },
//   termsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     paddingHorizontal: 20,
//     textAlign: "center",
//   },
//   termsText: {
//     fontFamily: "Poppins",
//     fontWeight: "400",
//     fontSize: 14,
//   },
//   linkText: {
//     color: "rgba(107, 78, 255, 1)",
//     fontFamily: "Poppins",
//     fontWeight: "400",
//     fontSize: 14,
//   },
//   otpInput: {
//     width: "100%",
//     height: 100,
//   },
//   underlineStyleBase: {
//     width: 45,
//     height: 45,
//     borderWidth: 0.5,
//     borderColor: "gray",
//     color: "#000",
//     fontSize: 20,
//     borderRadius: 10,
//     padding: 10,
//     fontSize: 18,
//     marginLeft:2,
//     marginRight:2,
//     textAlign: "center",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   underlineStyleHighLighted: {
//     borderColor: "#03DAC6",
//   },
// });

// export default Otp;

import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  StatusBar,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Button from "../button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CountDown from "react-native-countdown-component";
import { verifyOtp,login } from "../../action/auth/auth";

const VerifyOtp = ({ route }) => {
  const dispatch=useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const [showTimer, setShowTimer] = useState(false);
  const [otp1, setOtp1] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
  const [error, setError] = useState(false); // State to handle errors

  const { mobileNumber } = route.params;
  const otp = Object.keys(otp1)
    .map((key) => otp1[key])
    .join("");

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();

  const inputRefs = [
    firstInput,
    secondInput,
    thirdInput,
    fourthInput,
    fifthInput,
    sixthInput,
  ];

  console.log(mobileNumber)
  const handleSubmit = async () => {
    setError(false); // Reset error state
    if (!loading) {
      setLoading(true);
      try {
        // Verify OTP
        const res = await dispatch(verifyOtp({ phoneNumber:mobileNumber,  otp }));
        console.log(res);
    
        await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        // Show toast message
        ToastAndroid.show("OTP Verified Successfully!", ToastAndroid.SHORT);
       
        // Navigate to TabNavigator
        navigation.navigate("appStack");
      } catch (error) {
        console.error("Error occurred while verifying OTP:", error);
        setError(true); // Set error state
        // Show toast message for error
        ToastAndroid.show(error.response?.data.message, ToastAndroid.SHORT);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResend = async () => {
    setError(false); // Reset error state
    try {
      // Verify OTP
      const formData = {  phoneNumber: mobileNumber };
      const res = await dispatch(login(formData));
      console.log(res);

      // Show toast message
      if (res && res.success) {
        ToastAndroid.show("OTP Resent Successfully!", ToastAndroid.SHORT);
        setRemainingTime(60); // Reset the countdown time
        setShowTimer(true);
        console.log('Setting showTimer to true');
      }
    } catch (error) {
      console.error("Error occurred while resending OTP:", error);
      setError(true); // Set error state
      // Show toast message for error
      ToastAndroid.show("Error occurred while resending OTP", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    if (showTimer) {
      // Start the countdown only when showTimer is true
      const timer = setTimeout(() => {
        setRemainingTime(0); // When the countdown ends, you can trigger any action like showing a message
      }, remainingTime * 1000); // Convert seconds to milliseconds

      // Clear the timer when the component unmounts
      return () => clearTimeout(timer);
    }
  }, [showTimer, remainingTime]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ marginLeft: 20, paddingTop: 50 }}>
        <Text style={styles.headerText}>Send OTP Code</Text>
        <Text style={styles.subHeaderText}>
          Enter the 6-digit that we have sent via the phone number to&nbsp; 
          {mobileNumber}
        </Text>
      </View>

      <View style={{ marginHorizontal: 20, marginVertical: 30 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <TextInput
              key={index}
              style={[
                styles.underlineStyleBase,
                { borderColor: error ? "red" : otp1[index] ? "blue" : "gray" },
              ]}
              keyboardType="number-pad"
              maxLength={1}
              ref={inputRefs[index - 1]}
              onChangeText={(text) => {
                setOtp1({ ...otp1, [index]: text });
                if (text && index < 6) {
                  inputRefs[index].current.focus();
                }
              }}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 230,
        }}
        onPress={handleResend}
      >
        <Text style={styles.resendText}>Resend Code</Text>
        {showTimer && (
          <CountDown
            until={remainingTime}
            onFinish={() => setShowTimer(false)}
            size={16}
            digitStyle={{ backgroundColor: "transparent" }}
            digitTxtStyle={{
              color: "gray",
              fontFamily: "Poppins",
              fontSize: 16,
            }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: null, s: null }}
            showSeparator
          />
        )}
      </TouchableOpacity>

      <View style={{ marginBottom: 10, paddingHorizontal: 20 }}>
      <Button
            title={
              loading ? (
                <ActivityIndicator
                  size="small"
                  color="#ffffff"
                  style={styles.indicator}
                />
              ) : (
                "Continue"
              )
            }
            onPress={handleSubmit}
            disabled={loading}
          />
      </View>
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By signing up or logging in, I accept the app's{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("TermConditions")}>
          <Text style={styles.linkText}>Terms of Services</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}> and </Text>
        <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 28,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "400",
    marginTop: 5,
    lineHeight: 24,
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 230,
  },
  resendText: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 16,
    paddingHorizontal: 20,
    color: "rgba(107, 78, 255, 1)",
  },
  termsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 20,
    textAlign: "center",
  },
  termsText: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 14,
  },
  linkText: {
    color: "rgba(107, 78, 255, 1)",
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 14,
  },
  otpInput: {
    width: "100%",
    height: 100,
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 0.5,
    borderColor: "gray",
    color: "#000",
    fontSize: 20,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    marginLeft: 2,
    marginRight: 2,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
  },
});

export default VerifyOtp;
