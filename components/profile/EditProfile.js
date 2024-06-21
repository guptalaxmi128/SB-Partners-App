import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import MapView, { Marker } from "react-native-maps";
// import { GOOGLE_MAPS_APIKEY } from "../../apiKey/index";
import { useDispatch, useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import Header from "../header/Header";
import Input from "../input/Input";
import Button from "../button/Button";
import AddCustomData from "../addCustomdata/AddCustomData";
import * as Location from "expo-location";
import { getInstructor, updateInstructor } from "../../action/auth/auth";

const defaultLocation = {
  latitude: 37.7749,
  longitude: -122.4194,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const EditProfile = ({ navigation }) => {
  const totalSteps = 2;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    facebook: "",
    twitter_x: "",
    linkedIn: "",
    instagram: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("Select Date");
  const [languages, setLanguages] = useState([]);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState(defaultLocation);
  const [name, setName] = useState("");
  // const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading1, setLoading1] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
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

  // const handleLocationSelect = (data, details) => {
  //   // const locationName=details?.formatted_address;
  //   // console.log(details.formatted_address);
  //   const { lat, lng } = details.geometry.location;
  //   setLocation({
  //     latitude: parseFloat(lat.toFixed(7)),
  //     longitude: parseFloat(lng.toFixed(7)),
  //     latitudeDelta: 0.05,
  //     longitudeDelta: 0.05,
  //   });
  //   setName(details.formatted_address);
  // };

  // useEffect(() => {
  //   // Enable submit button only if radius, name, latitude, and longitude are set and not default
  //   if (
  //     name &&
  //     location.latitude !== defaultLocation.latitude &&
  //     location.longitude !== defaultLocation.longitude
  //   ) {
  //     setIsSubmitDisabled(false);
  //   } else {
  //     setIsSubmitDisabled(true);
  //   }
  // }, [ name, location]);
  const getLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    setAddress(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: parseFloat(location.coords.latitude.toFixed(7)),
        longitude:parseFloat(location.coords.longitude.toFixed(7)),
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setAddress(geocode[0].formattedAddress);
    } catch (error) {
      setErrorMsg("Error fetching location");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const nextStep = () => {
    setCurrentStep((prevStep) =>
      prevStep < totalSteps ? prevStep + 1 : prevStep
    );
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    if (!date) {
      // If no date is selected, set an error message for the date field
      handleError("Please select a valid date", "date");
      return; // Exit the function without setting the date state
    }

    // console.warn("A date has been picked: ", date);
    const dt = new Date(date);
    const x = dt.toISOString().split("T");
    const x1 = x[0].split("-");
    console.log(x1[2] + "/" + x1[1] + "/" + x1[0]);
    setDate(x1[1] + "/" + x1[2] + "/" + x1[0]);
    handleError(null, "date");
    hideDatePicker();
  };

  // console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getInstructor());
      } catch (error) {
        console.error("Error fetching data:", error);
        const msg = error.response.data?.message;
        Toast.show({
          type: "error",
          text1: msg || "An error occurred. Please try again.",
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (user && user.data) {
      setInputs({
        name: user.data.name || "",
        email: user.data.email || "",
        mobileNumber: user.data.phoneNumber || "",
        bio: user.data.bio || "",
        facebook: user.data.facebook || "",
        twitter_x: user.data.twitter_x || "",
        linkedIn: user.data.linkedIn || "",
        instagram: user.data.instagram || "",
      });
    }
  }, [user]);

  const validate = async () => {
    let isValid = true;

    console.log("Inputs:", inputs);
    console.log("Date:", date);
    console.log("Languages:", languages);
    console.log("Image:", image);

    if (!inputs.name) {
      handleError("Please input name", "name");
      isValid = false;
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please input name",
      });
    }
    if (date === "Select Date") {
      handleError("Please select a date", "date");
      isValid = false;
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please select a date",
      });
    }

    if (!inputs.bio) {
      handleError("Please input bio", "bio");
      isValid = false;
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please input bio",
      });
    }

    if (languages.length === 0) {
      isValid = false;
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please select at least one language",
      });
    }

    if (!image) {
      isValid = false;
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please upload image",
      });
    }

    if (isValid) {
      nextStep();
    } else {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    let isValid = true;

    console.log("Inputs:", inputs);
    console.log("Date:", date);
    console.log("Languages:", languages);
    console.log("Image:", image);

    if (!inputs.name) {
      handleError("Please input name", "name");
      isValid = false;
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please input name",
      });
    }
    if (date === "Select Date") {
      handleError("Please select a date", "date");
      isValid = false;
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please select a date",
      });
    }

    if (!inputs.bio) {
      handleError("Please input bio", "bio");
      isValid = false;
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please input bio",
      });
    }

    if (languages.length === 0) {
      isValid = false;
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please select at least one language",
      });
    }

    if (!image) {
      isValid = false;
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please upload image",
      });
    }
    try {
      setLoading1(true);

      const formData = new FormData();
      formData.append("dateOfBirth", date);
      formData.append("location", address);
      formData.append("name", inputs.name);
      formData.append("bio", inputs.bio);
      formData.append("longitude", String(location.longitude));
      formData.append("latitude", String(location.latitude));
      languages.forEach((language) => {
        formData.append("languages", language);
      });

      if (image) {
        formData.append("profileImage", {
          uri: image,
          name: `image.jpg`,
          type: "image/jpeg",
        });
      }

      if (inputs.facebook) {
        formData.append("facebook", inputs.facebook);
      }
      if (inputs.instagram) {
        formData.append("instagram", inputs.instagram);
      }
      if (inputs.linkedIn) {
        formData.append("linkedIn", inputs.linkedIn);
      }
      if (inputs.twitter_x) {
        formData.append("twitter_x", inputs.twitter_x);
      }

      console.log("FormData:", formData);

      const res = await dispatch(updateInstructor(formData));
      console.log(res);

      if (res && res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
        navigation.navigate("ProfileOverview");
      }
    } catch (error) {
      console.error("Error occurred while updating profile:", error);
      const msg = error.response.data?.message;
      Toast.show({
        type: "error",
        text1: msg ,
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setLoading1(false);
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
  console.log(address);
  const renderStep1 = () => {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View style={{ flex: 1 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "name")}
            onFocus={() => handleError(null, "name")}
            label="Name"
            placeholder="Name"
            value={inputs.name}
            error={errors.name}
            isRequired={true}
          />
          <Input
            label="Email"
            placeholder="Email"
            value={inputs.email}
            isRequired={true}
          />
          <Input
            label="Mobile Number"
            placeholder="Mobile Number"
            value={inputs.mobileNumber}
            isRequired={true}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "facebook")}
            label="Facebook Link"
            placeholder="Facebook Link"
            value={inputs.facebook}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "twitter_x")}
            label="Twitter Link"
            placeholder="Twitter Link"
            value={inputs.twitter_x}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "instagram")}
            label="Instagram Link"
            placeholder="Instragram Link"
            value={inputs.instagram}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "linkedIn")}
            label="LinkedIn Link"
            placeholder="LinkedIn Link"
            value={inputs.linkedIn}
          />

          <Input
            style={{
              padding: 8,
              textAlignVertical: "top",
              fontFamily: "Poppins",
            }}
            value={inputs.bio}
            onChangeText={(text) => handleOnchange(text, "bio")}
            onFocus={() => handleError(null, "bio")}
            label="Bio"
            placeholder="Answer"
            multiline
            numberOfLines={5}
            error={errors.bio}
            isRequired={true}
          />
          <Text style={styles.label}>
            Date Of Birth <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => {
              showDatePicker();
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "gray",
                padding: 10,
                fontFamily: "Poppins",
              }}
            >
              {date}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
          <Text style={styles.errorText}>{errors.date}</Text>
          <AddCustomData
            languages={languages}
            setLanguages={setLanguages}
            label={"Languages"}
            isRequired={true}
          />
          {/* Display the list of languages */}
          <View style={styles.languageList}>
            {languages.map((language, index) => (
              <View key={index} style={styles.languageItem}>
                <Text>{language}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.label}>
            Upload Image <Text style={{ color: "red" }}>*</Text>
          </Text>
          <View style={styles.cameraContainer}>
            {image ? (
              <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
                <View style={styles.cameraButton}>
                  <Image
                    style={styles.cameraImage}
                    source={require("../../assets/camera.png")}
                  />
                  <Text style={styles.cameraText}>Add Photo</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* <View style={styles.stepContainer}> */}
        {/* <View style={styles.autocompleteContainer}> */}
        {/* <Text style={styles.label}>Location</Text> */}
        {/* <GooglePlacesAutocomplete
          placeholder="Search by location"
          onPress={handleLocationSelect}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          fetchDetails={true}
          textInputProps={{
            style: {
              borderColor:  "gray",
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
        /> */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        ) : errorMsg ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMsg}</Text>
            <TouchableOpacity onPress={getLocation}>
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : address && location ? (
          <View style={{marginTop:10}}>
          <Input
            // onChangeText={(text) => handleOnchange(text, "location")}
            label="Location"
            placeholder="Enter Location"
            value={address}
            isRequired={true}
          />
          </View>
        ) : null}

        {/* </View> */}

        {/* {location && (
          <View>
            <MapView style={styles.map} region={location} apiKey={GOOGLE_MAPS_APIKEY}>
              <Marker coordinate={location} />
            </MapView>
          </View>
        )} */}

        <Button
          title={
            loading1 ? (
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
        {/* </View> */}
        {/* <Button
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
          onPress={validate}
        /> */}
      </ScrollView>
    );
  };
  console.log(location);
  // const renderStep2 = () => {
  //   return (
  //     <View style={styles.stepContainer}>
  //       <View style={styles.autocompleteContainer}>
  //         {/* <Text style={styles.label}>Location</Text> */}
  //         {/* <GooglePlacesAutocomplete
  //         placeholder="Search by location"
  //         onPress={handleLocationSelect}
  //         query={{
  //           key: GOOGLE_MAPS_APIKEY,
  //           language: "en",
  //         }}
  //         fetchDetails={true}
  //         textInputProps={{
  //           style: {
  //             borderColor:  "gray",
  //             borderWidth: 1,
  //             height: 50,
  //             borderRadius: 10,
  //             paddingHorizontal: 10,
  //             width: "100%",
  //           },
  //         }}
  //         styles={{
  //           container: { flex: 0 },
  //           listView: { zIndex: 1000 },
  //         }}
  //       /> */}
  //         <Input
  //           onChangeText={(text) => handleOnchange(text, "location")}
  //           label="Location"
  //           placeholder="Enter Location"
  //           value={address}
  //         />
  //       </View>

  //       {location && (
  //         <View>
  //           <MapView style={styles.map} region={location}>
  //             <Marker coordinate={location} />
  //           </MapView>
  //         </View>
  //       )}

  //       <Button
  //         title={
  //           loading1 ? (
  //             <ActivityIndicator
  //               size="small"
  //               color="#ffffff"
  //               style={styles.indicator}
  //             />
  //           ) : (
  //             "Submit"
  //           )
  //         }
  //         onPress={handleSubmit}
  //       />
  //     </View>
  //   );
  // };
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 20 }}>
        <Header
          title={"Edit Profile"}
          icon={require("../../assets/back.png")}
        />
      </View>
      {/* <View style={{paddingHorizontal:20}}>
      <View style={styles.progressContainer}>
        
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
      </View> */}
      <View style={{ flex: 1, marginVertical: 10 }}>
        <View>{renderStep1()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 16,
  },
  label: {
    // marginVertical: 5,
    fontSize: 14,
    fontFamily: "Poppins",
  },
  errorText: {
    marginTop: 7,
    color: "red",
    fontSize: 12,
    fontFamily: "Poppins",
  },
  inputContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    fontFamily: "Poppins",
    height: 45,
    borderColor: "gray",
  },
  languageList: {
    flexDirection: "row", // Display items horizontally
    flexWrap: "wrap", // Wrap items to next row when needed
  },
  languageItem: {
    margin: 5, // Add some margin between items
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  cameraContainer: {
    width: wp(40),
    height: hp(20),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 10,
    backgroundColor: "#fff",
  },
  cameraImage: {
    width: 30,
    height: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  cameraText: {
    fontSize: hp(2),
    fontFamily: "Poppins",
    textAlign: "center",
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
    backgroundColor: "#5F33E1",
  },
  stepContainer: {
    padding: 20,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    color: "#f00",
  },
  retryText: {
    color: "#00f",
    textDecorationLine: "underline",
  },
});

export default EditProfile;
