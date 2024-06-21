import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  FlatList,
  ActivityIndicator,
  BackHandler
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "../header/Header";
import ProgressCard from "./ProgressCard";
import { getYogaStudioById } from "../../action/yogaStudio/yogaStudio";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'expo-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const YogaStudioScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const [selectedBusiness, setSelectedBusiness] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0.5);
  const [buttonWidths, setButtonWidths] = useState({});

  const handleTextLayout = (event, itemId) => {
    const { width } = event.nativeEvent.layout;
    setButtonWidths((prevWidths) => ({ ...prevWidths, [itemId]: width + 40 }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getYogaStudioById(id));
        setSelectedBusiness(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const increaseScore = () => {
    setProgress(Math.min(progress + 0.1, 1));
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

  const gridData = [
    {
      id: 1,
      color: "#fed5d3",
      image: require("../../assets/home/edit-profile.png"),
      text: "Edit Profile",
      navigateTo: "EditBusinessProfile",
    },
    {
      id: 2,
      color: "#fff2cd",
      image: require("../../assets/home/advertise.png"),
      text: "Advertise",
      navigateTo:"AllBusinessStudio"
    },
    {
      id: 3,
      color: "#fcf2f2",
      image: require("../../assets/home/photo.png"),
      text: "Add Photo",
      navigateTo: "AddBusinessPhoto",
    },
    {
      id: 4,
      color: "#e9f9e8",
      image: require("../../assets/home/contact.png"),
      text: "Add Contact",
      navigateTo: "AddBusinessContact",
    },
    {
      id: 5,
      color: "#fff6f2",
      image: require("../../assets/home/time.png"),
      text: "Business Timings",
      navigateTo: "BusinessTiming",
    },
    {
      id: 6,
      color: "#effcfc",
      image: require("../../assets/home/catalogue.png"),
      text: "Add Catalogue",
    },
    {
      id: 7,
      color: "#d3e3fd",
      image: require("../../assets/home/review.png"),
      text: "Reviews",
    },
    {
      id: 8,
      color: "#fff2cd",
      image: require("../../assets/home/offer.png"),
      text: "Add Offers",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate(item.navigateTo, { id: id })}
    >
      <View style={[styles.circle, { backgroundColor: item.color }]}>
        <Image source={item.image} style={styles.studioImage} />
      </View>
      <Text style={styles.imgText}>{item.text}</Text>
    </TouchableOpacity>
  );

  const cardData = [
    {
      id: 1,
      text: "Add Complete Address",
      subText: "Add store location for your customer to locate you easily",
      image: require("../../assets/home/menu.png"),
      buttonTitle: "Add",
      navigateTo: "AddAddress",
    },
    {
      id: 2,
      text: "Upload Rate Card / Catalogue",
      subText: "Upload a Rate Card / Catalogue to help your customers",
      image: require("../../assets/home/menu.png"),
      buttonTitle: "Upload",
      navigateTo: "UpdateRateCard",
    },
    {
      id: 3,
      text: "Add Business Categories",
      subText: "Add more categories to reach out to more customers",
      image: require("../../assets/home/menu.png"),
      buttonTitle: "Add",
      navigateTo: "AddBusinessCategories",
    },
    {
      id: 4,
      text: "Add Contact Details",
      subText:
        "Add multiple contact details for your customers to reach you easily",
      image: require("../../assets/home/menu.png"),
      buttonTitle: "Add",
      navigateTo: "AddContactDetails",
    },
    {
      id: 5,
      text: "Add Offers",
      subText: "Add exciting offers to attract more customers",
      image: require("../../assets/home/menu.png"),
      buttonTitle: "Add",
      navigateTo: "AddOffers",
    },
    {
      id: 6,
      text: "Complete your KYC",
      subText:
        "Complete your KYC to verify your business profile on Swasti Bharat",
      image: require("../../assets/home/menu.png"),
      buttonTitle: "Complete KYC",
      navigateTo: "CompleteKYC",
    },
  ];

  const renderItem1 = ({ item }) => (
    <View style={styles.card}>
      <View style={{ width: wp(70) }}>
        <Text style={styles.cardText}>{item.text}</Text>
        <Text style={styles.cardText1}>{item.subText}</Text>
        <TouchableOpacity
          style={{
            height: 40,
            width: buttonWidths[item.id] || "auto",
            backgroundColor: "rgba(102, 42, 178, 1)",
            marginVertical: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() =>
            navigation.navigate(item.navigateTo, { itemId: item.id })
          }
        >
          <Text
            style={{ color: "#fff", fontSize: 14 }}
            onLayout={(event) => handleTextLayout(event, item.id)}
          >
            {item.buttonTitle}
          </Text>
        </TouchableOpacity>
      </View>
      <Image source={item.image} style={styles.cardImage} />
    </View>
  );

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer} >
          <ShimmerPlaceholder style={styles.shimmerHeader} />
          <ShimmerPlaceholder style={styles.shimmerSubHeader} />
          <View style={[styles.card,{marginVertical:30}]}>
               
                <ShimmerPlaceholder style={[styles.shimmerCardImage,{marginRight:10}]} />
                <View style={{ width: wp(70) }}>
                  <ShimmerPlaceholder style={styles.shimmerCardText} />
                  <ShimmerPlaceholder style={styles.shimmerCardText1} />
                  <ShimmerPlaceholder style={styles.shimmerButton1} />
                </View>
              
              </View>
          <FlatList
            data={gridData}
            renderItem={() => (
              <View style={styles.itemContainer}>
                <ShimmerPlaceholder style={styles.shimmerCircle} />
                <ShimmerPlaceholder style={styles.shimmerText} />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={4}
            contentContainerStyle={styles.contentContainer}
          />
          <FlatList
            data={cardData}
            renderItem={() => (
              <View style={styles.card}>
                <View style={{ width: wp(70) }}>
                  <ShimmerPlaceholder style={styles.shimmerCardText} />
                  <ShimmerPlaceholder style={styles.shimmerCardText1} />
                  <ShimmerPlaceholder style={styles.shimmerButton} />
                </View>
                <ShimmerPlaceholder style={styles.shimmerCardImage} />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalContainer}
          />
        </View>
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={{ paddingTop: 15 }}>
              <Header
                title={"My Business"}
                icon={require("../../assets/back.png")}
              />
            </View>
            <ScrollView>
              <View style={{ paddingVertical: 5 }}>
                <View style={styles.box}>
                  <View>
                    <Text style={styles.text}>
                      {selectedBusiness?.businessName}
                    </Text>
                    <Text style={styles.textp}>
                      {selectedBusiness?.street_colony}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ParticularStudio", { id: id })
                    }
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins",
                        fontSize: 14,
                        color: "blue",
                      }}
                    >
                      View Details
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                  {selectedBusiness && (
                    <View style={{ paddingVertical: 5 }}>
                      <ProgressCard
                        studio={selectedBusiness}
                        progress={progress}
                        onIncrease={increaseScore}
                      />
                    </View>
                  )}
                  <View>
                    <FlatList
                      data={gridData}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id.toString()}
                      numColumns={4}
                      contentContainerStyle={styles.contentContainer}
                    />
                  </View>
                  <View>
                    <FlatList
                      data={cardData}
                      renderItem={renderItem1}
                      keyExtractor={(item) => item.id.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.horizontalContainer}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </GestureHandlerRootView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eef0ff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
  textp: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
  studioCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  leftContent: {
    marginRight: 20,
  },
  studioImage1: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  rightContent: {
    flex: 1,
  },
  studioName: {
    fontFamily: "Poppins",
    fontSize: hp(2),
    fontWeight: "500",
    marginBottom: 5,
  },
  studioAddress: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  arrowIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontFamily: "Poppins",
    fontSize: hp(2.2),
    fontWeight: "500",
    marginBottom: 10,
  },
  contentContainer: {
    alignItems: "center",
  },
  itemContainer: {
    alignItems: "center",
    margin: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  studioImage: {
    width: 25,
    height: 25,
  },
  imgText: {
    fontFamily: "Poppins",
    fontSize: 13,
    width: 75,
    textAlign: "center",
  },
  horizontalContainer: {
    paddingVertical: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    marginHorizontal: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins",
    marginRight: 15,
  },
  cardImage: {
    width: 50,
    height: 50,
  },
  cardText1: {
    fontSize: 12,
    fontFamily: "Poppins",
    marginRight: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shimmerHeader: {
    width: wp(90),
    height: 30,
    borderRadius: 8,
    marginBottom: 10,
    marginTop:30
  },
  shimmerSubHeader: {
    width: wp(60),
    height: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  shimmerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  shimmerText: {
    width: 75,
    height: 20,
    borderRadius: 8,
  },
  shimmerCardText: {
    width: wp(70),
    height: 20,
    borderRadius: 8,
    marginBottom: 5,
  },
  shimmerCardText1: {
    width: wp(60),
    height: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  shimmerButton1: {
    width: wp(50),
    height: 40,
    borderRadius: 10,
  },
  shimmerButton: {
    width: wp(20),
    height: 40,
    borderRadius: 10,
  },
  shimmerCardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default YogaStudioScreen;
