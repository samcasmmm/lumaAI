import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  saveRecordingDetails,
  selectSaveRecordingData,
} from "../app/features/camera/cameraSlice";
import { formatTime } from "../utils/TimerCounter";
const CameraScreen = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef();
  const cameraRef = useRef(null);

  const videoDetails = useSelector(selectSaveRecordingData);
  const dispatch = useDispatch();
  const Navigation = useNavigation();

  const startTimer = () => {
    setIsTimerRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    clearInterval(intervalRef.current);
    setSeconds(0);
  };

  const toggleTimer = () => {
    if (isTimerRunning) {
      stopTimer();
      StopRecording();
    } else {
      startTimer();
      StartRecording();
    }
  };

  const StartRecording = () => {
    cameraRef.current.startRecording({
      flash: "off",
      onRecordingFinished: async (video) => {
        const codecs = await cameraRef.current.getAvailableVideoCodecs("mp4");
        dispatch(
          saveRecordingDetails({
            duration: video.duration,
            path: video.path,
            size: video.size,
            codecs: codecs,
          })
        );

        console.log(videoDetails);
        Navigation.navigate("VideoViewer");
      },
      onRecordingError: (error) => console.error(error),
    });
  };
  const StopRecording = async () => {
    await cameraRef.current.stopRecording();
  };

  const checkPermission = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();

    if (cameraPermission === "authorized") {
      // Permissions are granted, continue with camera usage
      console.log("Camera Open");
    } else {
      // Permissions are not granted, request them here
      const cameraPermissionResult = await Camera.requestCameraPermission();
      const microphonePermissionResult =
        await Camera.requestMicrophonePermission();

      if (cameraPermissionResult === "authorized") {
        // Permissions granted, proceed
      } else {
        // Permissions still not granted, handle this case
      }
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  if (device == null) return <Text style={{ color: "white" }}>Loading</Text>;
  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>
        CameraScreen :: {formatTime(seconds)}
      </Text>
      <View style={styles.timerContainer}>
        <View
          style={[
            styles.timerDot,
            { backgroundColor: isTimerRunning ? "#ff0037" : "#ccc" },
          ]}
        />
        <Text style={{ color: "white", marginRight: 5 }}>
          {formatTime(seconds)}
        </Text>
      </View>

      <Camera
        ref={cameraRef}
        style={styles.CameraVideo}
        device={device}
        isActive={true}
        video={true}
      />
      <View>
        <TouchableOpacity style={styles.camBtn} onPress={toggleTimer} />
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerContainer: {
    backgroundColor: "rgba(0,0,0,.5)",
    position: "absolute",
    top: 50,
    right: 10,
    width: 80,
    padding: 7,
    zIndex: 5,
    borderRadius: 15,
    borderColor: "#fff",
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  timerDot: {
    width: 10,
    height: 10,
    borderRadius: 30,
  },
  CameraVideo: { width: "100%", height: "100%" },

  camBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "#ff0037",
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
});
