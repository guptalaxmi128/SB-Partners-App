import React, { useState, useEffect } from "react";
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
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import Toast from "react-native-toast-message";
import { GOOGLE_MAPS_APIKEY } from "../../apiKey/index";
import { SelectList } from "react-native-dropdown-select-list";
import Header from "../header/Header";
import Input from "../input/Input";
import Button from "../button/Button";
import { yogaStudio } from "../../action/yogaStudio/yogaStudio";
import { useDispatch } from "react-redux";

const defaultLocation = {
  latitude: 37.7749,
  longitude: -122.4194,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const YStudioForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const totalSteps = 2;
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState(defaultLocation);
  const [city, setCity] = useState("");

  const [inputs, setInputs] = useState({
    businessName: "",
    pincode: "",
    blockNumberBuildingName: "",
    streetColonyName: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const area = [
    { key: "1", value: "Area1" },
    { key: "2", value: "Area2" },
  ];

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const handleSelectChange = (val, input) => {
    setInputs((prevState) => ({
      ...prevState,
      [input]: val,
    }));
  };

  const validate = async () => {
    let isValid = true;
    const fields = [
      "businessName",
      "pincode",
      "blockNumberBuildingName",
      "streetColonyName",
      "area",
    ];
    fields.forEach((field) => {
      if (!inputs[field]) {
        handleError(`Please select/input ${field.replace(/_/g, " ")}`, field);
        isValid = false;
      }
    });

    if (isValid) {
      nextStep();
    } else {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = {
        businessName: inputs.businessName,
        pincode: inputs.pincode,
        block_building: inputs.blockNumberBuildingName,
        street_colony: inputs.streetColonyName,
        area: inputs.area,
        city: city,
        longitude: String(location.longitude),
        latitude: String(location.latitude),
        state: inputs.state,
      };
      if (inputs.landmark) {
        data.landmark = inputs.landmark;
      }
      // console.log(data);

      const res = await dispatch(yogaStudio(data));
      console.log(res)
      if (res.data && res.data && res.data.id) {
        const { id } = res.data;
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
        navigation.navigate("YogaStudio", { id });
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

  const renderStep1 = () => {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View style={{ flex: 1, marginVertical: 10 }}>
          <Text style={styles.textHeading}>Enter Your Business Details</Text>
          <View>
            <Input
              onChangeText={(text) => handleOnchange(text, "businessName")}
              onFocus={() => handleError(null, "businessName")}
              label="Business Name"
              placeholder="Business Name"
              error={errors.businessName}
            />
            <Input
              onChangeText={(text) => handleOnchange(text, "pincode")}
              onFocus={() => handleError(null, "pincode")}
              label="Pincode"
              placeholder="Pincode"
              error={errors.pincode}
            />
            <Input
              onChangeText={(text) =>
                handleOnchange(text, "blockNumberBuildingName")
              }
              onFocus={() => handleError(null, "blockNumberBuildingName")}
              label="Block Number / Building Name"
              placeholder="Block Number / Building Name"
              error={errors.blockNumberBuildingName}
            />
            <Input
              onChangeText={(text) => handleOnchange(text, "streetColonyName")}
              onFocus={() => handleError(null, "streetColonyName")}
              label="Street / Colony Name"
              placeholder="Street / Colony Name"
              error={errors.streetColonyName}
            />
            <View>
              <Text style={styles.label}>Area</Text>
              <SelectList
                setSelected={(text) => handleSelectChange(text, "area")}
                data={area}
                save="value"
                fontFamily="Poppins"
                onFocus={() => handleError(null, "area")}
              />
              <Text style={styles.errorText}>{errors.area}</Text>
            </View>
            <Input
              onChangeText={(text) => handleOnchange(text, "landmark")}
              // onFocus={() => handleError(null, "landmark")}
              label="Landmark"
              placeholder="Landmark"
              // error={errors.landmark}
            />
          </View>
          <View>
            <Button
              title={
                loading ? (
                  <ActivityIndicator
                    size="small"
                    color="#ffffff"
                    style={styles.indicator}
                  />
                ) : (
                  "Save and Continue"
                )
              }
              onPress={validate}
            />
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderStep2 = () => {
    return (
      <View style={styles.stepContainer}>
        <View style={styles.autocompleteContainer}>
          <Text style={styles.label}>City</Text>
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

        <View style={{ marginTop: 10 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "state")}
            onFocus={() => handleError(null, "state")}
            label="State"
            placeholder="State"
            error={errors.state}
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
            loading ? (
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
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 15 }}>
      <Header
        title={"List Yoga Studio"}
        icon={require("../../assets/back.png")}
      />
      </View>
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
    // marginVertical: 5,
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

export default YStudioForm;
