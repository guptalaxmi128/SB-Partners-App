import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator,Image } from "react-native";
import { useDispatch } from "react-redux";
import { getYogaStudioById } from "../../action/yogaStudio/yogaStudio";
import MasonryList from "react-native-masonry-list";

const Photos = ({ id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState([]);

  const dummyImages = [
  {id:1,uri:'https://res.cloudinary.com/dsi8olmlf/image/upload/v1718629918/cu7dbwzc33svktam7ovo.jpg '}  ,
   {id:2,uri: 'https://res.cloudinary.com/dsi8olmlf/image/upload/v1718629918/cu7dbwzc33svktam7ovo.jpg '},
    {id:3,uri:'https://res.cloudinary.com/dsi8olmlf/image/upload/v1718629918/cu7dbwzc33svktam7ovo.jpg '},
  ];
  
  const imagesToDisplay = banner.length > 0
  ? banner.map((image) => ({ uri: image.path }))
  : dummyImages.map((image) => ({ uri: String(image.uri) }))

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getYogaStudioById(id));
        setBanner(res.data.images);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <MasonryList
           images={imagesToDisplay}
            columns={2}
            // spacing={10}
          />
        </ScrollView>
      )}
    </View>
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
});

export default Photos;
