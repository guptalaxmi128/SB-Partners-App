import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import CheckBox from "react-native-check-box";
import Header from "../header/Header";
import Input from "../input/Input";
import Button from "../button/Button";
import { addTherapy } from "../../action/therapist/therapist";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  therapyName: Yup.string().required("Therapy Name is required"),
  isHomeSO: Yup.boolean(),
  isStudioSO: Yup.boolean(),
  isHomePrivateClass: Yup.boolean(),
  isHomeGroupClass: Yup.boolean(),
  isStudioPrivateClass: Yup.boolean(),
  isStudioGroupClass: Yup.boolean(),
});

const AddTherapy = ({ navigation, route }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const data = [
    { key: "1", value: "Yoga Therapy" },
    { key: "2", value: "Acupressure" },
    { key: "3", value: "Reiki" },
    { key: "4", value: "Mud Therapy" },
    { key: "5", value: "Magnet Therapy" },
    { key: "6", value: "Abhyanga" },
  ];

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (!values.isHomeSO && !values.isStudioSO) {
        Toast.show({
          type: "error",
          text1: "Please select at least one service offered.",
          visibilityTime: 2000,
          autoHide: true,
        });
        return;
      }

      const therapyData = {
        therapyName: values.therapyName,
        isHomeSO: values.isHomeSO,
        isStudioSO: values.isStudioSO,
        isHomePrivateClass: values.isHomePrivateClass,
        isHomeGroupClass: values.isHomeGroupClass,
        isStudioPrivateClass: values.isStudioPrivateClass,
        isStudioGroupClass: values.isStudioGroupClass,
        id,
      };

      if (values.home_PrivateSessionPrice_Day) {
        therapyData.home_PrivateSessionPrice_Day =
          values.home_PrivateSessionPrice_Day;
      }
      if (values.home_privateSessionPrice_Month) {
        therapyData.home_privateSessionPrice_Month =
          values.home_privateSessionPrice_Month;
      }
      if (values.home_groupSessionPrice_Day) {
        therapyData.home_groupSessionPrice_Day =
          values.home_groupSessionPrice_Day;
      }
      if (values.home_groupSessionPrice_Month) {
        therapyData.home_groupSessionPrice_Month =
          values.home_groupSessionPrice_Month;
      }
      if (values.studio_PrivateSessionPrice_Day) {
        therapyData.studio_PrivateSessionPrice_Day =
          values.studio_PrivateSessionPrice_Day;
      }
      if (values.studio_privateSessionPrice_Month) {
        therapyData.studio_privateSessionPrice_Month =
          values.studio_privateSessionPrice_Month;
      }
      if (values.studio_groupSessionPrice_Day) {
        therapyData.studio_groupSessionPrice_Day =
          values.studio_groupSessionPrice_Day;
      }
      if (values.studio_groupSessionPrice_Month) {
        therapyData.studio_groupSessionPrice_Month =
          values.studio_groupSessionPrice_Month;
      }
      const res = await dispatch(addTherapy(therapyData));
      console.log(res);
      if (res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
        navigation.navigate("AllTherapist");
      } else {
        console.error("Unexpected response:", res);
      }
    } catch (error) {
      console.error("Error occurred while registering user:", error);
      Toast.show({
        type: "error",
        text1: "An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
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
      initialValues={{
        therapyName: "",
        isHomeSO: false,
        isStudioSO: false,
        isHomePrivateClass: false,
        isHomeGroupClass: false,
        isStudioPrivateClass: false,
        isStudioGroupClass: false,
        home_PrivateSessionPrice_Day: "",
        home_privateSessionPrice_Month: "",
        home_groupSessionPrice_Day: "",
        home_groupSessionPrice_Month: "",
        studio_PrivateSessionPrice_Day: "",
        studio_privateSessionPrice_Month: "",
        studio_groupSessionPrice_Day: "",
        studio_groupSessionPrice_Month: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" />
          <View style={{ paddingTop: 15 }}>
            <Header
              title={"Add Therapy"}
              icon={require("../../assets/back.png")}
            />
          </View>
          <ScrollView style={{ paddingHorizontal: 20 }}>
            <Text style={styles.labelText}>
              Therapy Name<Text style={{ color: "red" }}>*</Text>{" "}
            </Text>
            <SelectList
              setSelected={(val) => setFieldValue("therapyName", val)}
              data={data}
              save="value"
              fontFamily="Poppins"
            />
            {touched.therapyName && errors.therapyName && (
              <Text style={styles.errorText}>{errors.therapyName}</Text>
            )}

            <View style={{ paddingVertical: 10 }}>
              <Text style={styles.labelText}>Service Offered</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={[styles.switchContainer, { marginRight: 20 }]}>
                  <CheckBox
                    isChecked={values.isHomeSO}
                    onClick={() => setFieldValue("isHomeSO", !values.isHomeSO)}
                   
                  />
                  <Text style={[styles.labelText,{marginLeft:5}]}>Home </Text>
                </View>
                <View style={styles.switchContainer}>
                  <CheckBox
                    isChecked={values.isStudioSO}
                    onClick={() =>
                      setFieldValue("isStudioSO", !values.isStudioSO)
                    }
                   
                  />
                  <Text style={[styles.labelText,{marginLeft:5}]}>Clinic</Text>
                </View>
              </View>
            </View>

            {(values.isHomeSO || values.isStudioSO) && (
              <View>
                <Text style={[styles.labelText, { marginBottom: 5 }]}>
                  Individual Class
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {values.isHomeSO && (
                    <View style={[styles.switchContainer, { marginRight: 20 }]}>
                      <CheckBox
                        isChecked={values.isHomePrivateClass}
                        onClick={() =>
                          setFieldValue(
                            "isHomePrivateClass",
                            !values.isHomePrivateClass
                          )
                        }
                     
                      />
                      <Text style={[styles.labelText,{marginLeft:5}]}>At Home</Text>
                    </View>
                  )}
                  {values.isStudioSO && (
                    <View style={styles.switchContainer}>
                      <CheckBox
                        isChecked={values.isStudioPrivateClass}
                        onClick={() =>
                          setFieldValue(
                            "isStudioPrivateClass",
                            !values.isStudioPrivateClass
                          )
                        }
                     
                      />
                      <Text style={[styles.labelText,{marginLeft:5}]}>At Clinic</Text>
                    </View>
                  )}
                </View>
              </View>
            )}

            {(values.isHomeSO || values.isStudioSO) && (
              <View>
                <Text style={[styles.labelText, { marginBottom: 5 }]}>
                  Group Class
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {values.isHomeSO && (
                    <View style={[styles.switchContainer, { marginRight: 20 }]}>
                      <CheckBox
                        isChecked={values.isHomeGroupClass}
                        onClick={() =>
                          setFieldValue(
                            "isHomeGroupClass",
                            !values.isHomeGroupClass
                          )
                        }
                      
                      />
                      <Text style={[styles.labelText,{marginLeft:5}]}>At Home</Text>
                    </View>
                  )}
                  {values.isStudioSO && (
                    <View style={styles.switchContainer}>
                      <CheckBox
                        isChecked={values.isStudioGroupClass}
                        onClick={() =>
                          setFieldValue(
                            "isStudioGroupClass",
                            !values.isStudioGroupClass
                          )
                        }
                      
                      />
                      <Text style={[styles.labelText,{marginLeft:5}]}>At Clinic</Text>
                    </View>
                  )}
                </View>
              </View>
            )}

            {values.isHomeSO && values.isHomePrivateClass && (
              <>
                <Text style={[styles.labelText, { marginBottom: 5 }]}>
                  Home Individual Price
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 20, width: "45%" }}>
                    <Input
                      onChangeText={handleChange(
                        "home_PrivateSessionPrice_Day"
                      )}
                      onBlur={handleBlur("home_PrivateSessionPrice_Day")}
                      label="Per Day"
                      placeholder="Enter Price"
                      value={values.home_PrivateSessionPrice_Day}
                    />
                  </View>
                  <View style={{ width: "48%" }}>
                    <Input
                      onChangeText={handleChange(
                        "home_privateSessionPrice_Month"
                      )}
                      onBlur={handleBlur("home_privateSessionPrice_Month")}
                      label="Per Month"
                      placeholder="Enter Price"
                      value={values.home_privateSessionPrice_Month}
                    />
                  </View>
                </View>
              </>
            )}

            {values.isHomeSO && values.isHomeGroupClass && (
              <>
                <Text style={[styles.labelText, { marginBottom: 5 }]}>
                  Home Group Price
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 20, width: "45%" }}>
                    <Input
                      onChangeText={handleChange("home_groupSessionPrice_Day")}
                      onBlur={handleBlur("home_groupSessionPrice_Day")}
                      label="Per Day"
                      placeholder="Enter Price"
                      value={values.home_groupSessionPrice_Day}
                    />
                  </View>

                  <View style={{ width: "48%" }}>
                    <Input
                      onChangeText={handleChange(
                        "home_groupSessionPrice_Month"
                      )}
                      onBlur={handleBlur("home_groupSessionPrice_Month")}
                      label="Per Month"
                      placeholder="Enter Price"
                      value={values.home_groupSessionPrice_Month}
                    />
                  </View>
                </View>
              </>
            )}

            {values.isStudioSO && values.isStudioPrivateClass && (
              <>
                <Text style={[styles.labelText, { marginBottom: 5 }]}>
                  Clinic Individual Price
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 20, width: "45%" }}>
                    <Input
                      onChangeText={handleChange(
                        "studio_PrivateSessionPrice_Day"
                      )}
                      onBlur={handleBlur("studio_PrivateSessionPrice_Day")}
                      label="Per Day"
                      placeholder="Enter Price"
                      value={values.studio_PrivateSessionPrice_Day}
                    />
                  </View>
                  <View style={{ width: "48%" }}>
                    <Input
                      onChangeText={handleChange(
                        "studio_privateSessionPrice_Month"
                      )}
                      onBlur={handleBlur("studio_privateSessionPrice_Month")}
                      label="Per Month"
                      placeholder="Enter Price"
                      value={values.studio_privateSessionPrice_Month}
                    />
                  </View>
                </View>
              </>
            )}

            {values.isStudioSO && values.isStudioGroupClass && (
              <>
                <Text style={[styles.labelText, { marginBottom: 5 }]}>
                  Clinic Group Price
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 20, width: "45%" }}>
                    <Input
                      onChangeText={handleChange(
                        "studio_groupSessionPrice_Day"
                      )}
                      onBlur={handleBlur("studio_groupSessionPrice_Day")}
                      label="Per Day"
                      placeholder="Enter Price"
                      value={values.studio_groupSessionPrice_Day}
                    />
                  </View>
                  <View style={{ width: "48%" }}>
                    <Input
                      onChangeText={handleChange(
                        "studio_groupSessionPrice_Month"
                      )}
                      onBlur={handleBlur("studio_groupSessionPrice_Month")}
                      label="Per Month"
                      placeholder="Enter Price"
                      value={values.studio_groupSessionPrice_Month}
                    />
                  </View>
                </View>
              </>
            )}

            <Button
              title={
                loading ? (
                  <ActivityIndicator
                    size="small"
                    color="#ffffff"
                    style={styles.indicator}
                  />
                ) : (
                  "Save"
                )
              }
              onPress={handleSubmit}
            />
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
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  errorText: {
    color: "red",
  },
  labelText: {
    fontFamily: "Poppins",
    fontSize: 14,

  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
  },
});

export default AddTherapy;
