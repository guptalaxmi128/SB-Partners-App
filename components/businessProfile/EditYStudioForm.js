import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  StatusBar
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import Toast from "react-native-toast-message";
import { GOOGLE_MAPS_APIKEY } from "../../apiKey/index";
import { SelectList } from "react-native-dropdown-select-list";
import { Formik } from "formik";
import * as Yup from "yup";
import Header from "../header/Header";
import Input from "../input/Input";
import Button from "../button/Button";
import {
  getYogaStudioById,
  updateYogaStudio,
} from "../../action/yogaStudio/yogaStudio";
import { useDispatch } from "react-redux";

const EditYStudioForm = ({ route,navigation }) => {
  const dispatch = useDispatch();
  const { id } = route.params;
  const totalSteps = 2;
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");

  const [initialValues, setInitialValues] = useState({
    businessName: "",
    pincode: "",
    blockNumberBuildingName: "",
    streetColonyName: "",
    area: "",
    landmark: "",
    // city: "",
    state: "",
  });

   const handleLocationSelect = (data, details) => {
    // const locationName=details?.formatted_address;
    console.log(details);
    const { lat, lng } = details.geometry.location;
    setLocation({
      latitude: parseFloat(lat.toFixed(7)),
      longitude: parseFloat(lng.toFixed(7)),
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
    setCity(details.formatted_address);
  };

  const nextStep = () => {
    setCurrentStep((prevStep) =>
      prevStep < totalSteps ? prevStep + 1 : prevStep
    );
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

  const validationSchema = Yup.object().shape({
    businessName: Yup.string().required("Please enter business name"),
    pincode: Yup.string().required("Please enter pincode"),
    blockNumberBuildingName: Yup.string().required(
      "Please enter block number/building name"
    ),
    streetColonyName: Yup.string().required("Please enter street/colony name"),
    area: Yup.string().required("Please select area"),

  });

  const step2ValidationSchema = Yup.object().shape({
    city: Yup.string().required("Please enter city"),
    state: Yup.string().required("Please enter state"),
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getYogaStudioById(id));
        if (res.data) {
          setInitialValues({
            businessName: res.data.businessName || "",
            pincode: res.data.pincode || "",
            blockNumberBuildingName: res.data.block_building || "",
            streetColonyName: res.data.street_colony || "",
            area: res.data.area || "",
            landmark: res.data.landmark || "",
            state: res.data.state || "",
          });
          setLocation({
            latitude: res.data.latitude,
            longitude:res.data.longitude ,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
          setCity(res.data.city || '');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const validate = async () => {
    let isValid = true;
 

    if (isValid) {
      nextStep();
    } else {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const data = {
        businessName: initialValues.businessName,
        pincode: initialValues.pincode,
        block_building: initialValues.blockNumberBuildingName,
        street_colony: initialValues.streetColonyName,
        area: initialValues.area,
        city: city,
        state: initialValues.state,
        longitude:String(location.longitude),
        latitude:String(location.latitude),
        id,
      };
      if (initialValues.landmark) {
        data.landmark = initialValues.landmark;
      }
      console.log(data);

      const res = await dispatch(updateYogaStudio(data));
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
      console.error("Error occurred while registering user:", error);
      const msg = error.response.data?.message;
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      default:
        return null;
    }
  };

  console.log(city)
  const renderStep1 = () => {
    return (
      <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
    >
      <View style={{ flex: 1, marginVertical: 10 }}>
        <Text style={styles.textHeading}>Enter Your Business Details</Text>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={validate}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View>
              <Input
                onChangeText={handleChange("businessName")}
                onBlur={handleBlur("businessName")}
                value={values.businessName}
                label="Business Name"
                placeholder="Business Name"
                error={touched.businessName && errors.businessName}
                isRequired={true}
              />
              <Input
                onChangeText={handleChange("pincode")}
                onBlur={handleBlur("pincode")}
                value={values.pincode}
                label="Pincode"
                placeholder="Pincode"
                isRequired={true}
                error={touched.pincode && errors.pincode}
              />
              <Input
                onChangeText={handleChange("blockNumberBuildingName")}
                onBlur={handleBlur("blockNumberBuildingName")}
                value={values.blockNumberBuildingName}
                label="Block Number / Building Name"
                placeholder="Block Number / Building Name"
                error={
                  touched.blockNumberBuildingName &&
                  errors.blockNumberBuildingName
                }
                isRequired={true}
              />
              <Input
                onChangeText={handleChange("streetColonyName")}
                onBlur={handleBlur("streetColonyName")}
                value={values.streetColonyName}
                label="Street / Colony Name"
                placeholder="Street / Colony Name"
                error={touched.streetColonyName && errors.streetColonyName}
                isRequired={true}
              />
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.label}>
                  Area<Text style={{ color: "red" }}>*</Text>
                </Text>
                <SelectList
                  setSelected={(val) => setFieldValue("area", val)}
                  data={[
                    { key: "1", value: "Area1" },
                    { key: "2", value: "Area2" },
                  ]}
                  save="value"
                  value={values.area}
                  defaultOption={{ key: values.area, value: values.area }}
                  fontFamily="Poppins"
                  onFocus={() => handleBlur("area")}
                />
                {touched.area && errors.area && (
                  <Text style={styles.errorText}>{errors.area}</Text>
                )}
              </View>
              <Input
                onChangeText={handleChange("landmark")}
                onBlur={handleBlur("landmark")}
                value={values.landmark}
                label="Landmark"
                placeholder="Landmark"
              />
              {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 0.48 }}>
                  <Input
                    onChangeText={handleChange("city")}
                    onBlur={handleBlur("city")}
                    value={values.city}
                    label="City"
                    placeholder="City"
                    error={touched.city && errors.city}
                    isRequired={true}
                  />
                </View>
                <View style={{ flex: 0.48 }}>
                  <Input
                    onChangeText={handleChange("state")}
                    onBlur={handleBlur("state")}
                    value={values.state}
                    label="State"
                    placeholder="State"
                    isRequired={true}
                    error={touched.state && errors.state}
                  />
                </View>
              </View> */}
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
          )}
        </Formik>
      </View>
    </ScrollView>
    );
  };

  const renderStep2 = () => {
    return (
      <View style={styles.stepContainer}>
        <Formik
          enableReinitialize
          initialValues={{ city: city, state: initialValues.state }}
          validationSchema={step2ValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <View style={styles.autocompleteContainer}>
                <Text style={styles.label}>City</Text>
                <GooglePlacesAutocomplete
                  placeholder="Search by location"
                  onPress={(data, details) => {
                    handleLocationSelect(data, details);
                   
                  }}
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
                {touched.city && errors.city && (
                  <Text style={styles.errorText}>{errors.city}</Text>
                )}
              </View>

              <View style={{ marginTop: 10 }}>
                <Input
                  onChangeText={handleChange("state")}
                  onBlur={handleBlur("state")}
                  value={values.state}
                  label="State"
                  placeholder="State"
                  error={touched.state && errors.state}
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
            </>
          )}
        </Formik>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
    <View style={{paddingTop:20}}>
      <Header
        title={"List Yoga Studio"}
        icon={require("../../assets/back.png")}
      />
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : (<>
        <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.progressContainer}>
          {/* Progress Bar */}
          {[...Array(totalSteps)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressBar,
                index < currentStep ? styles.progressBarActive : null,
              ]}
            />
          ))}
        </View>
      </View>
      <View style={{ flex: 1, marginVertical: 10 }}>
        <View>{renderStep()}</View>
      </View>
      </>
      )}
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
  indicator: {
    position: "absolute",
    alignSelf: "center",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
  stepContainer: {
    padding: 20,
  },
  autocompleteContainer: {
    zIndex: 1,
    width: "100%",
    // marginVertical: 10,
  },
  map: {
    width: "100%",
    height: 300,
    marginVertical: 20,
  },
});

export default EditYStudioForm;
