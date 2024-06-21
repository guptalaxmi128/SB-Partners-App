import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  BackHandler
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker, Circle } from "react-native-maps";
import Toast from "react-native-toast-message";
import MultiSelect from "react-native-multiple-select";
import CheckBox from "react-native-check-box";
import { GOOGLE_MAPS_APIKEY } from "../../apiKey/index";
import Header from "../header/Header";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../input/Input";
import Button from "../button/Button";
import {
  addHomeTutor,
  addTutorLocation,
  getTutorQualification,
} from "../../action/homeTutor/homeTutor";
import { getInstructor } from "../../action/auth/auth";
import { useDispatch } from "react-redux";

const defaultLocation = {
  latitude: 37.7749,
  longitude: -122.4194,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const distances = [
  { id: 1, label: "1 km", value: 1000 },
  { id: 2, label: "3 km", value: 3000 },
  { id: 3, label: "5 km", value: 5000 },
  { id: 4, label: "10 km", value: 10000 },
];

const specialisationItems = [
  { id: "1", name: "Hatha Yoga" },
  { id: "2", name: "Vinyasa Yoga" },
  { id: "3", name: "Ashtanga Yoga" },
  { id: "4", name: "Bikram Yoga" },
  { id: "5", name: "Kundalini Yoga" },
  { id: "6", name: "Iyengar Yoga" },
  { id: "7", name: "Yin Yoga" },
  { id: "8", name: "Restorative Yoga" },
  { id: "9", name: "Power Yoga" },
  { id: "10", name: "Yoga Therapy" },
];

const serviceItems = [
  { id: "1", name: "Group Class" },
  { id: "2", name: "Individual Class" },
];

const language = [
  { id: "1", name: "Hindi" },
  { id: "2", name: "English" },
];

const yogaItems = [
  { id: "1", name: "Yoga For Parents" },
  { id: "2", name: "Yoga For Children" },
  { id: "3", name: "Yoga For Pregnant Woman" },
];

const HomeTutor = ({ navigation }) => {
  const totalSteps = 2;
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState(defaultLocation);
  const [radius, setRadius] = useState(null);
  const [selectedSpecialisations, setSelectedSpecialisations] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [tutorId, setTutorId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [certification, setCertification] = useState("");
  const [name, setName] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [yogaFor,setYogaFor]=useState([]);
  const [tutorName,setTutorName]=useState('');

  const handleSelectDistance = (value) => {
    setRadius(value);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getInstructor());
        // console.log(res.data.qualifications);
        setBio(res.data.bio);
        setTutorName(res.data.name);
        const qualificationRes = await dispatch(
          getTutorQualification("HomeTutor")
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

  const specialisationIdToName = specialisationItems.reduce((acc, item) => {
    acc[item.id] = item.name;
    return acc;
  }, {});

  const serviceIdToName = serviceItems.reduce((acc, item) => {
    acc[item.id] = item.name;
    return acc;
  }, {});

  const languageIdToName = language.reduce((acc, item) => {
    acc[item.id] = item.name;
    return acc;
  }, {});

  
  const yogaForIdToName = yogaItems.reduce((acc, item) => {
    acc[item.id] = item.name;
    return acc;
  }, {});


  const handleLocationSelect = (data, details) => {
    // const locationName=details?.formatted_address;
    console.log(details.formatted_address);
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
    isPrivateSO: Yup.boolean(),
    isGroupSO: Yup.boolean(),
    // services: Yup.array().min(1, "At least one service offer is required"),
    language: Yup.array().min(1, "At least one language is required"),
    yogaFor:Yup.array().min(1, "At least one select field is required"),
  });

  console.log(location);

  useEffect(() => {
    // Enable submit button only if radius, name, latitude, and longitude are set and not default
    if (
      radius &&
      name &&
      location.latitude !== defaultLocation.latitude &&
      location.longitude !== defaultLocation.longitude
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [radius, name, location]);

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
          label="Instructor Bio"
          placeholder="Instructor Bio"
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

     
       
        <View style={{ paddingVertical: 10 }}>
        <Text style={styles.label}>
          Service Offered <Text style={{ color: "red" }}>*</Text>
        </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={[styles.switchContainer, { marginRight: 20 }]}>
                  <CheckBox
                    isChecked={values.isPrivateSO}
                    onClick={() => setFieldValue("isPrivateSO", !values.isPrivateSO)}
                   
                  />
                  <Text style={[styles.label,{marginLeft:5}]}>Individual </Text>
                </View>
                <View style={styles.switchContainer}>
                  <CheckBox
                    isChecked={values.isGroupSO}
                    onClick={() =>
                      setFieldValue("isGroupSO", !values.isGroupSO)
                    }
                   
                  />
                  <Text style={[styles.label,{marginLeft:5}]}>Group</Text>
                </View>
              </View>
            </View>

        {/* Conditional rendering of price input fields */}
        {values.isPrivateSO && ( // '2' for 'Private Session'
          <>
            <View style={{ marginTop: 10 }}>
              <Input
                label="Price per Individual Class"
                value={values.pricePerIndividualClass}
                onChangeText={handleChange("pricePerIndividualClass")}
                onBlur={handleBlur("pricePerIndividualClass")}
                placeholder="Enter price per individual class"
                keyboardType="numeric"
                error={
                  touched.pricePerIndividualClass &&
                  errors.pricePerIndividualClass
                }
              />
            </View>
            <Input
              label="Price per Monthly Individual Class"
              value={values.pricePerMonthlyIndividualClass}
              onChangeText={handleChange("pricePerMonthlyIndividualClass")}
              onBlur={handleBlur("pricePerMonthlyIndividualClass")}
              placeholder="Enter price per monthly individual class"
              keyboardType="numeric"
              error={
                touched.pricePerMonthlyIndividualClass &&
                errors.pricePerMonthlyIndividualClass
              }
            />
          </>
        )}
        {values.isGroupSO && ( // '1' for 'Group Classes'
          <>
            {/* <View style={{marginTop:10}}> */}
            <Input
              label="Price per Group Class"
              value={values.pricePerGroupClass}
              onChangeText={handleChange("pricePerGroupClass")}
              onBlur={handleBlur("pricePerGroupClass")}
              placeholder="Enter price per group class"
              keyboardType="numeric"
              error={touched.pricePerGroupClass && errors.pricePerGroupClass}
            />
            {/* </View> */}
            <Input
              label="Price per Monthly Group Class"
              value={values.pricePerMonthlyGroupClass}
              onChangeText={handleChange("pricePerMonthlyGroupClass")}
              onBlur={handleBlur("pricePerMonthlyGroupClass")}
              placeholder="Enter price per monthly group class"
              keyboardType="numeric"
              error={
                touched.pricePerMonthlyGroupClass &&
                errors.pricePerMonthlyGroupClass
              }
            />
          </>
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

        <Text style={[styles.label, { marginTop: 10 }]}>
          Yoga For <Text style={{ color: "red" }}>*</Text>
        </Text>
        <MultiSelect
          hideTags
          items={yogaItems}
          uniqueKey="id"
          onSelectedItemsChange={(val) => {
            setYogaFor(val);
            setFieldValue("yogaFor", val);
          }}
          selectedItems={yogaFor}
          selectText="Pick Select"
          searchInputPlaceholderText="Search..."
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
        {touched.yogaFor && errors.yogaFor && (
          <Text style={styles.error}>{errors.yogaFor}</Text>
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
              borderColor: touched.location && errors.location ? "red" : "#000",
              borderWidth: 1,
              height: 40,
              borderRadius: 5,
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
      {touched.location && errors.location && (
        <Text style={styles.error}>{errors.location}</Text>
      )}

      {location && (
        <View>
          <MapView style={styles.map} region={location}>
            <Marker coordinate={location} />
            <Circle
              center={location}
              radius={radius}
              fillColor="rgba(135,206,250,0.5)"
              strokeColor="rgba(135,206,250,1)"
            />
          </MapView>
        </View>
      )}
      <FlatList
        data={distances}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.distanceButton,
              item.value === radius
                ? styles.selectedDistanceButton
                : styles.unselectedDistanceButton,
            ]}
            onPress={() => handleSelectDistance(item.value)}
          >
            <Text
              style={[
                styles.distanceButtonText,
                item.value === radius
                  ? styles.selectedDistanceButtonText
                  : styles.unselectedDistanceButtonText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.distanceList}
      />
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
        <Header title={"Home Tutor"} icon={require("../../assets/back.png")} />
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
              // services: selectedServices,
              pricePerIndividualClass: "",
              pricePerMonthlyIndividualClass: "",
              pricePerGroupClass: "",
              pricePerMonthlyGroupClass: "",
              language: selectedLanguage,
              yogaFor:yogaFor,
              tutorName:tutorName,
              isPrivateSO: false,
              isGroupSO: false,
            }}
            validationSchema={
              step === 1 ? stepOneValidationSchema : stepTwoValidationSchema
            }
            onSubmit={(values, { setSubmitting }) => {
              if (step === 1) {
                // Submit Step 1 data
                if (!values.isPrivateSO && !values.isGroupSO) {
        Toast.show({
          type: "error",
          text1: "Please select at least one service offered.",
          visibilityTime: 2000,
          autoHide: true,
        });
        return;
      }
                const specialisations = values.specialisations.map(
                  (id) => specialisationIdToName[id]
                );

             
                const languages = values.language.map(
                  (id) => languageIdToName[id]
                );
                const yogaFor = values.yogaFor.map(
                  (id) => yogaForIdToName[id]
                );

                const tutorData = {
                  instructorBio: values.bio,
                  language: languages,
                  isPrivateSO:values.isPrivateSO,
                  isGroupSO:values.isGroupSO,
                  specilization: specialisations,
                  yogaFor:yogaFor,
                  homeTutorName:values.tutorName
                };

                if (
                  values.pricePerIndividualClass !== undefined &&
                  values.pricePerIndividualClass !== ""
                ) {
                  tutorData.privateSessionPrice_Day =
                    values.pricePerIndividualClass;
                }

                if (
                  values.pricePerMonthlyIndividualClass !== undefined &&
                  values.pricePerMonthlyIndividualClass !== ""
                ) {
                  tutorData.privateSessionPrice_Month =
                    values.pricePerMonthlyIndividualClass;
                }

                if (
                  values.pricePerGroupClass !== undefined &&
                  values.pricePerGroupClass !== ""
                ) {
                  tutorData.groupSessionPrice_Day = values.pricePerGroupClass;
                }

                if (
                  values.pricePerMonthlyGroupClass !== undefined &&
                  values.pricePerMonthlyGroupClass !== ""
                ) {
                  tutorData.groupSessionPrice_Month =
                    values.pricePerMonthlyGroupClass;
                }
                console.log(tutorData);
                dispatch(addHomeTutor(tutorData))
                  .then((response) => {
                    console.log(response);
                    setTutorId(response.data.homeTutorId); // assuming response.data.id is the new tutor's ID
                    Toast.show({
                      type: "success",
                      text1: res.message,
                      visibilityTime: 2000,
                      autoHide: true,
                    });
                    setStep(2); 
                    setSubmitting(false);
                  })
                  .catch((error) => {
                    console.error("Error adding home tutor:", error);
                    setSubmitting(false);
                  });
              } else {
                // Submit Step 2 data

                const locationData = {
                  id: tutorId,
                  latitude: String(location.latitude),
                  longitude: String(location.longitude),
                  locationName: name,
                  radius: String(radius),
                  unit: "km",
                };
                console.log(locationData);
                dispatch(addTutorLocation(locationData))
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
    backgroundColor: "#5F33E1",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default HomeTutor;
