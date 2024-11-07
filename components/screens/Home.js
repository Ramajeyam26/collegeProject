import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ViewBase,
  ImageBackground,
  FlatList,
  Touchable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { Category } from "../ProductMap";
import Swiper from "react-native-swiper";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Product from "./Product";

const { width } = Dimensions.get("screen");

export default function Home({ navigation }) {
  const getData = async () => {
    try {
      const result = await axios.get("http://192.168.157.37:5000/list");
      console.log("successfully product details got");
      setProduct(result.data.data);
      // console.log(result.data.data);
      setName(result.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const getData_two = async () => {
    try {
      const request = await axios.get(
        `http://192.168.157.37:5000/brand/${brand_data}`
      );
      console.log("Brand detail goted successfully");
      if (request) {
        setBrand_detail(request.data.data);
        console.log("Successfully data get2 from database");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getData_two();
  }, []);

  const [product, setProduct] = useState([]);
  const [name, setName] = useState([]);
  const [category, setCategory] = useState("");
  const [brand_detail, setBrand_detail] = useState([]);
  const brand_data = "Swaraj";

  const HandleChange = () => {
    navigation.push("Search");
  };

  const ShowItems = ({ item }) => {
    return (
      <View className="flex justify-center items-center w-full h-full ">
        <View className="relative flex flex-row justify-center items-center w-[94%] h-[90%] rounded-md overflow-hidden">
          <View className="flex w-[100%] h-[150%] bg-black rotate-12" />
          <View
            className="flex w-[100%] h-[130%] rotate-12 mt-10"
            style={{
              backgroundColor:
                item.id == 1
                  ? item.colors
                  : item.id == 2
                  ? item.colors
                  : item.id == 3
                  ? item.colors
                  : item.id == 4
                  ? item.colors
                  : null,
            }}
          />
        </View>
        <View className=" absolute flex  w-[95%] h-[92%] rounded-md overflow-hidden shadow-lg border border-gray-100 bg-transparent">
          <View className="flex flex-row justify-between items-center w-full h-[75%]">
            <View className="flex flex-col w-[70%] h-[70%] justify-between bg-">
              <View>
                <Text
                  className="text-4xl pl-5 pt-"
                  style={{
                    color:
                      item.id == 1
                        ? item.shadow
                        : item.id == 2
                        ? item.shadow
                        : item.id == 3
                        ? item.shadow
                        : item.id == 4
                        ? item.shadow
                        : null,
                  }}
                >
                  {item.title}
                </Text>
              </View>
              <View className=" w-48 h-fit overflow-hidden overflow-ellipsis pl-10">
                <Text className="text-white text-base ">
                  {item.description}
                </Text>
              </View>
            </View>
            <View className="w-[30%] h-full  flex justify-center items-center">
              <Image
                source={item.image}
                className=" h-32 w-32 opacity-75 "
                resizeMode="cover"
              />
            </View>
          </View>
          <View className="h-[2%] w-full flex justify-center items-center">
            <View className="bg-gray-300 h-[0.5px] w-[93%]" />
          </View>
          <View className="flex flex-row w-full h-[34%] justify-end items-center pr-10 bg-">
            <View className="pb-5">
              {/* <Text className="text-base text-gray-500">View list</Text> */}
            </View>
            <View className="pb-5 pl-2">
              <TouchableOpacity
                onPress={() => {
                  // alert("button is pressed");
                }}
              >
                {/* <AntDesign name="arrowright" color={"gray"} size={25} /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <ScrollView
        className="flex w-screen h-screen bg-white"
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[
            "#A78BFA",
            "#C4B5FD",
            "#DDD6FE",
            "#EDE9FE",
            "#F5F3FF",
            "transparent",
          ]}
          style={styles.header}
        />

        {/* Header  */}
        <View className=" absolute flex flex-row w-screen h-32 bg-transparent">
          <View className="flex  w-[20%] h-full justify-center items-center ">
            <Image
              source={require("../../assets/logo-finalPNG.png")}
              className="w-28 h-16"
            />
          </View>
          <View className="flex  w-[80%] h-fit pt-10">
            <TouchableOpacity onPress={HandleChange}>
              <View className="flex flex-row justify-normal items-center w-80 h-12  rounded-xl border border-purple-500 overflow-hidden bg-white ">
                <View className="pl-7">
                  <Feather name="search" size={30} color="#d8b4fe" />
                </View>
                <View className="pl-3">
                  <Text className="text-purple-300">e.g.oil..</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Swiper  */}
        <View>
          <Swiper
            loop={true}
            containerStyle={styles.swiper}
            showsPagination={true}
            dot={
              <View
                style={{
                  backgroundColor: "rgba(156, 163, 175,.5)",
                  width: 12,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 5,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: "#1F2937",
                  width: 12,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
          >
            {Category.map((item) => {
              return <ShowItems item={item} key={item.id} />;
            })}
          </Swiper>
        </View>

        {/* Category */}
        <View className="flex flex-col h-40 w-screen justify-evenly items-start border-t-2 border-purple-200 pt-3 pb-3 bg-purple-50">
          <View className=" pl-3">
            <Text className="text-2xl font-bold pb-4">Category</Text>
          </View>
          <View className="flex flex-row justify-evenly items-center w-full h-fit ">
            <View className="bg-yellow-0 flex flex-col w-fit h-full items-center ">
              <View className=" w-16 h-16 bg-orange-200 rounded-full flex justify-center items-center overflow-hidden">
                <TouchableOpacity
                  onPress={() => {
                    setCategory("Oil");
                    // alert(category);
                    navigation.push("Category", { category_data: "Oil" });
                  }}
                >
                  <Image
                    source={require("../../assets/category/oil.png")}
                    className="w-12 h-12 opacity-80"
                  />
                </TouchableOpacity>
              </View>
              <View className="">
                <Text className=" text-lg text-black">Oil</Text>
              </View>
            </View>
            <View className="bg-yellow-0 flex flex-col w-fit h-full items-center ">
              <View className=" w-16 h-16 bg-gray-300 rounded-full flex justify-center items-center overflow-hidden">
                <TouchableOpacity
                  onPress={() => {
                    setCategory("Bearing");
                    navigation.push("Category", { category_data: "Bearing" });
                  }}
                >
                  <Image
                    source={require("../../assets/category/bearing.png")}
                    className="w-12 h-12 opacity-80"
                  />
                </TouchableOpacity>
              </View>
              <View className="">
                <Text className=" text-lg text-black">Bearing</Text>
              </View>
            </View>
            <View className="bg-yellow-0 flex flex-col w-fit h-full items-center ">
              <View className=" w-16 h-16 bg-gray-200 rounded-full flex justify-center items-center overflow-hidden">
                <TouchableOpacity
                  onPress={() => {
                    setCategory("Filter");
                    navigation.push("Category", { category_data: "Filter" });
                  }}
                >
                  <Image
                    source={require("../../assets/category/filter.png")}
                    className="w-12 h-12 opacity-80"
                  />
                </TouchableOpacity>
              </View>
              <View className="">
                <Text className=" text-lg text-black">Filter</Text>
              </View>
            </View>
            <View className="bg-yellow-0 flex flex-col w-fit h-full items-center ">
              <View className=" w-16 h-16 bg-amber-200 rounded-full flex justify-center items-center overflow-hidden">
                <TouchableOpacity
                  onPress={() => {
                    setCategory("Seal");
                    navigation.push("Category", { category_data: "Seal" });
                  }}
                >
                  <Image
                    source={require("../../assets/category/seal.png")}
                    className="w-12 h-12 opacity-80"
                  />
                </TouchableOpacity>
              </View>
              <View className="">
                <Text className=" text-lg text-black">Seal</Text>
              </View>
            </View>
            <View className=" w-16 h-16 bg-purple-500 rounded-full flex justify-center items-center">
              <TouchableOpacity
                onPress={() => {
                  setCategory("All");
                  navigation.push("Category", { category_data: "All" });
                }}
              >
                <Text className=" text-lg text-white">
                  <AntDesign name="arrowright" color={"white"} size={25} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Recently added products */}

        <View className=" w-  h-80 bg-purple-50 border-t-2 border-purple-200 pt-3 pb-3">
          <View className="pl-3 w-full h-[20%]">
            <Text className="text-2xl font-bold pb-4">
              Recently add products
            </Text>
          </View>
          <ScrollView
            className=" flex flex-row  h-[80%] bg-"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {product.map((data) => (
              <View className="flex flex-row  w-fit" key={data._id}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.push("Product", {
                      id: data._id,
                      pro_name: data.name,
                      pro_image: data.image,
                      pro_price: data.price,
                      pro_category: data.category,
                    });
                    // alert(data._id)
                  }}
                  activeOpacity={1}
                >
                  <View
                    className=" w-44 h-[90%] border border-purple-200 mx-1 rounded-lg overflow-hidden bg-white"
                    style={{ shadowColor: "purple", elevation: 3 }}
                  >
                    <View className=" w-44 h-36 flex justify-center items-center">
                      <Image
                        source={{
                          uri: `http://192.168.157.37:5000/uploads/${data.image}`,
                        }}
                        resizeMode="cover"
                        width={110}
                        height={100}
                      />
                    </View>
                    <View className="w-44 h-[30%] bg-slate-00 overflow-hidden border-t-2 border-purple-200">
                      <View className=" bg- w-full h-[50%] overflow-scroll flex justify-start items-center">
                        <Text
                          className="text-base"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {data.name}
                        </Text>
                      </View>
                      <View className="flex flex-row justify-evenly items-center w-full h-[40%] bg-slate-00">
                        <View className="w-[60%] h-full flex flex-row  justify-start items-center pl-3">
                          <View className="pt-1 pr-1">
                            <FontAwesome
                              name="rupee"
                              size={13}
                              color={"black"}
                            />
                          </View>
                          <View>
                            <Text className="text-base">{data.price}</Text>
                          </View>
                        </View>
                        <View className="flex flex-row w-[40%] h-full justify-evenly items-center ">
                          {/* <View className="flex flex-row justify-evenly"> */}
                          <View>
                            <TouchableOpacity>
                              <Feather name="heart" color={"red"} size={18} />
                            </TouchableOpacity>
                          </View>
                          <View>
                            {/* <TouchableOpacity> */}
                            <Feather
                              name="shopping-cart"
                              color={"green"}
                              size={18}
                              />
                              {/* </TouchableOpacity> */}
                          </View>
                          {/* </View> */}
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Swaraj tractor products */}

        <View className="h-80 bg-purple-50 border-t-2 border-purple-200 pt-3 pb-3 mb-8">
          <View className="pl-3 w-full h-[20%]">
            <Text className="text-2xl font-bold pb-4">Swaraj</Text>
          </View>
          <ScrollView
            className=" flex flex-row  h-[80%] bg-"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {brand_detail.map((data) => (
              <View className="flex flex-row  w-fit" key={data._id}>
                <TouchableOpacity
                  activeOpacity={1}
                      onPress={() => {
                        navigation.push("Product", {
                          id: data._id,
                          pro_name: data.name,
                          pro_image: data.image,
                          pro_price: data.price,
                          pro_category: data.category,
                        });
                      }}
                    >
                <View
                  className=" w-44 h-[90%] border border-purple-200 mx-1 rounded-lg overflow-hidden bg-white"
                  style={{ shadowColor: "purple", elevation: 3 }}
                >
                  <View className=" w-44 h-36 flex justify-center items-center">
                    <Image
                      source={{
                        uri: `http://192.168.157.37:5000/uploads/${data.image}`,
                      }}
                      // className=" object-contain  rounded-lg"
                      resizeMode="cover"
                      width={110}
                      height={100}
                    />
                  </View>
                  <View className="w-44 h-[30%] bg-slate-00 overflow-hidden border-t-2 border-purple-200">
                    
                      <View className=" bg- w-full h-[50%] overflow-scroll flex justify-start items-center">
                        <Text
                          className="text-base"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {data.name}
                        </Text>
                      </View>
                      <View className="flex flex-row justify-evenly items-center w-full h-[40%] bg-slate-00">
                        <View className="w-[60%] h-full flex flex-row  justify-start items-center pl-3">
                          <View className="pt-1 pr-1">
                            <FontAwesome
                              name="rupee"
                              size={13}
                              color={"black"}
                            />
                          </View>
                          <View>
                            <Text className="text-base">{data.price}</Text>
                          </View>
                        </View>
                        <View className="flex flex-row w-[40%] h-full justify-evenly items-center ">
                          {/* <View className="flex flex-row justify-evenly"> */}
                          <View>
                            <TouchableOpacity>
                              <Feather name="heart" color={"red"} size={18} />
                            </TouchableOpacity>
                          </View>
                          <View>
                            <Feather
                              name="shopping-cart"
                              color={"green"}
                              size={18}
                            />
                          </View>
                          {/* </View> */}
                        </View>
                      </View>
                  </View>
                </View>
                                    </TouchableOpacity>

              </View>
            ))}
          </ScrollView>
        </View>

        {/* <ScrollView className="flex flex-row h-5 overflow-y-scroll">
          <Text numberOfLines={1}>
            asaskdjfa;lkfj;lalksdjfal;kj;flkajfl;kajsd;flajsl;fkjal;sjflkasjflkjnocuhdflkajcfhlkajshflkcjhlkjasdfjkah kajhlfdk
          </Text>
        </ScrollView> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const ProductList = ({ name }) => {
  return <View></View>;
};

const styles = StyleSheet.create({
  header: {
    height: 120,
    width: width,
    position: "relative",
  },
  swiper: {
    flex: 1,
    height: 200,
    width: width,
    elevation: 20,
  },
});
