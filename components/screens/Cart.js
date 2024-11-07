import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Network from "expo-network";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cart = () => {
  useEffect(() => {
    // console.log("Come in cart")
    getCart();

    setDiscount((rate -= rate * (10 / 100)));
    // alert(discount)
  }, []);

  const [count, setCount] = useState(1);
  let rate = 200;
  const [discount, setDiscount] = useState(rate);
  const [oneUserData, setOneUserData] = useState({});
  const [allCart, setAllCart] = useState([]);
  var actual_Price = 0;
  let pro_price = 0;
  let offer = 0;
  let each_offer = 0;
  const [actualPrice, setActualPrice] = useState(0);
  const [discountPrice, setDiscoutPrice] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [wishListStatus, setWishListStatus] = useState(false);
  var proId = "";
  const onRefresh = useCallback(() => {
    // alert("refreshing");
    setRefreshing(true);
    getCart();
    GetWishlist();
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);

  useEffect(() => {
    GetWishlist();
  }, []);

  const deleteCart = async (id) => {
    // console.log(id);
    // alert(oneUserData._id);
    try {
      const delResult = await axios.delete(
        `http://192.168.157.37:5000/cart/del-cart?proId=${id}&&userId=${oneUserData._id}`
      );
      if (delResult.data.status == "successfull") {
        // alert("Product remove from cart");
        console.log("successfully deleted");
      }
    } catch (error) {
      console.log(error);
    }
    getCart();
  };

  const getCart = async () => {
    try {

      var userId = await AsyncStorage.getItem("user_email");
                // alert(userId);

      const result = await axios.get(
        `http://192.168.157.37:5000/cart/get-cart?userId=${userId}`
      );
      console.log(result.data.data.productId[0]);
      setOneUserData(result.data.data);
      setAllCart(result.data.data.productId);
      // console.log("   hellllooooooo"+result.data.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const HandleCartRefresh = () => {
    getCart();
  };

  const PostWishlist = async (proId) => {
    try {
      var userId = await AsyncStorage.getItem("user_email");
      const WishListPost = await axios.post(
        `http://192.168.157.37:5000/wishlist/wishlist-post?userId=${userId}&&proId=${proId}`
      );
      console.log(WishListPost.data.data);
      if (WishListPost.data.status == "successfull") {
        console.log("Successfully wishlist item added");
      } else if (WishListPost.data.status == "failed") {
        console.log("Failed to add item in wishlist");
      }
    } catch (error) {
      console.log("Error has occur " + error);
    }
  };

  const GetWishlist = async () => {
    try {
      var userId = await AsyncStorage.getItem("user_email");
      const WishListGet = await axios.get(
        `http://192.168.157.37:5000/wishlist/wishlist-get?userId=${userId}`
      );
      if (WishListGet.data.status == "successfull") {
        setWishListStatus(true);
        console.log("User exist in wishlist");
      } else if (WishListGet.data.status == "failed") {
        setWishListStatus(false);
        console.log("User not exist in wishlist");
      }
    } catch (error) {
      // setWishListStatus(null);
      console.log("Error has occur " + error);
    }
  };

  const PutWishlist = async (proId) => {
    try {
      var userId = await AsyncStorage.getItem("user_email");
      const WishlistPut = await axios.put(
        `http://192.168.157.37:5000/wishlist/wishlist-update?userId=${userId}&&proId=${proId}`
      );
      console.log(WishlistPut.data +" "+userId);
    } catch (error) {
      console.log("Error has occur in update wishlist array "+error)
    }
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="flex flex-row justify-normal items-center pl- h-16 w-screen shadow-lg shadow-purple-300 bg-white z-10">
        <View>
          <Image
            source={require("../../assets/logo-finalPNG.png")}
            width={20}
            height={20}
            className=" w-28 h-16"
          />
        </View>
        <View>
          <Text className="text-4xl text-purple-500">Cart</Text>
        </View>
      </View>

      {/* cart */}
      {/* <View> */}
      <ScrollView
        className="flex bg-purple-50 h-screen"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              onRefresh();
            }}
          />
        }
        onScrollBeginDrag={HandleCartRefresh}
      >
        {/* all carts */}
        <View className="">
          {allCart.map((item) => {
            var i = 0;
            pro_price = pro_price + item.price;
            offer = offer + item.price * (10 / 100);
            each_offer = Math.round(item.price - item.price * (10 / 100));
            // console.log(pro_price);
            i++;
            return (
              <View
                className="flex flex-col h-52 bg-white w-screen mt-2"
                key={item._id}
              >
                <View className="flex flex-row w-screen h-40 bg-blue- border-b border-purple-200">
                  <View className="w-[40%] h-full flex justify-center items-center">
                    <Image
                      source={{
                        uri: `http://192.168.59.37:5000/uploads/${item.image}`,
                      }}
                      className=" w-32 h-32"
                    />
                  </View>
                  <View className="flex flex-col justify-center items-start w-screen">
                    <View className="pb-2 w-60">
                      <Text
                        className="text-lg"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.name}
                      </Text>
                    </View>
                    <View className="pb-2 flex flex-row w-screen">
                      <View className="flex flex-row w-12">
                        <View className="pt-1 pr-1">
                          <FontAwesome
                            name="rupee"
                            size={16}
                            color={"#a855f7"}
                            className="mt-5"
                          />
                        </View>
                        <Text
                          className="text-base text-purple-500  line-through"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {item.price}
                        </Text>
                      </View>
                      <View className="flex flex-row w-full pl-2">
                        <View className="pt-1 pr-1">
                          <FontAwesome
                            name="rupee"
                            size={16}
                            color={"#a855f7"}
                            className="mt-5"
                          />
                        </View>
                        <Text
                          className="text-base text-purple-500 w-10"
                          // numberOfLines={1}
                          // ellipsizeMode="tail"
                        >
                          {each_offer}
                        </Text>
                      </View>
                    </View>
                    <View className=" flex flex-row h-8 justify-center items-center w-auto bg-">
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                          setCount(count + 1);
                        }}
                      >
                        <View className="flex justify-center items-center w-7 h-7 rounded border border-purple-200 ">
                          <AntDesign name="plus" size={17} />
                        </View>
                      </TouchableOpacity>

                      <View className="w-8 h-full justify-center items-center">
                        <Text className="text-base">{count}</Text>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                          if (count > 1) {
                            setCount(count - 1);
                          }
                        }}
                      >
                        <View className="flex justify-center items-center w-7 h-7 rounded border border-purple-200 ">
                          <AntDesign name="minus" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View className="flex flex-row h-12 w-screen justify- items-center border-b border-purple-200">
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      deleteCart(item._id);
                    }}
                  >
                    <View className=" flex flex-row w-36  h-full justify-center items-center border-r border-purple-200 bg-blue-">
                      <Feather name="trash-2" size={20} color={"#f87171"} />
                      <Text className="text-red-400 pl-2">Remove</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      // alert(wishListStatus)
                      if (wishListStatus == true) {
                        alert(wishListStatus + " crt");
                        PutWishlist(item._id);
                      } else if (wishListStatus == false) {
                        PostWishlist(item._id);
                      }
                    }}
                  >
                    <View className="flex flex-row w-36 h-full justify-center items-center border-r border-purple-200">
                      <Feather name="heart" size={20} color={"#a855f7"} />
                      <Text className="text-purple-500 pl-2">Wishlist</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.8}>
                    <View className="flex flex-row w-36 h-full justify-center items-center">
                      <FontAwesome name="money" size={20} color={"#22c55e"} />
                      <Text className="text-green-500 pl-2">Buy now</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* Bill */}
        <View className="mb-32 mt-2 bg-white border-b border-purple-200">
          <View className=" w-screen h-10 flex justify-center items-start pl-1 border-b border-purple-200">
            <Text className="text-xl">Price Details</Text>
          </View>
          <View className="flex flex-col justify-evenly h-24 w-screen pt-2">
            <View className="flex flex-row w-screen justify-between px-3">
              <View className="flex ">
                <Text className="text-base">Price</Text>
              </View>
              <View className="flex flex-row">
                <View className="pt-1 pr-1 ">
                  <Text>
                    <FontAwesome
                      name="rupee"
                      size={16}
                      className="right-2 top-1"
                    />
                  </Text>
                </View>
                <View>
                  <Text className="text-base ">{pro_price}</Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row w-screen justify-between px-3">
              <View>
                <Text className="text-base">Discount</Text>
              </View>
              <View className="flex flex-row">
                <View>
                  <Text className="text-lg bottom-1 right-1 text-purple-500">
                    -
                  </Text>
                </View>
                <View className="pt-1 pr-1 ">
                  <Text className="text-purple-500">
                    <FontAwesome
                      name="rupee"
                      size={16}
                      className="right-2 top-1"
                    />
                  </Text>
                </View>
                <View>
                  <Text className="text-base text-purple-500">
                    {Math.round(offer)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="flex flex-row w-screen h-12 justify-between items-center px-3 border-t border-dashed border-purple-200">
            <View>
              <Text className="text-base font-bold">Total Amout</Text>
            </View>
            <View className="flex flex-row">
              <View className="pt-1 pr-1 ">
                <Text>
                  <FontAwesome
                    name="rupee"
                    size={16}
                    className="right-2 top-1"
                  />
                </Text>
              </View>
              <View>
                <Text className="text-base font-bold">{pro_price - offer}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default Cart;
