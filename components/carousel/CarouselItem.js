import React, { useState, useRef } from "react";
import { View, StyleSheet, Image, StatusBar, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

export const SLIDER_WIDTH = Dimensions.get("window").width ;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH *0.9);

const CarouselItem = () => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  const banner = [
    { id: 1, image: require("../../assets/home/banner3.jpg") }, // Ensure the paths are correct
    { id: 2, image: require("../../assets/home/banner2.webp") },
    { id: 3, image: require("../../assets/home/banner1.jpg") },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Carousel
          ref={isCarousel}
          data={banner}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => setIndex(index)}
          loop={true}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
        />
        <Pagination
          dotsLength={banner.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  carouselItem: {
    width: ITEM_WIDTH,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:20
  },
  carouselImage: {
    width: ITEM_WIDTH,
    height: 200,
    resizeMode: "cover",
    borderRadius:20
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(102, 42, 178, 1)",
  },
  inactiveDotStyle: {
    backgroundColor: "gray",
  },
});

export default CarouselItem;
