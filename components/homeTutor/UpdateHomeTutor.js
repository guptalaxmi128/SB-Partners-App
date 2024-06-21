import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  BackHandler
} from "react-native";
import Toast from "react-native-toast-message";
import MultiSelect from "react-native-multiple-select";
import Header from "../header/Header";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../input/Input";
import Button from "../button/Button";
import {
  getTutorQualification,
  getTutorById,
  updateHomeTutor
} from "../../action/homeTutor/homeTutor";
import { useDispatch } from "react-redux";



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

const UpdateHomeTutor = ({ navigation,route }) => {
  const dispatch = useDispatch();
const {id}=route.params;
  const [selectedSpecialisations, setSelectedSpecialisations] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [bio, setBio] = useState("");
  const [certification, setCertification] = useState("");
  const [privateSessionPerDay,setPrivateSessionPerDay]=useState('');
  const [privateSessionPerMonth,setPrivateSessionPerMonth]=useState('');
  const [groupClassPerDay,setGroupClassPerDay]=useState('');
  const [groupClassPerMonth,setGroupClassPerMonth]=useState('');

  const [yogaFor, setYogaFor] = useState([]);
  const [tutorName, setTutorName] = useState("");

//   console.log(selectedServices)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
       
        
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading1(true);
        const res = await dispatch(getTutorById(id));
        // console.log(res);
        setTutorName(res.data.homeTutorName);
        setBio(res.data.instructorBio);
        setPrivateSessionPerDay(res.data.privateSessionPrice_Day || '');
        setPrivateSessionPerMonth(res.data.privateSessionPrice_Month || '');
        setGroupClassPerDay(res.data.groupSessionPrice_Day || '');
        setGroupClassPerMonth(res.data.groupSessionPrice_Month || '');
        setSelectedLanguage(res.data.language.map(lang => language.find(item => item.name === lang)?.id));
        setSelectedSpecialisations(res.data.specilization.map(spec => specialisationItems.find(item => item.name === spec)?.id));
        setYogaFor(res.data.yogaFor.map(yoga => yogaItems.find(item => item.name === yoga)?.id));
        setSelectedServices(res.data.serviceOffered.map(service => serviceItems.find(item => item.name === service)?.id));
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

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

  const stepOneValidationSchema = Yup.object().shape({
    // certification: Yup.string().required("Certification is required"),
    bio: Yup.string().required("Bio is required"),
    specialisations: Yup.array().min(
      1,
      "At least one specialisation is required"
    ),
    services: Yup.array().min(1, "At least one service offer is required"),
    language: Yup.array().min(1, "At least one language is required"),
    yogaFor: Yup.array().min(1, "At least one select field is required"),
  });

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

        <Text style={[styles.label, { marginTop: 10 }]}>
          Service Offered <Text style={{ color: "red" }}>*</Text>
        </Text>
        <MultiSelect
          hideTags
          items={serviceItems}
          uniqueKey="id"
          onSelectedItemsChange={(val) => {
            setSelectedServices(val);
            setFieldValue("services", val);
          }}
          selectedItems={selectedServices}
          selectText="Pick Services"
          searchInputPlaceholderText="Search Services..."
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
        {touched.services && errors.services && (
          <Text style={styles.error}>{errors.services}</Text>
        )}

        {/* Conditional rendering of price input fields */}
        {selectedServices.includes("2") && ( // '2' for 'Private Session'
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
        {selectedServices.includes("1") && ( // '1' for 'Group Classes'
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
          selectText="Select"
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
              "Submit"
            )
          }
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 20 }}>
        <Header title={"Edit Home Tutor"} icon={require("../../assets/back.png")} />
      </View>
      {loading || loading1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <View style={{ paddingHorizontal: 20 }}>{renderStepOne}</View>
          <Formik
            initialValues={{
              certification: certification,
              bio: bio,
              specialisations: selectedSpecialisations,
              services: selectedServices,
              pricePerIndividualClass: privateSessionPerDay,
              pricePerMonthlyIndividualClass: privateSessionPerMonth,
              pricePerGroupClass: groupClassPerDay,
              pricePerMonthlyGroupClass: groupClassPerMonth,
              language: selectedLanguage,
              yogaFor: yogaFor,
              tutorName: tutorName,
            }}
            validationSchema={stepOneValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              const specialisations = values.specialisations.map(
                (id) => specialisationIdToName[id]
              );

              const serviceOffered = values.services.map(
                (id) => serviceIdToName[id]
              );

              const languages = values.language.map(
                (id) => languageIdToName[id]
              );
              const yogaFor = values.yogaFor.map((id) => yogaForIdToName[id]);

              const tutorData = {
                instructorBio: values.bio,
                language: languages,
                serviceOffered,
                specilization: specialisations,
                yogaFor: yogaFor,
                homeTutorName: values.tutorName,
                id
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
              dispatch(updateHomeTutor(tutorData))
                .then((res) => {
                    Toast.show({
                      type: "success",
                      text1: res.message,
                      visibilityTime: 2000,
                      autoHide: true,
                    });
                  navigation.navigate("AllHomeTutor")
                  setSubmitting(false);
                })
                .catch((error) => {
                  console.error("Error adding home tutor:", error);
                  Toast.show({
                      type: "error",
                      text1: "An error occurred. Please try again.",
                      visibilityTime: 2000,
                      autoHide: true,
                    });
                  setSubmitting(false);
                });
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
                {renderStepOne({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                  isSubmitting,
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
});

export default UpdateHomeTutor;
