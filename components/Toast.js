// Toast.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const Toast = ({ visible, message }) => {
  const [showToast, setShowToast] = useState(visible);
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (visible) {
      setShowToast(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => setShowToast(false));
        }, 2000); // Toast visible duration
      });
    }
  }, [visible, opacity]);

  if (!showToast) {
    return null;
  }

  return (
    <Animated.View style={[styles.toast, { opacity }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 50,
    left: "50%",
    transform: [{ translateX: -150 }],
    width: 300,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});

export default Toast;
