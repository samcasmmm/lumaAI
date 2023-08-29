import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Video from "react-native-video";
import { useSelector } from "react-redux";
import { selectSaveRecordingData } from "../app/features/camera/cameraSlice";

const VideoViewer = () => {
  const navigation = useNavigation();
  const videoRef = useRef();
  const videoData = useSelector(selectSaveRecordingData);

  const handleBackPress = () => {
    navigation.navigate("Home");
  };

  return (
    <View>
      <Text>VideoViewer</Text>
      <Video
        source={{ uri: videoData?.path }}
        ref={videoRef}
        style={{ width: "100%", height: 200 }}
      />

      <Button title="Go back to Home" onPress={handleBackPress} />
    </View>
  );
};

export default VideoViewer;

const styles = StyleSheet.create({});
