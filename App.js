import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import OrderSuccessScreen from "./screens/OrderCompleteScreen";
import ProductsScreen from "./screens/ProductScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import { theme } from "./constants/theme";
import { hp } from "./helpers/common";
import Toast from "./components/Toast";

const CustomTabButton = ({ title, onPress, isActive }) => {
  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
    >
      <Text
        style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const [currentTab, setCurrentTab] = useState("Products");
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const addToCheckout = (product) => {
    setCheckoutItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === product.id);
      if (itemIndex >= 0) {
        // If item already exists, increase the quantity
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      } else {
        // If item does not exist, add it with a quantity of 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    showToast("Product added successfully!"); // Show toast message
  };

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(false); // Reset visibility state
    setTimeout(() => {
      setToastVisible(true); // Show toast after a short delay
    }, 200); // Delay to allow state reset
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const incrementQuantity = (product) => {
    setCheckoutItems((prevItems) =>
      prevItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (product) => {
    setCheckoutItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === product.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCheckout = (product) => {
    setCheckoutItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === product.id);
      if (itemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems.splice(itemIndex, 1);
        return updatedItems;
      }
      return prevItems;
    });
    showToast("Product removed successfully!"); // Show toast message
  };

  const navigateToSuccess = () => {
    setIsOrderSuccess(true);
  };

  const navigateToProducts = () => {
    setIsOrderSuccess(false);
    setCurrentTab("Products");
  };

  const renderScreen = () => {
    if (isOrderSuccess) {
      return <OrderSuccessScreen navigateToProducts={navigateToProducts} />;
    }
    switch (currentTab) {
      case "Products":
        return (
          <ProductsScreen
            addToCheckout={addToCheckout}
            checkoutItems={checkoutItems}
          />
        );
      case "Checkout":
        return (
          <CheckoutScreen
            checkoutItems={checkoutItems}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            removeFromCheckout={removeFromCheckout}
            navigateToSuccess={navigateToSuccess}
            setCheckoutItems={setCheckoutItems}
          />
        );
      default:
        return <ProductsScreen addToCheckout={addToCheckout} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}
      {!isOrderSuccess && (
        <View style={[styles.tabBar, styles.shadowProp]}>
          <CustomTabButton
            title="Products"
            onPress={() => setCurrentTab("Products")}
            isActive={currentTab === "Products"}
          />
          <CustomTabButton
            title="Checkout"
            onPress={() => setCurrentTab("Checkout")}
            isActive={currentTab === "Checkout"}
          />
        </View>
      )}
      <Toast visible={toastVisible} message={toastMessage} onHide={hideToast} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: theme.colors.dark,
    borderCurve: "continuous",
  },
  tabButton: {
    padding: 10,
    borderRadius: theme.radius.xs,
  },
  tabButtonText: {
    color: theme.colors.white,
    fontSize: hp(2),
    letterSpacing: 1,
  },
  activeTabButton: {
    backgroundColor: theme.colors.primary,
  },
  activeTabButtonText: {
    fontWeight: "bold",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 20,
    shadowColor: "#ddd",
  },
});
