import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
  BackHandler
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Carousel from "react-native-snap-carousel";
import { getYogaStudioById } from "../../action/yogaStudio/yogaStudio";
import { useDispatch } from "react-redux";
import CustomSwitch from "./CustomSwitch";
import Reviews from "./Reviews";
import Overview from "./OverView";
import Services from "./Services";
import Photos from "./Photos";
import QuickInformation from "./QuickInformation";

export const SLIDER_WIDTH = Dimensions.get("window").width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);

const ParticularStudio = ({ route,navigation }) => {
  const { id } = route.params;
  const [index, setIndex] = useState(0);
  const [data, setData] = useState("");
  const [banner, setBanner] = useState([]);
  const dispatch = useDispatch();
  const isCarousel = useRef(null);
  const [loading, setLoading] = useState(false);
  const [courseTab, setCourseTab] = useState(1);
  const onSelectSwitch = (value) => {
    setCourseTab(value);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getYogaStudioById(id));
        console.log(res.data);
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

  // console.log("particular",id)

  const bannerItem = [
    { id: 1, image: require("../../assets/get-screen/tutor1.jpg") },
    { id: 2, image: require("../../assets/get-screen/tutor2.webp") },
    { id: 3, image: require("../../assets/get-screen/tutor3.jpg") },
  ];

  const renderItem = useMemo(
    () =>
      ({ item }) =>
        (
          <View
            style={{
              width: "100%",
              height: 230,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={ item.image} style={styles.headerImage} />
          </View>
        ),
    []
  );

  const renderApiItem = useMemo(
    () =>
      ({ item }) =>
        (
          <View
            style={{
              width: "100%",
              height: 230,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={{ uri: item.path }} style={styles.headerImage} />
          </View>
        ),
    []
  );


  const imagesToDisplay = banner.length > 0 ? banner : bannerItem;

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={{ backgroundColor: "#fff", overflow: "hidden" }}>
            <Carousel
              ref={isCarousel}
              data={imagesToDisplay}
                    renderItem={
                      banner.length > 0 ? renderApiItem : renderItem
                    }
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              onSnapToItem={(index) => setIndex(index)}
              loop={true}
              autoplay={true}
              autoplayInterval={3000}
            />
            <View style={styles.cardContainer}>
              <View style={styles.infoCard}>
                <Text style={styles.businessName}>{data.businessName}</Text>
                <Text style={styles.rating}>4.7 ★ 155 Ratings</Text>
                <Text
                  style={styles.address}
                >{`${data.block_building}, ${data.street_colony}, ${data.pincode}`}</Text>
                <Text style={styles.details}>
                  Meditation Classes • 11 Years in Business
                </Text>
                <Text style={styles.enquiry}>20 people enquired</Text>
                <Text style={styles.openNow}>Open Now: Open 24 Hrs</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={[
                    {
                      key: "Call",
                      imageSource: require("../../assets/studio/call.png"),
                      buttonText: "Call",
                    },
                    {
                      key: "WhatsApp",
                      imageSource: require("../../assets/studio/chat.png"),
                      buttonText: "WhatsApp",
                    },
                    {
                      key: "Direction",
                      imageSource: require("../../assets/studio/direction.png"),
                      buttonText: "Direction",
                    },
                    {
                      key: "Write Reviews",
                      imageSource: require("../../assets/studio/star.png"),
                      buttonText: "Write Reviews",
                    },
                    {
                      key: "Share",
                      imageSource: require("../../assets/studio/direction.png"),
                      buttonText: "Share",
                    },
                  ]}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.buttonRow}>
                      <View style={styles.button}>
                        <Image
                          source={item.imageSource}
                          style={{ width: 20, height: 20, marginRight: 8 }}
                        />
                        <Text style={styles.buttonText}>{item.buttonText}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
            {/* <View style={styles.recommendationSection}>
              <Text style={styles.recommendationText}>
                Do you recommend this business?
              </Text>
              <View style={styles.recommendationButtons}>
                <TouchableOpacity style={styles.recommendButton}>
                  <Text style={styles.recommendText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.recommendButton}>
                  <Text style={styles.recommendText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.recommendButton}>
                  <Text style={styles.recommendText}>Maybe</Text>
                </TouchableOpacity>
              </View>
            </View> */}
            <CustomSwitch
              selectionMode={1}
              option1="Overview"
              option2="Reviews"
              option3="Services"
              option4="Quick Info"
              option5="Photos"
              onSelectSwitch={onSelectSwitch}
            />
            <View>
              {courseTab == 1 && <Overview id={id} />}
              {courseTab == 2 && <Reviews />}
              {courseTab == 3 && <Services />}
              {courseTab == 4 && <QuickInformation id={id} />}
              {courseTab == 5 && <Photos id={id} />}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImage: {
    width: "100%",
    height: 230,
    resizeMode: "cover",
  },
  cardContainer: {
    width: "90%",
    marginTop: -30,
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 5,
    alignSelf: "center",
    marginBottom: 20,
  },
  infoCard: {
    padding: 20,
  },
  businessName: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  rating: {
    fontSize: 16,
    color: "#555",
    fontFamily: "Poppins",
  },
  address: {
    fontSize: 14,
    color: "#777",
    fontFamily: "Poppins",
  },
  details: {
    fontSize: 14,
    color: "#777",
    fontFamily: "Poppins",
  },
  enquiry: {
    fontSize: 14,
    color: "#777",
    fontFamily: "Poppins",
  },
  openNow: {
    fontSize: 14,
    color: "#777",
    marginBottom: 16,
    fontFamily: "Poppins",
  },
  buttonRow: {
    flexDirection: "row",
    marginRight: 10,
  },
  button: {
    backgroundColor: "rgba(102, 42, 178, 1)",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins",
  },
  recommendationSection: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  recommendationText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000",
    fontFamily: "Poppins",
  },
  recommendationButtons: {
    flexDirection: "row",
  },
  recommendText: { fontFamily: "Poppins" },
  recommendButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",

    marginRight: 5,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ParticularStudio;
