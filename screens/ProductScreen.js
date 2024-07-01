import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { theme } from "../constants/theme";
import { getColumnCount, hp, wp } from "../helpers/common";
import { products } from "../constants/data";

// Function to determine number of columns

const ProductsScreen = ({ addToCheckout, checkoutItems }) => {
  const numColumns = getColumnCount();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Products</Text>
        </View>
        {checkoutItems.length > 0 && (
          <View style={styles.smallCircle}>
            <Text style={{ color: "white" }}>{checkoutItems.length}</Text>
          </View>
        )}
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <View style={styles.imgCont}>
              <Image
                resizeMode="cover"
                style={styles.imageUrl}
                source={item.image}
              />
            </View>
            <View style={styles.header}>
              <Text
                style={styles.productName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.title}
              </Text>
            </View>
            <View style={styles.header}>
              <Text
                style={{
                  fontWeight: theme.fontWeights.medium,
                  fontSize: hp(2),
                }}
              >
                ${item.price}
              </Text>
            </View>

            <View className="pt-2 flex-col items-start">
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => addToCheckout(item)}
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        key={numColumns} // Force a re-render when numColumns changes
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(3),
  },
  header: {
    paddingVertical: hp(1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(2),
  },

  title: {
    fontSize: hp(3),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
  },
  smallCircle: {
    width: 30,
    height: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.black,
  },

  productName: {
    marginTop: 4,
    fontSize: hp(2.1),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.neutral(0.9),
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.neutral(0.02),
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.xs,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(5),
  },
  closeIcon: {
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  imageUrl: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imgCont: {
    backgroundColor: theme.colors.neutral(0.1),
    width: "100%",
    height: hp(22),
    borderRadius: theme.radius.xs,
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
    overflow: "hidden",
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  product: {
    flex: 1,

    marginHorizontal: 8,
    marginBottom: wp(8),
    // height: hp(30),
    color: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    // borderCurve: "circular",
  },
  buttonStyle: {
    //  className="px-5 py-2 rounded-full  "
    backgroundColor: theme.colors.primary,
    color: "#fff",
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.2),
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: hp(1.6),
    fontWeight: theme.fontWeights.bold,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 20,
    shadowColor: "#52006A",
  },
});
