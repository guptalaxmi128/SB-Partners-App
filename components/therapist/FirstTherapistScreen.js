import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SelectList } from "react-native-dropdown-select-list";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../button/Button";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { updateTherapistTerm } from "../../action/auth/auth";


const FirstTherapistScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const data = [
    { key: "1", value: "Yes" },
    { key: "2", value: "No" },
  ];

  const validationSchema = Yup.object().shape({
    selected: Yup.string().required("Selection is required"),
    // isChecked: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const handleSubmit = async (values) => {
    try {
      const isTherapist = values.selected === "Yes";
      //   console.log("Form values:", values);
      //   console.log("Providing Yoga Sessions at Home:", isHome);
      const termInfo = {
        therapistTermAccepted: isTherapist,
       
      };

      setLoading(true);
      const res = await dispatch(updateTherapistTerm(termInfo));
      console.log(res);
      if (res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
        navigation.navigate("Therapist");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      const msg = error.response.data.message;
      Toast.show({
        type: "error",
        text1: msg || "An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

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
    <Formik
      initialValues={{ selected: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" />

          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
          >
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={handleGoBack}
                  style={{ marginTop: 5, paddingVertical: 20 }}
                >
                  <Image
                    source={require("../../assets/back.png")}
                    style={styles.back}
                  />
                </TouchableOpacity>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                  <Text style={styles.headingText}>
                  Become a Yoga Therapist
                  </Text>
                  <Text style={styles.text1}>
                  Offer therapy sessions to the specific need
                  </Text>
                </View>
              </View>
              <View style={styles.imageContainer}>
                <Image
                 source={require("../../assets/get-screen/therapy.jpeg")}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.container1}>
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 14,
                    textAlign: "justify",
                    lineHeight: 24,
                  }}
                >
                  Welcome to{" "}
                  <Text
                    style={{ fontFamily: "PoppinsSemiBold", color: "#000" }}
                  >
                    Swasti Bharat Partners!
                  </Text>
                  As a{" "}
                  <Text
                    style={{ fontFamily: "PoppinsSemiBold", color: "#000" }}
                  >
                          Yoga Therapist

                  </Text>{" "}
                  , you can offer tailored therapy sessions both at home and in
                  your based therapy sessions tailored to the specific needs of
                  your clients. Connect with clients seeking expert care for
                  physical rehabilitation, mental wellness, or chronic pain
                  management. Update your clinic details with images, timings,
                  and location to make it easy for clients to reach you. Join us
                  today and make a meaningful impact on your community's health
                  and well-being.

                </Text>
              </View>
              <View>
                <Text style={styles.headingText1}>
                Are you providing Yoga Therapy Services ?
                </Text>
                <SelectList
                  setSelected={(val) => setFieldValue("selected", val)}
                  data={data}
                  save="value"
                  fontFamily="Poppins"
                  search={false}
                />
                {errors.selected && touched.selected && (
                  <Text style={styles.errorText}>{errors.selected}</Text>
                )}
              </View>
          
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By clicking next, you accept the app's{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("TermConditions")}
                >
                  <Text style={styles.linkText}>Terms of Service</Text>
                </TouchableOpacity>
                <View style={styles.newLineContainer}>
                  <Text style={styles.termsText}> and </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("PrivacyPolicy")}
                  >
                    <Text style={styles.linkText}>Privacy Policy</Text>
                  </TouchableOpacity>
                  <Text style={styles.termsText}>.</Text>
                </View>
              </View>

              <Button
                title={
                  loading ? (
                    <ActivityIndicator
                      size="small"
                      color="#ffffff"
                      style={styles.indicator}
                    />
                  ) : (
                    "Next"
                  )
                }
                onPress={handleSubmit}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  back: {
    width: 24,
    height: 24,
  },
  imageContainer: {
    width: wp(90),
    height: hp(23),
    borderRadius: 10,
    backgroundColor: "#dcdcdc",
    alignSelf: "center",
    marginVertical: 20,
  },
  image: { width: "100%", height: "100%", borderRadius: 10 },
  container1: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: hp(2.2),
    fontFamily: "PoppinsSemiBold",
    lineHeight: 28,
  },
  headingText1: {
    fontSize: hp(2),
    fontFamily: "PoppinsSemiBold",
    lineHeight: 28,
    marginBottom: 8,
  },
  text1: {
    fontSize: hp(1.8),
    fontFamily: "Poppins",
    lineHeight: 20,
    fontWeight: "500",
  },
  termsContainer: {
    width: wp("100%"),
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 10,
  },
  termsText: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 13,
    textAlign: "justify",
  },
  linkText: {
    color: "rgba(107, 78, 255, 1)",
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 13,
  },
  newLineContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  errorText: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: "red",
    marginTop: 5,
  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
  },
});

export default FirstTherapistScreen;
