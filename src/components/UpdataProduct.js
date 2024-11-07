import axios, { all } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function UpdataProduct() {
  const params = useParams();
  const [allproduct, setAllproduct] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [count, setCount] = useState();
  const [price, setPrice] = useState();
  // const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const { newImage } = JSON.stringify(image);
  const [values, setValue] = useState({
    name: allproduct.name,
    code: allproduct.code,
    brand: allproduct.brand,
    category: allproduct.category,
    count: allproduct.count,
    price: allproduct.price,
    // image: image,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await axios.get(
      "http://localhost:5000/product/" + params.id
    );
    console.log(result.data.data);
    setAllproduct(result.data.data);
    setName(result.data.data.name)
    setCode(result.data.data.code);
    setCategory(result.data.data.category);
    setCount(result.data.data.count);
    setPrice(result.data.data.price);
    setBrand(result.data.data.brand);
  
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image",image)
    formdata.append("name", name);
    formdata.append("code", code);
    formdata.append("brand", brand);
    formdata.append("category", category);
    formdata.append("count", count);
    formdata.append("price", price);
    const result2 = await axios
      .put("http://localhost:5000/product/" + params.id, formdata, {
        headers: { "Content-Type": "multipart-formdata" },
      })
      .then((res) => {
        if (res.data.status === "ok") {
          alert("successfully updated");

          console.log(res.data.data);
        }
        if (res.data.status === "bad") {
          alert("unsuccessfully updated...");
          console.log(res.data.data);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addHandle = (e) => {
    setImage(e.target.files[0]);
    alert(newImage);
  };

  console.log(name)
  return (
    <div className="container flex-1 font-trebuchet text-gray-500 bg-transparent h-[695px] w-full overscroll-none">
      <div className="flex justify-start items-start py-5 pl-10">
        <h1 className="text-2xl ">Update Product Details</h1>
      </div>
      <div>
        <hr className="h-1 w-full bg-purple-500" />
      </div>
      <form
        onSubmit={handleUpdate}
        className="flex justify-center items-center"
      >
        <div className=" flex  flex-col justify-start items-start w-[58rem] h-full ">
          {/* row one start */}
          <div className=" flex flex-row justify-between items-end w-full h-fit">
            <div className="flex flex-row w-full h-16 justify-start items-end">
              <div className="text-lg pr-5 text-purple-500  ">Name:</div>
              <div>
                <input
                  type="text"
                  required
                  placeholder="name not loaded"
                  onChange={(e) => {
                    setValue({ name: e.target.value });
                    setName(e.target.value);
                  }}
                  className="w-[230%]  h-fit py-1.5 rounded-md placeholder:text-center border-2 border-purple-500 text-center outline-purple-500 focus:shadow-inner focus:shadow-purple-300"
                
                  value={name}
                 
                />
              </div>
            </div>
            <div className="flex flex-row justify-between items-end w-[25rem] h-fit ">
              <div className="text-lg  text-purple-500  ">Image:</div>
              <div>
                <input
                  type="file"
                  // required
                  placeholder="upload an image"
                  accept="image/*"
                  onChange={addHandle}
                  className=" flex w-auto file:bg-transparent   border-transparent file:text-purple-500  file:w-28 file:h-fit file:py-0.5 file:text-lg hover:file:text-white file:left-3 file: border-2  hover:file:bg-purple-500  file:rounded-sm file:outline-transparent file:border-transparent"
                />
              </div>
            </div>
          </div>
          {/* row one end */}
          {/* row two start */}
          <div className="flex  w-20 h-fit">
            <div className="flex flex-col">
              <div className="flex flex-row  justify-between  w-[25rem] h-fit  pt-5 items-end">
                <div className="text-lg  text-purple-500  ">Part.no:</div>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Enter the part number name"
                    value={code}
                    onChange={(e) => {
                      setValue({ code: e.target.value });
                      setCode(e.target.value);
                    }}
                    className="w-[15rem] h-fit py-1.5   rounded-md placeholder:text-center border-2 border-purple-500 text-center outline-purple-500  focus:shadow-inner focus:shadow-purple-300"
                  />
                </div>
              </div>
              <div className="flex flex-row w-[25rem] h-16 justify-between items-end ">
                <div className="text-lg  text-purple-500 pr-5  ">Brand:</div>
                <input
                  type="text"
                  required
                  placeholder="Enter the Brand"
                  value={brand}
                  onChange={(e) => {
                    setValue({ brand: e.target.value });
                    setBrand(e.target.value);
                  }}
                  className="w-[15rem] h-fit py-1.5 rounded-md placeholder:text-center border-2 border-purple-500 text-center outline-purple-500 focus:shadow-inner focus:shadow-purple-300 "
                />
              </div>
              <div className="flex flex-row  justify-between w-[25rem] h-fit items-end mt-5">
                <div className="text-lg  text-purple-500  pr-">Category:</div>
                <select
                  value={category}
                  required
                  onChange={(e) => {
                    setValue({ category: e.target.value });
                    setCategory(e.target.value);
                  }}
                  className="w-[15rem] h-fit py-1.5 rounded-md placeholder:text-center border-2 border-purple-500 text-center outline-purple-500 focus:shadow-inner focus:shadow-purple-300 "
                >
                  <option value="Bearing">Bearing</option>
                  <option value="Bolt">Bolt</option>
                  <option value="Body Parts">Body Parts</option>
                  <option value="Engine Parts">Engine Parts</option>
                  <option value="Filter">Filter</option>
                  <option value="Gear">Gear</option>
                  <option value="Grease">Grease</option>
                  <option value="Nut">Nut</option>
                  <option value="Oil">Oil</option>
                  <option value="Washer">Washer</option>
                  <option value="Wheel Parts">Wheel Parts</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="flex flex-row justify-between items-end w-[25rem]">
                <div className="text-lg  text-purple-500 ">Count:</div>
                <input
                  type="number"
                  required
                  placeholder="Enter the count"
                  value={count}
                  onChange={(e) => {
                    setValue({ count: e.target.value });
                    setCount(e.target.value);
                  }}
                  className="w-[15rem] h-fit py-1 mt-5 rounded-md placeholder:text-center border-2 border-purple-500 text-center outline-purple-500 focus:shadow-inner focus:shadow-purple-300 "
                />
              </div>

              <div className="flex flex-row justify-between items-end w-[25rem]">
                <div className="text-lg  text-purple-500 ">Price:</div>
                <div>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => {
                      setValue({ price: e.target.value });
                      setPrice(e.target.value);
                    }}
                    className="w-[15rem] h-fit py-1 mt-5 rounded-md placeholder:text-center border-2 border-purple-500 text-center outline-purple-500  focus:shadow-inner focus:shadow-purple-300"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className=" flex w-[26rem] mt-5 justify-end items-end ">
                <img
                  src={`http://localhost:5000/uploads/${allproduct.image}`}
                  alt="image not found"
                  className=" h-72 w-72 rounded"
                />
              </div>
            </div>
          </div>
          <div className=" flex w-[55rem] h-10 mt-5 -ml-5 rounded-sm  justify-center items-center border-2 border-purple-500 hover:bg-purple-500">
            <button className="text-lg  w-full h-10  text-purple-500 hover:text-white ">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
