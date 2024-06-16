import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
import * as ImagePicker from "expo-image-picker";
import Header from "../header/Header";
import Button from "../button/Button";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { addTherapistPhoto } from "../../action/therapist/therapist";


const TherapistPhoto = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { id } = route.params;

  const validationSchema = Yup.object().shape({
    images: Yup.array()
      .of(
        Yup.object().shape({
          uri: Yup.string().required("Image is required"),
        })
      )
      .min(1, "At least one image is required")
      .max(3, "You can upload up to 3 images"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("id", id);

      values.images.forEach((img, index) => {
        formData.append("therapyImages", {
          uri: img.uri,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        });
      });

      console.log("FormData:", formData);

      const res = await dispatch(addTherapistPhoto(formData, id));
      console.log(res);

      if (res && res.success) {
        Toast.show({
          type: "success",
          text1: res.data.message,
          visibilityTime: 2000,
          autoHide: true,
        });
        navigation.navigate("AllTherapist")
      } else {
        console.error("Unexpected response:", res);
      }
    } catch (error) {
      console.error("Error occurred while registering user:", error);
      const msg = error.response.data.message;
      Toast.show({
        type: "error",
        text1: msg ||"An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const pickImage = async (setFieldValue) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 3,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets);
    if (!result.cancelled) {
      setFieldValue("images", result.assets);
    }
  };

  const handleRemoveImage = (index, values, setFieldValue) => {
    const newImages = [
      ...values.images.slice(0, index),
      ...values.images.slice(index + 1),
    ];
    setFieldValue("images", newImages);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 15 }}>
        <Header title={"Add Photos"} icon={require("../../assets/back.png")} />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View >
          <View style={{ flex: 1 }}>
            <Text style={styles.textHeading}>Add Tutor Photos</Text>
          
            <Formik
              initialValues={{ images: [] }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                setFieldValue,
                handleSubmit,
                isSubmitting,
              }) => (
                <View>
                 
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => pickImage(setFieldValue)}
                        style={styles.cameraContainer}
                      >
                        <View style={styles.cameraButton}>
                          <Image
                            style={styles.cameraImage}
                            source={require("../../assets/camera.png")}
                          />
                          <Text style={styles.cameraText}>Add Photo</Text>
                        </View>
                      </TouchableOpacity>
                      {errors.images && touched.images && (
                        <Text style={styles.errorText}>{errors.images}</Text>
                      )}
                    </View>
                    <View
                      style={{ width: wp(90), marginTop: 10, marginRight: 10 }}
                    >
                      <FlatList
                        data={values.images}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                            onPress={() =>
                              handleRemoveImage(index, values, setFieldValue)
                            }
                          >
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
                  
                  <Button
                    title={
                      isSubmitting ? (
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
  cameraContainer: {
    width: wp(90),
    height: hp(20),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  cameraImage: {
    width: 30,
    height: 30,
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

export default TherapistPhoto;
