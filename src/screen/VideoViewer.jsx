import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const VideoViewer = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate("Home");
  };

  return (
    <View>
      <Text>VideoViewer</Text>

      <Button title="Go back to Home" onPress={handleBackPress} />
    </View>
  );
};

export default VideoViewer;

const styles = StyleSheet.create({});
