import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PhoneInput from "react-native-phone-number-input";
import { useDispatch } from "react-redux";
import Button from "../button/Button";
import Input from "../input/Input";
import { login, register } from "../../action/auth/auth";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [showEmail, setShowEmail] = useState(false);
  const [showName,setShowName]=useState(false);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const handleSubmit = async () => {
    let isValid = true;


    if (!mobileNumber) {
      setMobileNumberError("Please enter your mobile number");
      isValid = false;
    } else if (mobileNumber.length !== 10) {
      setMobileNumberError("Mobile number should have 10 digits");
      isValid = false;
    } else {
      setMobileNumberError("");
    }

    if (isValid && !loading) {
      setLoading(true);
      const formData = {  phoneNumber: mobileNumber };

      try {
        const res = await dispatch(login(formData));
        console.log("res", res);

        if (res && res.success) {
          navigation.navigate("Otp", { mobileNumber: mobileNumber });
        } else if (
          res &&
          res.success === false &&
          res.message === "Not register!"
        ) {
          // Show email field if the user is not registered
          setShowName(true);
          setShowEmail(true);
          handleError(res.message, "mobileNumber");
        } else if (
          res &&
          res.error &&
          res.error.data &&
          res.error.data.message
        ) {
          handleError(res.error.data.message, "mobileNumber");
        } else {
          console.error(res);
          handleError("Unknown error occurred", "mobileNumber");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          const message = error.response.message || "Not register!";
          setShowEmail(true);
          setShowName(true);
          handleError(message, "mobileNumber");
        } else {
          console.error(
            "Error occurred while submitting mobile number:",
            error
          );
          handleError(
            "Error occurred while submitting mobile number",
            "mobileNumber"
          );
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEmailSubmit = async () => {
    let isValid = true;
  
    if (!inputs.name) {
      handleError("Please input name", "name");
      isValid = false;
    }

    if (!mobileNumber) {
      setMobileNumberError("Please enter your mobile number");
      isValid = false;
    } else if (mobileNumber.length !== 10) {
      setMobileNumberError("Mobile number should have 10 digits");
      isValid = false;
    } else {
      setMobileNumberError("");
    }
  
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(inputs.email)) {
        handleError("Please enter a valid email", "email");
        isValid = false;
      }
    }
  
    if (isValid && !loading) {
      setLoading(true);
      const formData = {
        phoneNumber: mobileNumber,
        name: inputs.name,
        email: inputs.email,
      };
  
      try {
        const res = await dispatch(register(formData));
        if (res  && res.success) {
          navigation.navigate("Otp", { mobileNumber: mobileNumber });
        } else {
          setErrors((prevState) => ({
            ...prevState,
            mobileNumber: res.error || "Unknown error occurred",
          }));
        }
      } catch (error) {
        console.error("Error occurred while registering user:", error);
        setErrors((prevState) => ({
          ...prevState,
          mobileNumber: "Error occurred while registering user",
        }));
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginHorizontal: 20,
          paddingTop: 50,
        }}
      >
        <View style={{ flex: 1 }}>
          <View>
            <Text
              style={{
                fontSize: hp(4),
                fontFamily: "Poppins",
                fontWeight: "bold",
              }}
            >
              Welcome back.
            </Text>
            <Text
              style={{
                fontSize: hp(2.2),
                fontFamily: "Poppins",
                color: "gray",
                fontWeight: "400",
              }}
            >
              Log in to your account
            </Text>
          </View>
          <View style={{ marginVertical: 20 }}>
          {showName && (
            <Input
              onChangeText={(text) => handleOnchange(text, "name")}
              onFocus={() => handleError(null, "name")}
              label="Name"
              placeholder="Name"
              error={errors.name}
            />)}
            <Text style={styles.label}>Mobile Number</Text>
            <PhoneInput
              defaultCode="IN"
              layout="second"
              containerStyle={styles.inputContainer}
              textContainerStyle={{
                paddingVertical: 0,
                backgroundColor: "#fff",
                color: "gray",
              }}
              keyboardType="number-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
            {mobileNumberError ? (
              <Text style={{ color: "red" }}>{mobileNumberError}</Text>
            ) : null}
            {showEmail && (
              <View style={{ marginTop: 20 }}>
                <Input
                  onChangeText={(text) => handleOnchange(text, "email")}
                  onFocus={() => handleError(null, "email")}
                  label="Email"
                  placeholder="Email"
                  error={errors.email}
                />
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: hp(2),
                }}
              >
                You will receive an SMS verification that may apply on the next
                step.
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Button
            title={
              loading ? (
                <ActivityIndicator
                  size="small"
                  color="#ffffff"
                  style={styles.indicator}
                />
              ) : showEmail && showName ? (
                "Register"
              ) : (
                "Get OTP"
              )
            }
            onPress={showEmail && showName ? handleEmailSubmit : handleSubmit}
            disabled={loading}
          />
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

  label: {
    fontSize: hp(2),
    fontFamily: "Poppins",
  },
  inputContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    fontFamily: "Poppins",
    height: 48,
    alignItems: "center",
    paddingHorizontal: 15,
    width: wp(90),
  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
  },
});

export default Login;
