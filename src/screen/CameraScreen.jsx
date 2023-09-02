import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Button,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import {
  saveRecordingDetails,
  selectSaveRecordingData,
  selectAPIKEY,
  clearRecordingDetails,
} from "../app/features/camera/cameraSlice";
import {
  useCreateCaptureMutation,
  useUploadCaptureMutation,
  useTriggerCaptureMutation,
} from "../app/features/camera/captureApiSlice";
import Video from "react-native-video";
import { formatTime } from "../utils/TimerCounter";
const CameraScreen = () => {
  const devices = useCameraDevices();
  const device = devices.back;

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isflashOn, setIsflashOn] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [videoName, setVideoName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const intervalRef = useRef();
  const cameraRef = useRef(null);
  const videoRef = useRef();

  const videoDetails = useSelector(selectSaveRecordingData);
  const APIKEY = useSelector(selectAPIKEY);

  const [createCapture] = useCreateCaptureMutation();
  const [uploadCapture] = useUploadCaptureMutation();
  const [triggerCapture] = useTriggerCaptureMutation();

  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  const StartRecording = async () => {
    const codecs = await cameraRef.current.getAvailableVideoCodecs("mp4");
    cameraRef.current.startRecording({
      flash: isflashOn ? "on" : "off",
      onRecordingFinished: async (video) => {
        await dispatch(
          saveRecordingDetails({
            duration: video.duration,
            path: video.path,
            size: video.size,
            codecs: codecs,
          })
        );
        console.log(videoDetails);
        setModalVisible(true);
      },
      onRecordingError: (error) => console.error(error),
    });
  };
  const StopRecording = async () => {
    await cameraRef.current.stopRecording();
    // dispatch(clearRecordingDetails());
    // console.log("Recording data cleared");
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

  const handleUploadCapture = async () => {
    setIsLoading(true);
    try {
      console.log(`${videoName} - ${APIKEY}`);
      await createCapture({
        title: videoName,
        key: APIKEY,
      })
        .then(async (res) => {
          console.log(res.data);
          await uploadCapture({
            url: res.data.signedUrls?.source,
            videoPath: videoDetails.path,
          });
          return res;
        })
        .then(async (res) => {
          console.log("trigger-res", res);
          const triggerRes = await triggerCapture({
            slug: res.data.capture.slug,
            key: APIKEY,
          });
          console.log(triggerRes);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("catch1", err);
          setIsLoading(false);
        });
    } catch (error) {
      console.log("catch2", error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkPermission();
  }, []);

  if (device == null) return <Text style={{ color: "white" }}>Loading</Text>;
  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>
        CameraScreen : {formatTime(seconds)}
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
      <View style={styles.flashContainer}>
        <IoniconsIcon
          name="flash"
          size={30}
          color={isflashOn ? "#ff0037" : "#ccc"}
          onPress={() => setIsflashOn(!isflashOn)}
        />
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{
                color: "#059669",
                fontWeight: "bold",
                padding: 5,
                fontSize: 16,
              }}
            >
              Do you to want upload this ?
            </Text>
            <View
              style={{
                width: "100%",
                height: 300,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Video
                source={{ uri: videoDetails?.path }}
                ref={videoRef}
                style={{
                  width: 200,
                  height: 280,
                }}
              />
            </View>
            <TextInput
              placeholder="Enter video name"
              value={videoName}
              onChangeText={setVideoName}
              style={{
                width: "92%",
                height: 40,
                margin: 8,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 10,
                color: "#000000",
              }}
            />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={{
                  width: "45%",
                  backgroundColor: "#059669",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => handleUploadCapture()}
              >
                {!isLoading ? (
                  <Text
                    style={{
                      textAlign: "center",
                      padding: 8,
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    Upload
                  </Text>
                ) : (
                  <ActivityIndicator />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "45%", backgroundColor: "#059669" }}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    padding: 8,
                    fontWeight: "bold",
                    color: "#ffffff",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    width: "100%",
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
  flashContainer: {
    position: "absolute",
    top: 100,
    right: 10,
    width: 60,
    padding: 7,
    zIndex: 5,
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

  modalContainer: {
    backgroundColor: "#fff",
    padding: 10,
    width: "100%",
    // height: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  modalContent: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
