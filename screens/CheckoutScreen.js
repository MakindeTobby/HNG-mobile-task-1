import React, { memo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";

const CheckoutItem = ({
  item,
  removeFromCheckout,
  incrementQuantity,
  decrementQuantity,
}) => (
  <View style={styles.itemContainer}>
    <Image style={styles.itemImage} source={item.image} />

    <View style={styles.contentBox}>
      <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
      <View style={styles.header}>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text>x{item.quantity}</Text>
      </View>

      <View style={styles.btnCont}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            disabled={item.quantity <= 1}
            onPress={() => decrementQuantity(item)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => incrementQuantity(item)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => removeFromCheckout(item)}
          style={styles.removeButton}
        >
          <Text style={styles.removeButtonText}>x</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const CheckoutScreen = ({
  checkoutItems,
  removeFromCheckout,
  incrementQuantity,
  decrementQuantity,
  navigateToSuccess,
  setCheckoutItems,
}) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Your Cart</Text>
      </View>
    </View>
    {checkoutItems.length === 0 ? (
      <View style={styles.emptyContainer}>
        <View>
          <Image
            style={styles.cartCont}
            source={require("../assets/icons/cart.png")}
          />
        </View>
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      </View>
    ) : (
      <>
        <FlatList
          data={checkoutItems}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CheckoutItem
              item={item}
              removeFromCheckout={removeFromCheckout}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />
          )}
          getItemLayout={(data, index) => ({
            length: 88, // Adjust according to item height
            offset: 88 * index,
            index,
          })}
        />
        <View>
          <Pressable
            style={styles.startButton}
            onPress={() => {
              setCheckoutItems([]);
              navigateToSuccess();
            }}
          >
            <Text style={styles.startText}>CHECK OUT</Text>
          </Pressable>
        </View>
      </>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: hp(3),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#4B5563",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  contentBox: {
    flex: 1,
    marginLeft: 10,
  },
  itemImage: {
    height: 56,
    width: 56,
    borderRadius: 10,
  },
  itemTitle: {
    fontWeight: "bold",
    color: "#4B5563",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginVertical: 5,
  },
  quantityButton: {
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 5,
    backgroundColor: theme.colors.dark,
    marginHorizontal: 1,
  },
  header: {
    paddingVertical: hp(0.8),
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "white",
    fontSize: 15,
  },
  itemQuantity: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemPrice: {
    fontWeight: "600",
    fontSize: 16,
  },
  removeButton: {
    position: "absolute",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    bottom: 0,
    right: 0,
  },
  removeButtonText: {
    color: "white",
  },
  startButton: {
    marginBottom: 5,
    backgroundColor: theme.colors.primary,
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  startText: {
    color: theme.colors.white,
    fontSize: hp(2),
    letterSpacing: 1,
    alignSelf: "center",
  },
  cartCont: {
    width: 100,
    height: 100,
  },
});

export default CheckoutScreen;
