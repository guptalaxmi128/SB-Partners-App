import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { getYogaStudioById } from "../../action/yogaStudio/yogaStudio";
import MasonryList from "react-native-masonry-list";

const Photos = ({ id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [banner, setBanner] = useState([]);

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

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <MasonryList
           images={banner.map((image) => ({ uri: image.path }))}
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
