import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import Toast from "react-native-toast-message";
import MultiSelect from "react-native-multiple-select";
import { GOOGLE_MAPS_APIKEY } from "../../apiKey/index";
import Header from "../header/Header";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../input/Input";
import Button from "../button/Button";
import { getTutorQualification } from "../../action/homeTutor/homeTutor";
import { getInstructor } from "../../action/auth/auth";
import { useDispatch } from "react-redux";
import { addTherapist } from "../../action/therapist/therapist";

const defaultLocation = {
  latitude: 37.7749,
  longitude: -122.4194,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const specialisationItems = [
  { id: "1", name: "Cognitive Behavioral Therapy (CBT)" },
  { id: "2", name: "Dialectical Behavior Therapy (DBT)" },
  { id: "3", name: "Psychodynamic Therapy" },
  { id: "4", name: "Humanistic Therapy" },
  { id: "5", name: "Mindfulness-Based Cognitive Therapy (MBCT)" },
  { id: "6", name: "Eye Movement Desensitization and Reprocessing (EMDR)" },
  { id: "7", name: "Family Therapy" },
  { id: "8", name: "Group Therapy" },
  { id: "9", name: "Art Therapy" },
  { id: "10", name: "Play Therapy" },
  { id: "11", name: "Solution-Focused Brief Therapy (SFBT)" },
  { id: "12", name: "Acceptance and Commitment Therapy (ACT)" },
  { id: "13", name: "Couples Therapy" },
  { id: "14", name: "Trauma-Focused Therapy" },
  { id: "15", name: "Narrative Therapy" },
];

const language = [
  { id: "1", name: "Hindi" },
  { id: "2", name: "English" },
];

const Therapist = ({ navigation }) => {
  const totalSteps = 2;
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState(defaultLocation);

  const [selectedSpecialisations, setSelectedSpecialisations] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState([]);

  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [certification, setCertification] = useState("");
  const [name, setName] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [therapistData, setTherapistData] = useState(null);
  const [therapistName, setTherapistName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getInstructor());
        // console.log(res.data.qualifications);
        setBio(res.data.bio);
        setTherapistName(res.data.name);
        const qualificationRes = await dispatch(
          getTutorQualification("Therapy")
        );
        setCertification(qualificationRes.data[0].documentOriginalName);
      } catch (error) {
        console.error("Error fetching data:", error);
        const msg =
          error.response?.data?.message ||
          "An error occurred. Please try again.";
        Toast.show({
          type: "error",
          text1: msg,
          visibilityTime: 2000,
          autoHide: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

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

  const specialisationIdToName = specialisationItems.reduce((acc, item) => {
    acc[item.id] = item.name;
    return acc;
  }, {});

  const languageIdToName = language.reduce((acc, item) => {
    acc[item.id] = item.name;
    return acc;
  }, {});

  const handleLocationSelect = (data, details) => {
    // const locationName=details?.formatted_address;
    // console.log(details);
    const { lat, lng } = details.geometry.location;
    setLocation({
      latitude: parseFloat(lat.toFixed(7)),
      longitude: parseFloat(lng.toFixed(7)),
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
    setName(details.formatted_address);
  };

  const renderProgressBar = () => {
    return (
      <View style={styles.progressContainer}>
        {/* Progress Bar */}
        {[...Array(totalSteps)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressBar,
              index < step ? styles.progressBarActive : null,
            ]}
          />
        ))}
      </View>
    );
  };

  const stepOneValidationSchema = Yup.object().shape({
    // certification: Yup.string().required("Certification is required"),
    bio: Yup.string().required("Bio is required"),
    specialisations: Yup.array().min(
      1,
      "At least one specialisation is required"
    ),

    language: Yup.array().min(1, "At least one language is required"),
    pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^\d{6}$/, "Pincode must be exactly 6 digits"),
  });

  console.log(location);

  useEffect(() => {
    // Enable submit button only if radius, name, latitude, and longitude are set and not default
    if (
      name &&
      location.latitude !== defaultLocation.latitude &&
      location.longitude !== defaultLocation.longitude
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [name, location]);

  const stepTwoValidationSchema = Yup.object().shape({});

  const renderStepOne = ({
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
  }) => (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.stepContainer}>
        <Input
          label="Certification / Qualification"
          value={values.certification}
          // onChangeText={handleChange("certification")}
          // onBlur={handleBlur("certification")}
          placeholder="Enter your certification"
          error={touched.certification && errors.certification}
          isRequired={true}
        />
        <Input
          onChangeText={handleChange("bio")}
          onBlur={handleBlur("bio")}
          value={values.bio}
          multiline={true}
          numberOfLines={4}
          isRequired={true}
          label="Therapist Bio"
          placeholder="Therapist Bio"
          error={touched.bio && errors.bio}
          style={{ textAlignVertical: "top", padding: 12 }}
        />
        <Text style={styles.label}>
          Specialisations <Text style={{ color: "red" }}>*</Text>
        </Text>

        <MultiSelect
          hideTags
          items={specialisationItems}
          uniqueKey="id"
          onSelectedItemsChange={(val) => {
            setSelectedSpecialisations(val);
            setFieldValue("specialisations", val);
          }}
          selectedItems={selectedSpecialisations}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          altFontFamily="Poppins"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: "#CCC" }}
          submitButtonColor="#CCC"
          submitButtonText="Add"
          styleInputGroup={{
            padding: 8,
          }}
          styleDropdownMenu={{ columnGap: 8 }}
          styleMainWrapper={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 10,
            paddingHorizontal: 10,
            // paddingTop: 10,
          }}
        />
        {touched.specialisations && errors.specialisations && (
          <Text style={styles.error}>{errors.specialisations}</Text>
        )}

        <Text style={[styles.label, { marginTop: 10 }]}>
          Languages <Text style={{ color: "red" }}>*</Text>
        </Text>
        <MultiSelect
          hideTags
          items={language}
          uniqueKey="id"
          onSelectedItemsChange={(val) => {
            setSelectedLanguage(val);
            setFieldValue("language", val);
          }}
          selectedItems={selectedLanguage}
          selectText="Pick Languages"
          searchInputPlaceholderText="Search Languages..."
          altFontFamily="Poppins"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: "#CCC" }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
          styleInputGroup={{
            padding: 8,
          }}
          styleDropdownMenu={{ columnGap: 8 }}
          styleMainWrapper={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 10,
            paddingHorizontal: 10,
            // paddingTop: 10,
          }}
        />
        {touched.language && errors.language && (
          <Text style={styles.error}>{errors.language}</Text>
        )}

        <View style={{ marginTop: 10 }}>
          <Input
            label="Pincode"
            value={values.pincode}
            onChangeText={handleChange("pincode")}
            onBlur={handleBlur("pincode")}
            placeholder="Enter Pincode"
            // error={touched.pincode && errors.pincode}
            isRequired={true}
          />
          {touched.pincode && errors.pincode && (
            <Text style={styles.error}>{errors.pincode}</Text>
          )}
        </View>

        <Button
          title={
            isSubmitting ? (
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
  );

  const renderStepTwo = ({
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
  }) => (
    <View style={styles.stepContainer}>
      <View style={styles.autocompleteContainer}>
        <Text style={styles.label}>Location</Text>
        <GooglePlacesAutocomplete
          placeholder="Search by location"
          onPress={handleLocationSelect}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          fetchDetails={true}
          textInputProps={{
            style: {
              borderColor: "gray",
              borderWidth: 1,
              height: 50,
              borderRadius: 10,
              paddingHorizontal: 10,
              width: "100%",
            },
          }}
          styles={{
            container: { flex: 0 },
            listView: { zIndex: 1000 },
          }}
        />
      </View>

      {location && (
        <View>
          <MapView style={styles.map} region={location}>
            <Marker coordinate={location} />
          </MapView>
        </View>
      )}

      <Button
        title={
          isSubmitting ? (
            <ActivityIndicator
              size="small"
              color="#ffffff"
              style={styles.indicator}
            />
          ) : (
            "Submit"
          )
        }
        onPress={handleSubmit}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 15 }}>
        <Header title={"Therapist"} icon={require("../../assets/back.png")} />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <View style={{ paddingHorizontal: 20 }}>{renderProgressBar()}</View>
          <Formik
            initialValues={{
              certification: certification,
              bio: bio,
              specialisations: selectedSpecialisations,
              language: selectedLanguage,
              therapistName: therapistName,
              pincode: "",
            }}
            validationSchema={
              step === 1 ? stepOneValidationSchema : stepTwoValidationSchema
            }
            onSubmit={(values, { setSubmitting }) => {
              if (step === 1) {
                // Submit Step 1 data
                const specialisations = values.specialisations.map(
                  (id) => specialisationIdToName[id]
                );

                const languages = values.language.map(
                  (id) => languageIdToName[id]
                );

                const therapist = {
                  instructorBio: values.bio,
                  language: languages,
                  specilization: specialisations,
                  therapistName: values.therapistName,
                  pincode: values.pincode,
                };
                setSubmitting(true);
                setTherapistData(therapist);

                setStep(2); // Move to step 2
                setSubmitting(false);
              } else {
                // Submit Step 2 data
               
                const locationData = {
                  latitude: String(location.latitude),
                  longitude: String(location.longitude),
                  studioLocation: name,
                };
                setSubmitting(true);
                const combinedData = {
                  ...therapistData,
                  ...locationData,
                };
                console.log(combinedData);
                dispatch(addTherapist(combinedData))
                  .then((res) => {
                    console.log(res);
                    Toast.show({
                      type: "success",
                      text1: res.message,
                      visibilityTime: 2000,
                      autoHide: true,
                    });

                    setSubmitting(false);
                    navigation.navigate("Home");
                  })
                  .catch((error) => {
                    console.error("Error adding tutor location:", error);
                    Toast.show({
                      type: "error",
                      text1: "An error occurred. Please try again.",
                      visibilityTime: 2000,
                      autoHide: true,
                    });
                    setSubmitting(false);
                  });
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              isSubmitting,
            }) => (
              <View style={{ flex: 1 }}>
                {step === 1
                  ? renderStepOne({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                      touched,
                      setFieldValue,
                      isSubmitting,
                    })
                  : renderStepTwo({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                      touched,
                    })}
              </View>
            )}
          </Formik>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  stepContainer: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  input: {
    // borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    fontFamily: "Poppins",
    color: "#000",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  autocompleteContainer: {
    zIndex: 1,
    width: "100%",
    marginVertical: 10,
  },
  map: {
    width: "100%",
    height: 300,
    marginVertical: 20,
  },
  distanceButton: {
    padding: 10,
    height: 40,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  selectedDistanceButton: {
    backgroundColor: "rgba(102, 42, 178, 1)",
    borderColor: "rgba(102, 42, 178, 1)",
  },
  unselectedDistanceButton: {
    backgroundColor: "#fff",
    borderColor: "lightgray",
  },
  distanceButtonText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Poppins",
  },
  selectedDistanceButtonText: {
    color: "#fff",
  },
  unselectedDistanceButtonText: {
    color: "#000",
  },
  distanceList: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  progressBar: {
    backgroundColor: "#ccc",
    height: 5,
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 5,
  },
  progressBarActive: {
    backgroundColor: "rgba(102, 42, 178, 1)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Therapist;
