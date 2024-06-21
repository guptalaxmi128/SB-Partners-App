import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { SelectList } from "react-native-dropdown-select-list";
import PhoneInput from "react-native-phone-number-input";
import Header from "../header/Header";
import Input from "../input/Input";
import Button from "../button/Button";
import {
  studioStepFirst,
  studioStepSecond,
  studioStepThird,
} from "../../action/yogaStudio/yogaStudio";
import { useDispatch } from "react-redux";

const YogaStudio = ({ route, navigation }) => {
  const totalSteps = 3;
  const dispatch = useDispatch();
  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [mobileNumbers, setMobileNumbers] = useState([""]);
  const [whatsAppNumbers, setWhatsAppNumbers] = useState([""]);
  const [landlineNumbers, setLandlineNumbers] = useState([""]);
  const [emails, setEmails] = useState([""]);

  const [timeSlots, setTimeSlots] = useState([
    { selectedDays: [], openAt: "", closeAt: "" },
  ]);
  const [selectAll, setSelectAll] = useState(false);

  // console.log("Yogastudio", timeSlots);

  const [inputs, setInputs] = useState({
    title: "",
    contactPerson: "",
  });
  const [errors, setErrors] = useState({});

  const nextStep = () => {
    setCurrentStep((prevStep) =>
      prevStep < totalSteps ? prevStep + 1 : prevStep
    );
  };

  

  const validate = async () => {
    let isValid = true;
    const requiredFields = [
      { key: "title", value: inputs.title },
      { key: "contactPerson", value: inputs.contactPerson },
      { key: "mobileNumbers", value: mobileNumbers },
      { key: "emails", value: emails },
    ];

    requiredFields.forEach((field) => {
      if (
        !field.value ||
        (Array.isArray(field.value) && field.value.some((v) => !v))
      ) {
        handleError(
          `Please select/input ${field.key.replace(/_/g, " ")}`,
          field.key
        );
        isValid = false;
      }
    });

    if (mobileNumbers.length === 0) {
      isValid = false;
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter at least one mobile number",
      });
    }
  
  

    if (isValid) {
      try {
        setLoading(true);
        const data = {
          title: inputs.title,
          person: inputs.contactPerson,
          mobileNumber: mobileNumbers,
          email: emails,
          businessId: id,
        };
        if (whatsAppNumbers.some((number) => number)) {
          data.whatsAppNumber = whatsAppNumbers.filter((number) => number);
        }
        if (landlineNumbers.some((number) => number)) {
          data.landLineNumber = landlineNumbers.filter((number) => number);
        }

        console.log(data);
        const res = await dispatch(studioStepFirst(data));
        console.log(res);
        if (res && res.data) {
          Toast.show({
            type: "success",
            text1: res.message,
            visibilityTime: 2000,
            autoHide: true,
          });
          nextStep();
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
    }
    return isValid;
  };

  const transformTimeSlots = (timeSlots) => {
    return timeSlots.map((slot) => {
      const daysMap = {
        isSun: false,
        isMon: false,
        isTue: false,
        isWed: false,
        isThu: false,
        isFri: false,
        isSat: false,
      };

      slot.selectedDays.forEach((day) => {
        switch (day) {
          case "Sunday":
            daysMap.isSun = true;
            break;
          case "Monday":
            daysMap.isMon = true;
            break;
          case "Tuesday":
            daysMap.isTue = true;
            break;
          case "Wednesday":
            daysMap.isWed = true;
            break;
          case "Thursday":
            daysMap.isThu = true;
            break;
          case "Friday":
            daysMap.isFri = true;
            break;
          case "Saturday":
            daysMap.isSat = true;
            break;
          default:
            break;
        }
      });

      return {
        openAt: slot.openAt,
        closeAt: slot.closeAt,
        ...daysMap,
      };
    });
  };

  const transformedTimings = transformTimeSlots(timeSlots);
  // console.log(transformedTimings);

  const validate2 = async () => {
    let isValid = true;
    try {
      setLoading(true);
      const data = {
        businessId: id,
        timings: transformedTimings,
      };

      console.log(data);
      const res = await dispatch(studioStepSecond(data));
      console.log(res);
      if (res.data && res.data) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
        nextStep();
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

    return isValid;
  };

  const validate3 = async () => {
    let isValid = true;
    try {
      setLoading(true);
  
      const formData = new FormData();
      formData.append('businessId', id); 
  
      if (image && image.length > 0) {
        image.forEach((img, index) => {
          formData.append('studioImages', {
            uri: img.uri,
            name: `image_${index}.jpg`, 
            type: 'image/jpeg', 
          });
        });
      }
  
      console.log('FormData:', formData);
      
      const res = await dispatch(studioStepThird(formData, id));
      console.log(res);
      
      if (res && res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
        navigation.navigate('Home');
      } else if (res && res.message) {
        console.log(res.message);
      } else {
        console.error('Unexpected response:', res);
      }
    } catch (error) {
      console.error('Error occurred while registering user:', error);
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
  
    return isValid;
  };
  
  
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

  const handleMobileChange = (text, index) => {
    const updatedMobileNumbers = [...mobileNumbers];
    updatedMobileNumbers[index] = text;
    setMobileNumbers(updatedMobileNumbers);
  };

  const handleWhatsAppChange = (text, index) => {
    const updatedWhatsAppNumbers = [...whatsAppNumbers];
    updatedWhatsAppNumbers[index] = text;
    setWhatsAppNumbers(updatedWhatsAppNumbers);
  };

  const handleLandlineChange = (text, index) => {
    const updatedLandlineNumbers = [...landlineNumbers];
    updatedLandlineNumbers[index] = text;
    setLandlineNumbers(updatedLandlineNumbers);
  };

  const handleEmailChange = (text, index) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = text;
    setEmails(updatedEmails);
  };

  const addMobileNumber = () => {
    setMobileNumbers([...mobileNumbers, ""]);
  };

  const removeMobileNumber = (index) => {
    const updatedMobileNumbers = [...mobileNumbers];
    updatedMobileNumbers.splice(index, 1);
    setMobileNumbers(updatedMobileNumbers);
  };

  const addWhatsAppNumber = () => {
    setWhatsAppNumbers([...whatsAppNumbers, ""]);
  };

  const removeWhatsAppNumber = (index) => {
    const updatedWhatsAppNumbers = [...whatsAppNumbers];
    updatedWhatsAppNumbers.splice(index, 1);
    setWhatsAppNumbers(updatedWhatsAppNumbers);
  };

  const addLandlineNumber = () => {
    setLandlineNumbers([...landlineNumbers, ""]);
  };

  const removeLandlineNumber = (index) => {
    const updatedLandlineNumbers = [...landlineNumbers];
    updatedLandlineNumbers.splice(index, 1);
    setLandlineNumbers(updatedLandlineNumbers);
  };

  const addEmail = () => {
    setEmails([...emails, ""]);
  };

  const removeEmail = (index) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };

  const title = [
    { key: "1", value: "Mr." },
    { key: "2", value: "Miss" },
    { key: "2", value: "Mrs." },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { selectedDays: [], openAt: "", closeAt: "" }]);
  };

  const toggleDaySelection = (index, day) => {
    setTimeSlots((prevTimeSlots) =>
      prevTimeSlots.map((slot, i) =>
        i === index
          ? {
              ...slot,
              selectedDays: slot.selectedDays.includes(day)
                ? slot.selectedDays.filter((selectedDay) => selectedDay !== day)
                : [...slot.selectedDays, day],
            }
          : slot
      )
    );
  };

  const handleTimeSelectChange = (val, input, index) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index][input] = val;
    setTimeSlots(newTimeSlots);
  };

  const daysOfWeek = [
    { label: "Sun", value: "Sunday" },
    { label: "Mon", value: "Monday" },
    { label: "Tue", value: "Tuesday" },
    { label: "Wed", value: "Wednesday" },
    { label: "Thu", value: "Thursday" },
    { label: "Fri", value: "Friday" },
    { label: "Sat", value: "Saturday" },
  ];

  const toggleSelectAll = () => {
    if (selectAll) {
      setTimeSlots((prevTimeSlots) =>
        prevTimeSlots.map((slot) => ({ ...slot, selectedDays: [] }))
      );
    } else {
      setTimeSlots((prevTimeSlots) =>
        prevTimeSlots.map((slot) => ({
          ...slot,
          selectedDays: daysOfWeek.map((day) => day.value),
        }))
      );
    }
    setSelectAll(!selectAll);
  };

  const timeSlot = [
    { label: "9:00 AM", value: "9:00 AM" },
    { label: "6:00 PM", value: "6:00 PM" },
    { label: "10:00 PM", value: "10:00 PM" },
  ];
  //   For third step

  const [image, setImage] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      // allowsEditing: true,
      selectionLimit: 6,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
    console.log(result.assets);
    if (!result.cancelled) {
      setImage(result.assets);
    }
  };

  // console.log(image)

  const handleRemoveImage = (index) => {
    setImage([...image.slice(0, index), ...image.slice(index + 1)]);
  };

  const renderStep1 = () => {
    return (
      <View>
        <Text style={styles.textHeading}>Add Contact Details</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 0.3, marginRight: 10 }}>
            <Text style={styles.label}>Title</Text>
            <SelectList
              setSelected={(text) => handleSelectChange(text, "title")}
              data={title}
              save="value"
              fontFamily="Poppins"
              placeholder="Select"
              onFocus={() => handleError(null, "title")}
              containerStyle={{ width: wp(40) }}
            />
            <Text style={styles.errorText}>{errors.title}</Text>
          </View>
          <View style={{ flex: 0.8 }}>
            <Input
              onChangeText={(text) => handleOnchange(text, "contactPerson")}
              onFocus={() => handleError(null, "contactPerson")}
              label="Contact Person"
              placeholder="Contact Person"
              error={errors.contactPerson}
            />
          </View>
        </View>
        {mobileNumbers.map((mobile, index) => (
          <View key={index}>
            <Text style={styles.label}>Mobile Number {index + 1}</Text>
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
              onChangeText={(text) => handleMobileChange(text, index)}
            />
            {index > 0 && (
              <TouchableOpacity
                onPress={() => removeMobileNumber(index)}
                style={{ marginTop: 8 }}
              >
                <Text
                  style={[
                    styles.label,
                    { color: "rgba(102, 42, 178, 1)", marginVertical: 8 },
                  ]}
                >
                  - Remove Mobile Number
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity onPress={addMobileNumber} style={{ marginTop: 8 }}>
          <Text
            style={[
              styles.label,
              { color: "rgba(102, 42, 178, 1)", marginVertical: 8 },
            ]}
          >
            + Add Mobile Number
          </Text>
        </TouchableOpacity>

        {whatsAppNumbers.map((whatsApp, index) => (
          <View key={index}>
            <Text style={styles.label}>WhatsApp Number {index + 1}</Text>
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
              onChangeText={(text) => handleWhatsAppChange(text, index)}
            />
            {index > 0 && (
              <TouchableOpacity
                onPress={() => removeWhatsAppNumber(index)}
                style={{ marginTop: 8 }}
              >
                <Text
                  style={[
                    styles.label,
                    { color: "rgba(102, 42, 178, 1)", marginVertical: 8 },
                  ]}
                >
                  - Remove WhatsApp Number
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity onPress={addWhatsAppNumber} style={{ marginTop: 8 }}>
          <Text
            style={[
              styles.label,
              { color: "rgba(102, 42, 178, 1)", marginVertical: 8 },
            ]}
          >
            + Add WhatsApp Number
          </Text>
        </TouchableOpacity>

        {landlineNumbers.map((landline, index) => (
          <View key={index}>
            <Text style={styles.label}>Landline Number {index + 1}</Text>
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
              onChangeText={(text) => handleLandlineChange(text, index)}
            />
            {index > 0 && (
              <TouchableOpacity
                onPress={() => removeLandlineNumber(index)}
                style={{ marginTop: 8 }}
              >
                <Text
                  style={[
                    styles.label,
                    { color: "rgba(102, 42, 178, 1)", marginVertical: 8 },
                  ]}
                >
                  - Remove Landline Number
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity onPress={addLandlineNumber} style={{ marginTop: 8 }}>
          <Text
            style={[
              styles.label,
              { color: "rgba(102, 42, 178, 1)", marginVertical: 8 },
            ]}
          >
            + Add Landline Number
          </Text>
        </TouchableOpacity>

        {emails.map((email, index) => (
          <View key={index}>
            <Input
              onChangeText={(text) => handleEmailChange(text, index)}
              onFocus={() => handleError(null, "email")}
              label={`Email ${index + 1}`}
              placeholder="Email"
              error={errors.email}
              value={email}
            />
            {index > 0 && (
              <TouchableOpacity
                onPress={() => removeEmail(index)}
                style={{ marginTop: 8 }}
              >
                <Text
                  style={[
                    styles.label,
                    { color: "rgba(102, 42, 178, 1)", marginVertical: 8 },
                  ]}
                >
                  - Remove Email
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity onPress={addEmail} style={{ marginTop: 8 }}>
          <Text
            style={[
              styles.label,
              { color: "rgba(102, 42, 178, 1)", marginVertical: 8 },
            ]}
          >
            + Add Email
          </Text>
        </TouchableOpacity>

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
    );
  };

  const renderStep2 = () => {
    return (
      <View>
        <Text style={styles.textHeading}>Add Business Timings</Text>
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.label}>
            Let your customers know when you are open for business
          </Text>
          {timeSlots.map((slot, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontSize: hp(2.5),
                  marginTop: 10,
                }}
              >
                Select Days of The Week for Slot {index + 1}
              </Text>
              <View style={styles.daycontainer}>
                {daysOfWeek.map((day) => (
                  <TouchableOpacity
                    key={day.value}
                    style={[
                      styles.dayButton,
                      {
                        backgroundColor: slot.selectedDays.includes(day.value)
                          ? "rgba(102, 42, 178, 1)"
                          : "transparent",
                      },
                    ]}
                    onPress={() => toggleDaySelection(index, day.value)}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        {
                          color: slot.selectedDays.includes(day.value)
                            ? "#fff"
                            : "#000",
                        },
                      ]}
                    >
                      {day.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                style={[
                  { flexDirection: "row", alignItems: "center", marginTop: 10 },
                  {
                    backgroundColor: "transparent",
                  },
                ]}
                onPress={toggleSelectAll}
              >
                <FontAwesome
                  name={selectAll ? "check-square" : "square-o"}
                  size={24}
                  color="#000"
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={{
                    color: "#000",
                    fontFamily: "Poppins",
                    fontSize: hp(2),
                  }}
                >
                  Select All Days
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 0.48 }}>
                  <Text style={styles.label}>Open at</Text>
                  <SelectList
                    setSelected={(text) =>
                      handleTimeSelectChange(text, "openAt", index)
                    }
                    data={timeSlot}
                    save="value"
                    fontFamily="Poppins"
                    placeholder="Select"
                    onFocus={() => handleError(null, "openAt")}
                    containerStyle={{ width: wp(40) }}
                  />
                  <Text style={styles.errorText}>{errors.openAt}</Text>
                </View>
                <View style={{ flex: 0.48 }}>
                  <Text style={styles.label}>Close at</Text>
                  <SelectList
                    setSelected={(text) =>
                      handleTimeSelectChange(text, "closeAt", index)
                    }
                    data={timeSlot}
                    save="value"
                    fontFamily="Poppins"
                    placeholder="Select"
                    onFocus={() => handleError(null, "closeAt")}
                    containerStyle={{ width: wp(40) }}
                  />
                  <Text style={styles.errorText}>{errors.closeAt}</Text>
                </View>
              </View>
            </View>
          ))}
          <TouchableOpacity onPress={addTimeSlot}>
            <Text style={[styles.label, { color: "rgba(102, 42, 178, 1)" }]}>
              + Add Another Time Slot
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 20 }}>
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
            onPress={validate2}
          />
        </View>
      </View>
    );
  };

  const renderStep3 = () => {
    return (
      <View>
        <Text style={styles.textHeading}>Add Photos</Text>
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.label}>
            Showcase photos of your business to look authentic
          </Text>
        </View>
        <View >
          <View style={styles.cameraContainer}>
            <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
              <View style={styles.cameraButton}>
                <Image
                  style={styles.cameraImage}
                  source={require("../../assets/camera.png")}
                />
                <Text style={styles.cameraText}>Add Photo</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ width: wp(90), marginTop: 10, marginRight: 10 }}>
            <FlatList
              data={image}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => handleRemoveImage(index)}>
                  <Image
                    source={{ uri: item.uri }}
                    style={{
                      width: wp(40),
                      height: hp(20),
                      borderRadius: 5,
                      marginHorizontal: 5,
                    }}
                  />
                </TouchableOpacity>
              )}
            />
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
              "Save"
            )
          }
          onPress={validate3}
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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View style={{ paddingVertical: 5 }}>
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
          <View style={{ flex: 1, marginVertical: 10 }}>
            <View>{renderStep()}</View>
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
  daycontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 10,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
  },
  dayText: {
    fontSize: hp(2),
    color: "#dcdcdc",
    fontFamily: "Poppins",
  },
  cameraContainer: {
    width: wp(90),
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
});

export default YogaStudio;
