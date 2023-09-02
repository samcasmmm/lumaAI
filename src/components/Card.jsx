import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Card = ({ item }) => {
  const getUrlByType = (item, targetType) => {
    const artifact = item.latestRun.artifacts.find(
      (artifact) => artifact.type === targetType
    );
    return artifact ? artifact.url : null;
  };

  const imageUrl = getUrlByType(item, "thumb");
  const navigation = useNavigation();

  const handleNavigate = () => {
    console.log(item);
    console.log(item.slug);
    const textured_mesh_glbUrl = getUrlByType(item, "textured_mesh_glb");
    navigation.navigate("ViewSingleModel", {
      title: item.title,
      username: item.username,
      status: item.status,
      date: item.date,
      glbUrl: textured_mesh_glbUrl,
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <Text style={styles.title}>{item?.title}</Text>
      {imageUrl && (
        <View style={styles.imgContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      )}
    </TouchableOpacity>
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
