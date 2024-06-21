import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import {
  deleteStudio,
  deleteStudioImage,
  getYogaStudioById,
  publishYogaStudio,
  submitYogaStudio,
  submitYogaStudioImage,
} from "../../action/yogaStudio/yogaStudio";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import Reviews from "./Reviews";
import QuickInformation from "./QuickInformation";
import Services from "./Services";

const Overview = ({ id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [banner, setBanner] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleImageDropdown = () => {
    setIsShowImage(!isShowImage);
  };

  const handleSubmitPress = async (id) => {
    try {
      const res = await dispatch(submitYogaStudio(id));
      if (res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("Error approve item:", error);
      const msg = error.response.data.message;
      Toast.show({
        type: "error",
        text1: msg || "An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setDropdownVisible(false);
    }
  };

  const showSubmitAlert = (id) => {
    Alert.alert(
      "Confirm for Approval",
      "Are you sure you want to send this item for approval?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Send",
          onPress: () => handleSubmitPress(id),
        },
      ],
      { cancelable: false }
    );
  };

  const showAlert = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDelete(id),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (id) => {
    try {
      const res = await dispatch(deleteStudio(id));
      if (res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      const msg = error.response.data.message;
      Toast.show({
        type: "error",
        text1: msg || "An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setDropdownVisible(false);
    }
  };

  const handlePublishPress = async (id, isPublish) => {
    try {
      const res = await dispatch(
        publishYogaStudio({ id, isPublish: isPublish })
      );
      if (res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("Error approve item:", error);
      const msg = error.response.data.message;
      Toast.show({
        type: "error",
        text1: msg || "An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setDropdownVisible(false);
    }
  };

  const showPublishAlert = (id, isPublish) => {
    Alert.alert(
      "Confirm for Publish",
      "Are you sure you want to send this item for publish?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Send",
          onPress: () => handlePublishPress(id, isPublish),
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getYogaStudioById(id));
        // console.log(res.data);
        setData(res.data);
        setBanner(res.data.images);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const renderImageItem = ({ item }) => {
    return (
      <>
        <Image source={{ uri: item.path }} style={styles.image} />
        <TouchableOpacity
          onPress={() => showPhotoAlert(item.id)}
          style={styles.closeImg}
        >
          <Image
            source={require("../../assets/delete.png")}
            style={styles.deleteImg}
          />
        </TouchableOpacity>
      </>
    );
  };

  const renderImageItem1 = ({ item }) => {
    return <Image source={item.image} style={styles.image} />;
  };

  const bannerItem = [
    { id: 1, image: require("../../assets/get-screen/tutor1.jpg") },
    { id: 2, image: require("../../assets/get-screen/tutor2.webp") },
    { id: 3, image: require("../../assets/get-screen/tutor3.jpg") },
  ];

  const imagesToDisplay = banner.length > 0 ? banner : bannerItem;

  const handleOutsidePress = () => {
    if (isDropdownVisible) {
      setDropdownVisible(false);
    }
    if (isShowImage) {
      setIsShowImage(false);
    }
  };

  const showPhotoAlert = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this image?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handlePhotoDelete(id),
        },
      ],
      { cancelable: false }
    );
  };

  const handlePhotoDelete = async (id) => {
    // console.log(id);
    try {
      const res = await dispatch(deleteStudioImage(id));
      console.log(res);
      if (res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      const msg = error.response.data.message;
      Toast.show({
        type: "error",
        text1: msg || "An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const handleImagePress = async (id) => {
    try {
      const res = await dispatch(submitYogaStudioImage(id));
      if (res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("Error approve item:", error);
      const msg = error.response.data.message;
      Toast.show({
        type: "error",
        text1: msg || "An error occurred. Please try again.",
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setIsShowImage(false);
    }
  };

  const showSubmitImageAlert = (id) => {
    Alert.alert(
      "Confirm for Approval",
      "Are you sure you want to send this image for approval?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Send",
          onPress: () => handleImagePress(id),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.outsidePressArea}
            onPress={handleOutsidePress}
          >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.contentContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.textHeading}>Address</Text>
                  <TouchableOpacity
                    style={{ paddingHorizontal: 20 }}
                    onPress={toggleDropdown}
                  >
                    <FontAwesome name="ellipsis-v" size={15} color="black" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.text}>
                  {`${data.block_building}, ${data.street_colony}, ${data.pincode}`}
                </Text>
                <View style={styles.separator} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.textHeading}>Photos</Text>
                  <TouchableOpacity
                    style={{ paddingHorizontal: 20 }}
                    onPress={toggleImageDropdown}
                  >
                    <FontAwesome name="ellipsis-v" size={15} color="black" />
                  </TouchableOpacity>
                </View>
                <View style={styles.flatListContainer}>
                  <FlatList
                    data={imagesToDisplay}
                    renderItem={
                      banner.length > 0 ? renderImageItem : renderImageItem1
                    }
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
                <Text style={styles.textHeading}>Quick Information</Text>
                <QuickInformation id={id} />
                <Reviews />
                <Text style={styles.textHeading}>Services</Text>
                <Services />
              </View>
              {isDropdownVisible && (
                <View style={styles.dropdown}>
                  <TouchableOpacity onPress={() => showSubmitAlert(id)}>
                    <Text style={styles.dropdownText}>Submit for Approval</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => showPublishAlert(id, true)}>
                    <Text style={styles.dropdownText}>
                      {data.isPublish ? "Published" : "Publish"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => showAlert(id)}>
                    <Text style={[styles.dropdownText, { color: "red" }]}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {isShowImage && (
                <View style={styles.dropdown}>
                  <TouchableOpacity onPress={() => showSubmitImageAlert(id)}>
                    <Text style={styles.dropdownText}>Submit for Approval</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    // paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
  },
  textHeading: {
    fontFamily: "PoppinsBold",
    fontSize: hp(2.2),
    fontWeight: "500",
    marginVertical: 8,
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 14,
    paddingHorizontal: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  flatListContainer: {
    width: wp(100),
    marginTop: 10,
    marginRight: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  image: {
    width: wp(40),
    height: hp(20),
    borderRadius: 5,
    marginHorizontal: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    position: "absolute",
    right: 20,
    top: 50,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  dropdownText: {
    padding: 10,
    fontSize: 14,
    fontFamily: "Poppins",
  },
  outsidePressArea: {
    flex: 1,
  },
  deleteImg: {
    width: 15,
    height: 15,
    // marginLeft: 10,
  },
  closeImg: {
    position: "absolute",
    top: 0,
    right: 3,
  },
});

export default Overview;
