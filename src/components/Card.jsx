import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Card = ({ item }) => {
  const getUrlByType = (item, targetType) => {
    const artifact = item.latestRun.artifacts.find(
      (artifact) => artifact.type === targetType
    );
    return artifact ? artifact.url : null;
  };

  const imageUrl = getUrlByType(item, "thumb");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card {item?.title}</Text>
      {imageUrl && (
        <View style={styles.imgContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      )}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  title: {
    color: "#202020",
    padding: 4,
    fontSize: 16,
  },
  imgContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    borderRadius: 10,
    width: "100%",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});
