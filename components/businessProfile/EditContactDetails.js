import React, { useState, useEffect } from "react";
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
import Toast from "react-native-toast-message";
import PhoneInput from "react-native-phone-number-input";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import Header from "../header/Header";
import Input from "../input/Input";
import Button from "../button/Button";
import {
  getYogaStudioById,
  updateStudioStepFirst,
} from "../../action/yogaStudio/yogaStudio";
import { useDispatch } from "react-redux";

const EditContactDetails = ({ route ,navigation }) => {
  const dispatch = useDispatch();
  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const [contactId, setContactId] = useState("");
  const [initialValues, setInitialValues] = useState({
    title: "",
    contactPerson: "",
    mobileNumbers: [""],
    whatsAppNumbers: [""],
    landlineNumbers: [""],
    emails: [""],
  });

  //   console.log("id",id)
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getYogaStudioById(id));
        const contactDetails = res.data.contacts;
        setContactId(contactDetails.id);
        setInitialValues({
          title: contactDetails.title || "",
          contactPerson: contactDetails.person || "",
          mobileNumbers: contactDetails.mobileNumber || [""],
          whatsAppNumbers: contactDetails.whatsAppNumber || [""],
          landlineNumbers: contactDetails.landLineNumber || [""],
          emails: contactDetails.email || [""],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);
  //   console.log(id)

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    contactPerson: Yup.string().required("Contact Person is required"),
    mobileNumbers: Yup.array()
      .of(Yup.string().required("Mobile Number is required"))
      .min(1, "At least one mobile number is required"),
    emails: Yup.array()
      .of(Yup.string().email("Invalid email").required("Email is required"))
      .min(1, "At least one email is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
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
        id: contactId,
        // landLineNumber: values.landlineNumbers.filter((number) => number),
      };
      // Add WhatsApp numbers if present
      if (sanitizedWhatsAppNumbers.some((number) => number)) {
        data.whatsAppNumber = sanitizedWhatsAppNumbers;
      }
      if (sanitizedLandLineNumbers.some((number) => number)) {
        data.landLineNumber = sanitizedLandLineNumbers;
      }
      console.log(data);
      const res = await dispatch(updateStudioStepFirst(data));
      if (res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      } else if (res.data && res.data.message) {
        console.log(res.data.message);
      } else {
        console.error("Unexpected response:", res);
      }
    } catch (error) {
      console.error("Error occurred while updating:", error);
      Toast.show({
        type: "error",
        text1: "An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

 

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 20 }}>
        <Header
          title={"Edit Contact Details"}
          icon={require("../../assets/back.png")}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View style={{ paddingVertical: 5 }}>
          <View style={{ flex: 1, marginVertical: 10 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={handleSubmit}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
                isSubmitting,
              }) => (
                <View>
                  <Text style={styles.textHeading}>Add Contact Details</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flex: 0.3, marginRight: 10 }}>
                      <Input
                        // onChangeText={handleChange("contactPerson")}
                        onBlur={handleBlur("title")}
                        label="Title"
                        placeholder="Select"
                        value={values.title}
                        error={errors.title && touched.title}
                        isRequired={true}
                      />
                    </View>
                    <View style={{ flex: 0.8 }}>
                      <Input
                        // onChangeText={handleChange("contactPerson")}
                        onBlur={handleBlur("contactPerson")}
                        label="Contact Person"
                        placeholder="Contact Person"
                        value={values.contactPerson}
                        error={errors.contactPerson && touched.contactPerson}
                        isRequired={true}
                      />
                    </View>
                  </View>

                  <FieldArray name="mobileNumbers">
                    {({ push, remove }) => (
                      <View style={{ marginTop: 10 }}>
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
                              onChangeFormattedText={handleChange(
                                `mobileNumbers[${index}]`
                              )}
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
                      </View>
                    )}
                  </FieldArray>

                  <FieldArray name="whatsAppNumbers">
                    {({ push, remove }) => (
                      <View>
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
                              onChangeFormattedText={handleChange(
                                `whatsAppNumbers[${index}]`
                              )}
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
                      </View>
                    )}
                  </FieldArray>

                  <FieldArray name="landlineNumbers">
                    {({ push, remove }) => (
                      <View>
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
                              onChangeFormattedText={handleChange(
                                `landlineNumbers[${index}]`
                              )}
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
                      </View>
                    )}
                  </FieldArray>

                  <FieldArray name="emails">
                    {({ push, remove }) => (
                      <View>
                        {values.emails.map((email, index) => (
                          <View key={index}>
                            <Input
                              onChangeText={handleChange(`emails[${index}]`)}
                              onBlur={handleBlur(`emails[${index}]`)}
                              label={`Email ${index + 1}`}
                              placeholder="Email"
                              value={email}
                              error={
                                errors.emails &&
                                errors.emails[index] &&
                                touched.emails &&
                                touched.emails[index]
                              }
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
                      </View>
                    )}
                  </FieldArray>

                  <Button
                    title={
                      isSubmitting ? (
                        <ActivityIndicator
                          size="small"
                          color="#ffffff"
                          style={styles.indicator}
                        />
                      ) : (
                        "Update"
                      )
                    }
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default EditContactDetails;
