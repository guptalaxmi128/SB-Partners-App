import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Image,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import CustomSwitch from "./CustomSwitch";

const Reviews = () => {
  const [starRating, setStarRating] = useState(0);
  const [reviewTab, setReviewTab] = useState(1);

  const onSelectSwitch = (value) => {
    setReviewTab(value);
  };

  const handleStarClick = (index) => {
    setStarRating(index + 1);
  };

  const reviews = [
    {
      id: 1,
      name: "Ankush Gupta",
      image: require("../../assets/review/review2.png"),
      text: "This is a relevant review.",
      rating: 5,
      date: "2023-06-01",
    },
    {
      id: 2,
      name: "Deepika",
      image: require("../../assets/review/review1.jpeg"),
      text: "This is the latest review.",
      rating: 3,
      date: "2024-06-01",
    },
    {
      id: 3,
      name: "Neha Yadav",
      image: require("../../assets/review/review3.jpeg"),
      text: "This review has a high rating.",
      rating: 4,
      date: "2023-05-01",
    },
  ];

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          style={styles.starIcon}
          onPress={() => handleStarClick(i)}
        >
          <FontAwesome
            name={i < starRating ? "star" : "star-o"}
            size={24}
            color={i < starRating ? "orange" : "black"}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const filterReviews = () => {
    switch (reviewTab) {
      case 1:
        return reviews; // Relevant reviews logic (e.g., default sorting)
      case 2:
        return [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date)); // Latest reviews
      case 3:
        return [...reviews].sort((a, b) => b.rating - a.rating); // High to Low rating
      default:
        return reviews;
    }
  };

  const getBackgroundColor = (rating) => {
    if (rating < 2) {
      return styles.redBackground;
    } else if (rating >= 2 && rating <= 3) {
      return styles.orangeBackground;
    } else if (rating >= 4 && rating <= 5) {
      return styles.greenBackground;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View>
          <View style={{ flex: 1 }}>
            <Text style={styles.textHeading}>Start a review</Text>
            <View style={{ flexDirection: "row" }}>{renderStars()}</View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                marginVertical: 15,
              }}
            />
            <View>
              <Text style={styles.textHeading}>Reviews & Ratings</Text>
              <View style={styles.itemContainer}>
                <View
                  style={{
                    backgroundColor: "green",
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 28, fontWeight: "bold" }}
                  >
                    4.0
                  </Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={styles.rating}>25 Ratings</Text>
                  <Text style={styles.details}>
                    SB rating index based on 25 ratings across the web{" "}
                  </Text>
                </View>
              </View>
              <Text style={styles.textHeading}>User Reviews</Text>
              <View>
                <CustomSwitch
                  selectionMode={1}
                  option1="Relevant"
                  option2="Latest"
                  option3="High to Low"
                  onSelectSwitch={onSelectSwitch}
                />
                <FlatList
                  data={filterReviews()}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.reviewContainer}>
                      <View style={{ flexDirection: "row" }}>
                        <Image source={item.image} style={styles.image} />
                        <View>
                          <Text style={styles.reviewHeading}>{item.name}</Text>
                          <Text style={styles.reviewText}>{item.text}</Text>
                          <View
                            style={[
                              styles.ratingContainer,
                              getBackgroundColor(item.rating),
                            ]}
                          >
                            <Text style={styles.ratingText}>{item.rating}</Text>
                            <View style={{marginTop:4,marginLeft:5}}>
                            <FontAwesome
                              name="star-o"
                              size={12}
                              color="white"
                            />
                            </View>
                          </View>
                          <Text style={styles.reviewText}>
                            Date: {item.date}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
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
    fontSize: hp(2.7),
    fontWeight: "500",
    marginVertical: 10,
  },
  starIcon: {
    marginRight: 5,
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoCard: {
    padding: 20,
  },
  rating: {
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  details: {
    fontSize: 14,
    color: "#777",
    fontFamily: "Poppins",
    width: wp(70),
  },
  reviewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  reviewHeading: { fontFamily: "Poppins", fontWeight: "500", fontSize: 16 },
  reviewText: { fontFamily: "Poppins", fontSize: 14 },
  ratingContainer: {
    padding: 10,
    borderRadius: 5,
    width: wp(10),
    height: hp(5),
    flexDirection: "row",
  },
  ratingText: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#fff",
  },
  redBackground: {
    backgroundColor: "red",
  },
  orangeBackground: {
    backgroundColor: "orange",
  },
  greenBackground: {
    backgroundColor: "green",
  },
});

export default Reviews;
