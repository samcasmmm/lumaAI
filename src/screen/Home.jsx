import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAPIKEY } from "../app/features/camera/cameraSlice";
import {
  useGetCreditsQuery,
  useGetAllCaptureQuery,
} from "../app/features/camera/captureApiSlice";
import Card from "../components/Card";

const Home = () => {
  const [captureData, setCaptureData] = useState([]);
  const APIKEY = useSelector(selectAPIKEY);
  const { data: creditsData } = useGetCreditsQuery(APIKEY);

  const {
    data: getAllCapture,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllCaptureQuery(APIKEY);

  const fetchCaptureData = async () => {
    try {
      if (!isLoading && getAllCapture) {
        const filteredData = getAllCapture.captures.filter(
          (item) =>
            item.status === "complete" && item.latestRun.status === "finished"
        );
        setCaptureData(filteredData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCaptureData();
  }, [isLoading, getAllCapture]);

  const renderItem = ({ item }) => <Card item={item} />;
  const LoadingView = () => {
    return <ActivityIndicator />;
  };
  const NotingToShow = () => {
    return (
      <View style={styles.container}>
        <Text style={{ color: "black" }}>
          Noting To Show ! Please Record a Capture
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Captures</Text>
      <View style={styles.ListContainer}>
        {isLoading && <LoadingView />}
        {!APIKEY && <NotingToShow />}
        {!isFetching && (
          <FlatList
            data={captureData}
            renderItem={renderItem}
            keyExtractor={(item) => item.uuid}
            style={{ width: "100%" }}
            refreshing={isFetching}
            onRefresh={() => fetchCaptureData()}
          />
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeee",
    width: "100%",
  },
  title: {
    width: "100%",
    padding: 10,
    textAlign: "center",
    backgroundColor: "#059669",
    color: "#Fff",
  },
  ListContainer: {
    flex: 1,
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
  },
});
