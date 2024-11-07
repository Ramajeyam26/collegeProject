import React, { useState } from "react";
import axios from "axios";
import { BsCurrencyRupee } from "react-icons/bs";
import { useLocation } from "react-router-dom";

export default function AddProduct(props) {
  // const loacation = useLocation();
  // const data = loacation.state.data;

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [brand, setBrand] = useState("");
  const [count, setCount] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState();
  var rupeeIcon = <BsCurrencyRupee size={20} />;
  const submitHandle = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("code", code);
    formData.append("brand", brand);
    formData.append("count", count);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("price", price);

    axios
      .post("http://localhost:5000/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "ok") {
          alert("successfully product detail is added");
        } else {
          alert("unsuccessfully product detail is added");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addHandle = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  // const formData = new FormData();

  return (
    <div className="container flex-1 font-trebuchet text-gray-500 bg-transparent h-[695px] w-full ">
      <div className="flex justify-start items-start py-5 pl-10">
        <h1 className="text-2xl ">Add Product Details</h1>
      </div>
      <div>
        <hr className="h-1 w-full bg-purple-500" />
      </div>
      <form
        onSubmit={submitHandle}
        className="flex justify-center items-center "
      >
        <div className=" flex flex-col justify-center items-center w-[58rem] h-full ">
          {/* Row one */}
          <div className="flex flex-row w-full h-16 justify-start items-end">
            <div className="flex flex-row pl- justify-start items-end w-full h-fit ">
              <div className="text-lg pr-5 text-purple-500  ">Name:</div>
              <div>
                <input
                  type="text"
                  placeholder="Enter the product name"
                  required={true}
                  className="w-[30rem] h-fit py-1.5 rounded-md placeholder:text-center placeholder:text-gray-500 border-2 border-purple-500 focus:shadow-inner focus:shadow-purple-300 text-center outline-purple-500"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row pl- justify-evenly  w-full h-fit items-end">
              <div className="text-lg pr- text-purple-500  ">Part.no:</div>
              <div>
                <input
                  type="text"
                  placeholder="Enter the part number name"
                  required={true}
                  className="w-[15rem] h-fit py-1.5 rounded-md placeholder:text-center placeholder:text-gray-500 border-2 border-purple-500 text-center outline-purple-500 focus:shadow-inner focus:shadow-purple-300 "
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Row one end */}
          {/* Row two start  */}
          <div className="flex flex-row w-full h-16 justify-start items-end ">
            <div className="flex flex-row  justify-start items-end w-full h-fit">
              <div className="text-lg  text-purple-500 pr-5  ">Brand:</div>
              <input
                type="text"
                placeholder="Enter the Brand"
                required={true}
                className="w-[12rem] h-fit py-1.5 rounded-md placeholder:text-center placeholder:text-gray-500 border-2   border-purple-500 text-center outline-purple-500 focus:shadow-inner focus:shadow-purple-300"
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-evenly w-full h-fit items-end">
              <div className="text-lg  text-purple-500 pr-3">Count:</div>
              <input
                type="number"
                placeholder="Enter the count"
                required={true}
                className="w-[10rem] h-fit py-1.5 rounded-md placeholder:text-center placeholder:text-gray-500 border-2 border-purple-500 text-center outline-purple-500  focus:shadow-inner focus:shadow-purple-300"
                onChange={(e) => setCount(e.target.value)}
              />
            </div>
            <div className="flex flex-row  justify-evenly w-full h-fit items-end">
              <div className="text-lg  text-purple-500  pr-">Category:</div>
              <select
                required={true}
                onChange={(e) => setCategory(e.target.value)}
                className="w-[12rem] h-fit py-2 mr-4 rounded-md placeholder:text-center placeholder:text-gray-500 border-2 border-purple-500 text-center outline-purple-500 focus:shadow-inner focus:shadow-purple-300 "
              >
                <option disabled={true} value="select" >
                  -- select --
                </option>
                <option value="Bearing">Bearing</option>
                <option value="Bolt">Bolt</option>
                <option value="Body Parts">Body Parts</option>
                <option value="Engine Parts">Engine Parts</option>
                <option value="Filter">Filter</option>
                <option value="Gear">Gear</option>
                <option value="Grease">Grease</option>
                <option value="Nut">Nut</option>
                <option value="Oil">Oil</option>
                <option value="Seal">Seal</option>
                <option value="Washer">Washer</option>
                <option value="Wheel Parts">Wheel Parts</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
          {/* Row two end  */}
          {/* Row three start /*/}
          <div className="flex flex-row w-full h-16 justify-between items-end">
            <div className="flex flex-row justify-between items-end w-full h-fit pr-">
              <div className="text-lg  text-purple-500  ">Choose image:</div>
              <div>
                <input
                  onChange={addHandle}
                  required={true}
                  accept="image/*"
                  type="file"
                  className=" focus:shadow-inner focus:shadow-purple-300 w-80 border-transparent file:rounded-none  file:hover:text-white file:placeholder:text-gray-500  file:hover:bg-purple-500 placeholder:text-blue-dark file:w-40 file:h-fit file:py-0.5 file:text-lg file:text-purple-500 file:bg-transparent file:ml-3 file:border   file:border-transparent file:bg-white "
                />
              </div>
            </div>
            <div className="flex flex-row justify-between items-end w-full  h-fit">
              <div className="text-lg  text-purple-500 pl-40">Price: </div>
              <div>
                <input
                  type="number"
                  required={true}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  placeholder="Enter the rupees"
                  className="w-[12rem] h-fit py-1.5 mr-6 rounded-md placeholder:text-center placeholder:text-gray-500 border-2 border-purple-500 text-center outline-purple-500  focus:shadow-inner focus:shadow-purple-300"
                />
              </div>
            </div>
          </div>
          {/* Row three end /*/}
          {/* Row four start */}
          <div className=" flex w-[56rem] h-10 mt-5 -ml-5 rounded-none justify-center items-center border-2 border-purple-500  hover:bg-purple-500 ">
            <button
              // onClick={}
              className="text-ly  w-full h-10  text-purple-500 hover:text-white "
            >
              Add
            </button>
          </div>
          {/* Row four end */}
        </div>
      </form>
    </div>
  );
}
