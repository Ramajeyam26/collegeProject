import React, { useEffect, useState } from "react";
import { ProductData } from "./SildebarData";
import { TiPlus, TiMinus } from "react-icons/ti";
import axios, { all } from "axios";
import { Link, Outlet, useNavigate, useNavigation } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";

export default function Productlist() {
  const [allProduct, setAllProduct] = useState([]);
  const [pro_name, setPro_name] = useState("");
  const [pro_category, setPro_category] = useState("");
  const [pro_count, setPro_count] = useState(0);
  const cont = { nam: "ram" };
  const [ID, setId] = useState();
  const navigate = useNavigate();
  const [demo, setDemo] = useState("hello");
  useEffect(() => {
    showData();
  }, []);

  const showData = async () => {
    const result = await axios.get("http://localhost:5000/product");
    console.log(result);
    setAllProduct(result.data.data);
  };

  const deleteHandle = async (id) => {
    axios
      .delete("http://localhost:5000/product/" + id)
      .then((res) => {
        console.log("deleted successfully");
        alert("Product detail is deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div className="flex justify-center items-center flex-col w-full    ">
      {/* <div className=" sticky top-0"> */}
        <div className="flex w-full h-full justify-start items-start py-5 pl-10 sticky top-0 bg-white z-10">
          <p className="text-2xl text-gray-500">Product List</p>
        </div>
        <div className=" w-full h-full  sticky top-[72px]">
          <hr className="h-1 w-full bg-purple-500" />
        </div>
      {/* </div> */}
      <div className=" top-28  sticky  flex flex-row w-[95%] h-10 text-white justify-stretch items-center rounded-sm mt-7 mb-5 bg-gradient-to-b from-purple-500 via-purple-400 to-purple-500  shadow-lg shadow-purple-300 text-xl z-10">
        <p className="pl-24">Category</p>
        <p className="pl-52">Product Name</p>
        <p className=" pl-44">Count</p>
        <p className=" pl-20">Price</p>
        <p className="pl-20">Options</p>
      </div>

      {allProduct.map((data, _id) => {
        return (
          <div
            className="flex bg-transparent w-[95%] h-16  mb-5 text-gray-500"
            key={_id}
          >
            <form className="flex flex-row rounded-sm  w-full h-full justify-evenly items-center shadow-md shadow-gray-300  hover:scale-[1.005]">
              <div>
                <input
                  defaultValue={data.category}
                  type="text"
                  name="category"
                  disabled={true}
                  placeholder="loading..."
                  value={data.category}
                  onChange={(e) => setPro_category(e.target.value)}
                  className="border-2 border-gray-200 text-center   outline-gray-200 bg-transparent py-2 px-2  rounded-md text-md text-blue-dark placeholder:text-center  "
                />
              </div>
              <div>
                <input
                  type="text"
                  name="product_name"
                  disabled={true}
                  value={data.name}
                  onChange={(e) => {
                    setPro_name(e.target.value);
                  }}
                  placeholder="loading..."
                  className="border-2 text-md border-gray-200 py-2 px-2 outline-gray-200 placeholder:text-center bg-transparent rounded-md w-96 text-center"
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                <input
                  type="number"
                  name="count"
                  disabled={true}
                  value={data.count}
                  onChange={(e) => {
                    setPro_count(e.target.value);
                  }}
                  placeholder="loading..."
                  className="border-2 border-gray-200  text-md outline-gray-200 bg-transparent placeholder:text-center py-2 px-2 rounded-md  w-28 text-center"
                />
              </div>
              <div className="flex flex-row justify-center items-center border-2 border-gray-200 rounded-md ">
                <div>
                  <span className="text-lg  w-full h-full">
                    <MdCurrencyRupee />
                  </span>
                </div>
                <input
                  type="number"
                  name="count"
                  disabled={true}
                  value={data.price}
                  onChange={(e) => {
                    setPro_count(e.target.value);
                  }}
                  placeholder="loading..."
                  className=" text-md outline-gray-200 bg-transparent placeholder:text-center py-2   w-20 text-center"
                />
              </div>
              <div className=" w-fit h-fit px-3 py-1 rounded-md bg-white ">
                <div className=" font-bold text-green-500">
                  <Link to={`/update-detail/${data._id}`}>
                    <span className="text-2xl">
                      <MdEdit />
                    </span>
                  </Link>
                </div>
              </div>
              <div className=" flex justify-center items-center w-16 h-8  rounded-md bg-white shadow-[inner_0_35px_60px_-15px_rgba(43,54,34,0.3)] ">
                <button
                  className="text-red-500 font-bold "
                  onClick={() => {
                    deleteHandle(data._id);
                  }}
                >
                  <span className="text-2xl">
                    <MdDelete />
                  </span>
                </button>
              </div>
            </form>
          </div>
        );
      })}
    </div>
  );
}
