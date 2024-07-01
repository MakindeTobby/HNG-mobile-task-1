import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";

const OrderSuccessScreen = ({ navigateToProducts }) => {
  return (
    <ImageBackground
      source={require("../assets/images/lady.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>Success!</Text>
        <View>
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              marginBottom: 20,
              fontSize: 15,
            }}
          >
            Your order will be delivered soon. Thank you for choosing our app!
          </Text>
        </View>
        <View>
          <Pressable style={styles.startButton} onPress={navigateToProducts}>
            <Text style={styles.startText}>CONTINUE SHOPPING</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Optional: Adds a semi-transparent overlay
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 28,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
  },
  startButton: {
    marginBottom: 5,
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  startText: {
    color: theme.colors.white,
    fontSize: hp(2),
    letterSpacing: 1,
    alignSelf: "center",
  },
});
