import React, { useState ,useEffect} from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  BackHandler
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SelectList } from "react-native-dropdown-select-list";
import PhoneInput from "react-native-phone-number-input";
import Toast from "react-native-toast-message";
import Header from "../header/Header";
import Input from "../input/Input";
import Button from "../button/Button";
import { studioStepFirst } from "../../action/yogaStudio/yogaStudio";
import { useDispatch } from "react-redux";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";

const AddBusinessContact = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { id } = route.params;
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    contactPerson: Yup.string().required("Contact person is required"),
    mobileNumbers: Yup.array().of(
      Yup.string().required("Mobile number is required")
    ),
    emails: Yup.array().of(
      Yup.string().email("Invalid email").required("Email is required")
    ),
  });

  const initialValues = {
    title: "",
    contactPerson: "",
    mobileNumbers: [""],
    whatsAppNumbers: [""],
    landlineNumbers: [""],
    emails: [""],
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
  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      const sanitizedMobileNumbers = values.mobileNumbers.map((number) => {
        return number.replace(/\D/g, "").replace(/^91/, "");
      });
      const sanitizedWhatsAppNumbers = values.whatsAppNumbers.map((number) => {
        return number.replace(/\D/g, "").replace(/^91/, "");
      });
      const sanitizedLandLineNumbers = values.landlineNumbers.map((number) => {
        return number.replace(/\D/g, "").replace(/^91/, "");
      });
      const data = {
        title: values.title,
        person: values.contactPerson,
        mobileNumber: sanitizedMobileNumbers,
        email: values.emails,
        businessId: id,
      };
      if (sanitizedWhatsAppNumbers.some((number) => number)) {
        data.whatsAppNumber = sanitizedWhatsAppNumbers;
      }
      if (sanitizedLandLineNumbers.some((number) => number)) {
        data.landLineNumber = sanitizedLandLineNumbers;
      }
      console.log(data);
      const res = await dispatch(studioStepFirst(data));
      console.log(res);
      if (res.success) {
        Toast.show({
            type: "success",
            text1: res.message,
            visibilityTime: 2000,
            autoHide: true,
          });
          navigation.navigate("Home")
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

  const title = [
    { key: "1", value: "Mr." },
    { key: "2", value: "Miss" },
    { key: "3", value: "Mrs." },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
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
              title={"Add Contact Details"}
              icon={require("../../assets/back.png")}
            />
          </View>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
          >
            <View >
              <View style={{ flex: 1 }}>
                <View>
                  <Text style={styles.textHeading}>Add Contact Details</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flex: 0.3, marginRight: 10 }}>
                      <Text style={styles.label}>Title</Text>
                      <SelectList
                        setSelected={(text) =>
                          setFieldValue("title", text)
                        }
                        data={title}
                        save="value"
                        fontFamily="Poppins"
                        placeholder="Select"
                        containerStyle={{ width: wp(40) }}
                        onBlur={handleBlur("title")}
                      />
                      {touched.title && errors.title && (
                        <Text style={styles.errorText}>{errors.title}</Text>
                      )}
                    </View>
                    <View style={{ flex: 0.8 }}>
                      <Input
                        onChangeText={handleChange("contactPerson")}
                        onBlur={handleBlur("contactPerson")}
                        label="Contact Person"
                        placeholder="Contact Person"
                        value={values.contactPerson}
                        error={touched.contactPerson && errors.contactPerson}
                      />
                    </View>
                  </View>

                  <FieldArray name="mobileNumbers">
                    {({ push, remove }) => (
                      <>
                        {values.mobileNumbers.map((mobile, index) => (
                          <View key={index}>
                            <Text style={styles.label}>
                              Mobile Number {index + 1}
                            </Text>
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
                              value={mobile}
                              onChangeFormattedText={(text) =>
                                setFieldValue(`mobileNumbers[${index}]`, text)
                              }
                              onBlur={handleBlur(`mobileNumbers[${index}]`)}
                            />
                            {touched.mobileNumbers &&
                              errors.mobileNumbers &&
                              errors.mobileNumbers[index] && (
                                <Text style={styles.errorText}>
                                  {errors.mobileNumbers[index]}
                                </Text>
                              )}
                            {index > 0 && (
                              <TouchableOpacity
                                onPress={() => remove(index)}
                                style={{ marginTop: 8 }}
                              >
                                <Text
                                  style={[
                                    styles.label,
                                    {
                                      color: "rgba(102, 42, 178, 1)",
                                      marginVertical: 8,
                                    },
                                  ]}
                                >
                                  - Remove Mobile Number
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        ))}
                        <TouchableOpacity
                          onPress={() => push("")}
                          style={{ marginTop: 8 }}
                        >
                          <Text
                            style={[
                              styles.label,
                              {
                                color: "rgba(102, 42, 178, 1)",
                                marginVertical: 8,
                              },
                            ]}
                          >
                            + Add Mobile Number
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </FieldArray>

                  <FieldArray name="whatsAppNumbers">
                    {({ push, remove }) => (
                      <>
                        {values.whatsAppNumbers.map((whatsApp, index) => (
                          <View key={index}>
                            <Text style={styles.label}>
                              WhatsApp Number {index + 1}
                            </Text>
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
                              value={whatsApp}
                              onChangeFormattedText={(text) =>
                                setFieldValue(`whatsAppNumbers[${index}]`, text)
                              }
                              onBlur={handleBlur(`whatsAppNumbers[${index}]`)}
                            />
                            {touched.whatsAppNumbers &&
                              errors.whatsAppNumbers &&
                              errors.whatsAppNumbers[index] && (
                                <Text style={styles.errorText}>
                                  {errors.whatsAppNumbers[index]}
                                </Text>
                              )}
                            {index > 0 && (
                              <TouchableOpacity
                                onPress={() => remove(index)}
                                style={{ marginTop: 8 }}
                              >
                                <Text
                                  style={[
                                    styles.label,
                                    {
                                      color: "rgba(102, 42, 178, 1)",
                                      marginVertical: 8,
                                    },
                                  ]}
                                >
                                  - Remove WhatsApp Number
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        ))}
                        <TouchableOpacity
                          onPress={() => push("")}
                          style={{ marginTop: 8 }}
                        >
                          <Text
                            style={[
                              styles.label,
                              {
                                color: "rgba(102, 42, 178, 1)",
                                marginVertical: 8,
                              },
                            ]}
                          >
                            + Add WhatsApp Number
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </FieldArray>

                  <FieldArray name="landlineNumbers">
                    {({ push, remove }) => (
                      <>
                        {values.landlineNumbers.map((landline, index) => (
                          <View key={index}>
                            <Text style={styles.label}>
                              Landline Number {index + 1}
                            </Text>
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
                              value={landline}
                              onChangeFormattedText={(text) =>
                                setFieldValue(`landlineNumbers[${index}]`, text)
                              }
                              onBlur={handleBlur(`landlineNumbers[${index}]`)}
                            />
                            {touched.landlineNumbers &&
                              errors.landlineNumbers &&
                              errors.landlineNumbers[index] && (
                                <Text style={styles.errorText}>
                                  {errors.landlineNumbers[index]}
                                </Text>
                              )}
                            {index > 0 && (
                              <TouchableOpacity
                                onPress={() => remove(index)}
                                style={{ marginTop: 8 }}
                              >
                                <Text
                                  style={[
                                    styles.label,
                                    {
                                      color: "rgba(102, 42, 178, 1)",
                                      marginVertical: 8,
                                    },
                                  ]}
                                >
                                  - Remove Landline Number
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        ))}
                        <TouchableOpacity
                          onPress={() => push("")}
                          style={{ marginTop: 8 }}
                        >
                          <Text
                            style={[
                              styles.label,
                              {
                                color: "rgba(102, 42, 178, 1)",
                                marginVertical: 8,
                              },
                            ]}
                          >
                            + Add Landline Number
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </FieldArray>

                  <FieldArray name="emails">
                    {({ push, remove }) => (
                      <>
                        {values.emails.map((email, index) => (
                          <View key={index}>
                            <Input
                              onChangeText={handleChange(`emails[${index}]`)}
                              onBlur={handleBlur(`emails[${index}]`)}
                              label={`Email ${index + 1}`}
                              placeholder="Email"
                              value={email}
                              error={touched.emails && errors.emails && errors.emails[index]}
                            />
                            {index > 0 && (
                              <TouchableOpacity
                                onPress={() => remove(index)}
                                style={{ marginTop: 8 }}
                              >
                                <Text
                                  style={[
                                    styles.label,
                                    {
                                      color: "rgba(102, 42, 178, 1)",
                                      marginVertical: 8,
                                    },
                                  ]}
                                >
                                  - Remove Email
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        ))}
                        <TouchableOpacity
                          onPress={() => push("")}
                          style={{ marginTop: 8 }}
                        >
                          <Text
                            style={[
                              styles.label,
                              {
                                color: "rgba(102, 42, 178, 1)",
                                marginVertical: 8,
                              },
                            ]}
                          >
                            + Add Email
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </FieldArray>

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
                </View>
              </View>
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
  },
  textHeading: {
    fontFamily: "Poppins",
    fontSize: hp(2.5),
    fontWeight: "500",
    marginVertical: 10,
  },
  label: {
    fontSize: hp(2),
    fontFamily: "Poppins",
  },
  errorText: {
    marginTop: 7,
    color: "red",
    fontSize: hp(1.6),
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

export default AddBusinessContact;
