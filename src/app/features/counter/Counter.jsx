import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset, selectCount } from "./counterSlice";

const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <View>
      <Text>{count}</Text>
      <Button
        title="Increment"
        onPress={() => {
          dispatch(increment());
        }}
      />
      <Button
        title="Decrement"
        onPress={() => {
          dispatch(decrement());
        }}
      />
      <Button
        title="Reset"
        onPress={() => {
          dispatch(reset());
        }}
      />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({});
