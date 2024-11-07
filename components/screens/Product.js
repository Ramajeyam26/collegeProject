import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Product = ({ route, navigation }) => {
  const { id, pro_name, pro_image, pro_price, pro_category } = route.params;

  //useState

  const [price, setPrice] = useState(pro_price);
  const [pro_disco, setPro_disco] = useState();
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [description, setDescription] = useState();
  const [status, setStatus] = useState("add_to_cart");
  const [productIds, setProductIds] = useState();
  const [wishListStatus, setWishListStatus] = useState(false);
  const [showWishList, setShowWishList] = useState(false);
  const [wishlist, setWishList] = useState([]);
  const [userStatus, setUserStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [cartUser, setCartUser] = useState([]);
  var swishlist;
  //useEffect

  useEffect(() => {
    GetData();
    Discount();
    SetDescription();
  }, [price, status]);

  useEffect(() => {
    getCartUser();
  }, []);

  useEffect(() => {
    CheckCartPost();
  }, [status]);

  useEffect(() => {
    GetWishlist();
  }, []);

  const Discount = () => {
    const price_discout = (10 / 100) * price;
    setPro_disco(price - price_discout);
  };

  const HandleChange = () => {
    navigation.push("Search");
  };

  //getdata

  const GetData = async () => {
    var UsId = await AsyncStorage.getItem("user_email");
    setUserId(UsId);
    try {
      // console.log(id);
      const result = await axios.get(`http://192.168.157.37:5000/list/${id}`);
      if (result.data.status == "sended") {
        setData(result.data.data);
        setCategory(result.data.data.category);
      } else if (result.data.status == "failed") {
        console.log(result.data + " " + result.data.status);
      }
    } catch (error) {
      console.log(error);
    }

    console.log(UsId);
  };

  //Description

  const SetDescription = () => {
    if (pro_category == "Filter") {
      setDescription(
        "Filter tractors  by brand and model to explore options from reputable manufacturers known for their quality, reliability, and after-sales support."
      );
    } else if (pro_category == "Seal") {
      setDescription(
        " It is typically made of durable rubber or elastomer material, designed to withstand the harsh conditions and high temperatures encountered in agricultural operations."
      );
    } else if (pro_category == "Oil") {
      setDescription(
        "Tractor engine oil, also known simply as tractor oil or lubricating oil, is a specialized fluid formulated to provide optimal lubrication and protection for the engine of a tractor."
      );
    } else if (pro_category == "Bearing") {
      setDescription(
        " Bearings are designed to withstand specific loads, speeds, and operating conditions. "
      );
    }
  };

  //post api for cart details

  const PostCart = async () => {
    // var userId = await AsyncStorage.getItem("user_email");
    try {
      const cart_result = await axios.post(
        `http://192.168.157.37:5000/api/post-cart?proId=${id}&&userId=${userId}`
      );
      if (cart_result.data.status == "successfully") {
        console.log("Cart id post successfully");
      } else if (cart_result.data.status == "failed") {
        console.log("Cart id Post is failed");
      }
    } catch (error) {
      console.log("Error has occur in post cart details " + error);
    }
    setStatus("go_to_cart");
    CheckCartPost();
  };

  //get api for cart details

  const CheckCartPost = async () => {
    // var userId = await AsyncStorage.getItem("user_email");
    // console.log("  helllo"+id)
    try {
      const postStatus = await axios.get(
        `http://192.168.157.37:5000/api/post-cart?userId=${userId}&&proId=${id}`
      );
      console.log("Checkcart post " + postStatus);
      // setProductIds(postStatus.data.data.productId);
      if (postStatus.data.status == "not_available") {
        setStatus("add_to_cart");
      } else if (postStatus.data.status == "available") {
        setStatus("go_to_cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getCart detail

  const getCartUser = async () => {
    // var userId = await AsyncStorage.getItem("user_email");
    try {
      const result = await axios.get(
        `http://192.168.157.37:5000/user_cart/getuser?userId=${userId}`
      );

      console.log("getdata from cart " + result.data.status);
      var cartState;
      for (let index = 0; index < cartUser.length; index++) {
        if (cartUser[index] == id) {
          cartState = true;
          break;
        }
      }

      if (result.data.status == "successfull") {
        console.log("exist");
        setUserStatus("Exist");
      }
      if (result.data.status == "NotFound") {
        console.log("Not Found");
        setUserStatus("Notfound");
      }
    } catch (error) {
      if (error.response) {
        console.log("Error on response " + error.response);
      } else if (error.request) {
        console.log("Error on request " + error.request);
      } else {
        console.log("Axios error " + error.message);
      }

      console.log(error);
    }
  };

  //update cart
  const UpdateCart = async () => {
    var productState;
    // var userId = await AsyncStorage.getItem("user_email");
    for (let index = 0; index < cartUser.length; index++) {
      if (cartUser[index] == id) {
        productState = true;
        break;
      }
    }

    try {
      const updateResult = await axios.put(
        `http://192.168.157.37:5000/user_cart/updateuser?proId=${id}&&userId=${userId}`
      );

      console.log(updateResult.data);
    } catch (error) {
      console.log(error);
    }
    // }
    CheckCartPost();
    setStatus("go_to_cart");
  };

  //wishlist api

  const GetWishlist = async () => {
    try {
      // var userId = await AsyncStorage.getItem("user_email");
      const WishListGet = await axios.get(
        `http://192.168.157.37:5000/wishlist-three/wishlist-get?userId=${userId}`
      );
      if (WishListGet.data.status == "successfull") {
        setWishListStatus(true);
        setWishList(WishListGet.data.data.wishProductId);
        console.log("User exist in wishlist");
        // console.log(WishListGet.data.data.wishProductId);
      } else if (WishListGet.data.status == "failed") {
        setWishListStatus(false);
        console.log("User not exist in wishlist " + wishListStatus);
      }
    } catch (error) {
      console.log("Error has occur " + error);
    }
    CheckWishlist();
  };

  const PutWishlist = async () => {
    try {
      // var userId = await AsyncStorage.getItem("user_email");
      const WishlistPut = await axios.put(
        `http://192.168.157.37:5000/wishlist/wishlist-update?userId=${userId}&&proId=${id}`
      );
      if (WishlistPut.data.status == "failed") {
      } else {
      }
      console.log("Wishlist updated successfully");
      console.log(WishlistPut.data + " " + userId);
    } catch (error) {
      console.log("Error has occur in update wishlist array " + error);
    }
    GetWishlist();
    CheckWishlist();
  };

  const PostWishlist = async () => {
    try {
      // var userId = await AsyncStorage.getItem("user_email");
      const WishListPost = await axios.post(
        `http://192.168.157.37:5000/wishlist/wishlist-post?userId=${userId}&&proId=${id}`
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
    GetWishlist();
    CheckWishlist();
  };

  const CheckWishlist = () => {
    for (let index = 0; index < wishlist.length; index++) {
      if (wishlist[index] == id) {
        setShowWishList(true);
        swishlist = true;
        break;
      } else {
        // alert("false");
        // setShowWishList(false);
        // swishlist = false;
      }
    }
  };

  const AddWishList = () => {
    return <FontAwesome name="heart" size={25} color={"red"} />;
  };

  const RemoveWishList = () => {
    return <FontAwesome name="heart" size={25} color={"red"} />;
  };
  return (
    <SafeAreaView className="bg-white">
      {/* Header */}
      <View
        className="w-screen h-16 flex flex-row justify-normal items-center pl-5 "
        style={styles.header}
      >
        <View className="pr-5">
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
          >
            <AntDesign name="arrowleft" size={25} color={"black"} />
          </TouchableOpacity>
        </View>
        <View className="flex h-fit pt-1">
          <TouchableOpacity onPress={HandleChange}>
            <View className="flex flex-row justify-normal items-center w-80 h-10 bg-white rounded-xl border border-purple-200 overflow-hidden ">
              <View className="pl-7">
                <Feather name="search" size={30} color="#8336FE" />
              </View>
              <View className="pl-3">
                <Text>e.g.oil..</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex w-screen h-screen">
        {/* Image show */}
        <View className="flex w-full h-3/6 justify-center items-center bg-blue- border-b-2 border-purple-200">
          <View>
            <Image
              source={{
                uri: `http://192.168.157.37:5000/uploads/${pro_image}`,
              }}
              width={300}
              height={300}
            />
          </View>
          <View className="absolute top-6 right-8 flex justify-start items-end w-full h-full">
            {/* if (showWishList==true) {} else {} */}
            <TouchableOpacity
              onPress={() => {
                if (wishListStatus == true) {
                  PutWishlist();
                } else if (wishListStatus == false) {
                  PostWishlist();
                }
              }}
              activeOpacity={0.8}
            >
              <Text>
                {showWishList == true ? AddWishList() : RemoveWishList()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content view */}

        <View className=" w-full h-fit bg-purple-50 pt-3 ">
          <View>
            <Text className="tracking-wide text-3xl ">{pro_name}</Text>
          </View>
          <View className="pt-2 pl-2">
            <Text className="text-xl">{description}</Text>
          </View>
          <View className=" flex flex-row h-16 w-full justify-between items-center ">
            <View className="flex flex-row w-40 justify-evenly ">
              <View className="flex flex-row">
                <View className="pt-1.5">
                  <FontAwesome name="rupee" color={"#9ca3af"} size={18} />
                </View>
                <View>
                  <Text className="line-through text-gray-400 text-2xl">
                    {price}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row">
                <View className="pt-1.5">
                  <FontAwesome name="rupee" color={"black"} size={18} />
                </View>
                <View>
                  <Text className="text-2xl">{pro_disco}</Text>
                </View>
              </View>
            </View>
            <View className="w-40 h-fit flex flex-row justify- items-center">
              <View className=" w-12 h-7 bg-purple-500 flex justify-center items-center rounded">
                <Text className="text-xl text-white font-bold">10%</Text>
              </View>
              <View className="pt-">
                <Text className="text-xl pl-1 text-purple-500">Discount</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Additional content */}
        <View className="flex flex-col h-screen w-screen border-2 border-purple-200 pt-3 bg-purple-50">
          <View className="border-b-0 border-purple-200 pb-3">
            <Text className="text-xl text-purple-500">Available Feathers</Text>
          </View>
          <View className="flex flex-row justify-evenly items-center h-16 w-screen bg-white">
            <View className="flex justify-center items-center">
              <View>
                <Feather name="repeat" size={22} color={"#a855f7"} />
              </View>
              <View>
                <Text>Return policy</Text>
              </View>
            </View>
            <View className=" w-1 h-full bg-purple-50" />
            <View className="flex justify-center items-center">
              <View className=" w-8 h-7 bg-purple-500 rounded-lg flex justify-center items-center">
                <FontAwesome name="rupee" color={"white"} size={18} />
              </View>
              <View>
                <Text>Cash on delivery</Text>
              </View>
            </View>
            <View className=" w-1 h-full bg-purple-50" />
            <View className="flex justify-center items-center">
              <View>
                <FontAwesome name="ticket" color={"#a855f7"} size={22} />
              </View>
              <View>
                <Text>Coupon Cade</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}

        <View className="w-screen h-[100%] absolute flex justify-end items-end -mt-16">
          <View className="flex flex-row justify-evenly items-center h-14 w-screen  ">
            <View className="w-1/2 h-full flex justify-center items-center bg-blue-500">
              <TouchableOpacity
                onPress={() => {
                  if (status == "add_to_cart") {
                    if (userStatus == "Exist") {
                      UpdateCart();
                    } else if (userStatus == "Notfound") {
                      PostCart();
                    }
                  } else {
                    navigation.navigate("Cart");
                  }
                  // getCartUser();
                }}
              >
                <Text className="text-xl text-white">
                  {status == "add_to_cart" ? "Add to Cart" : "Go to Cart"}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-0.5 h-full bg-purple-300"></View>
            <View className="w-1/2 h-full flex justify-center items-center bg-green-500 ">
              <TouchableOpacity
                onPress={() => {
                  console.log(cartUser);
                }}
              >
                <Text className="text-xl text-white">Buy now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Product;
const styles = StyleSheet.create({
  header: {
    shadowColor: "gray",
    elevation: 5,
    backgroundColor: "white",
  },
});
