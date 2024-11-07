import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Order() {
  
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [brand, setBrand] = useState("");
  const [count, setCount] = useState("");
  const [category, setCategory] = useState("");
  return (
<div className="container flex-1 font-trebuchet text-blue-dark bg-transparent h-[695px] w-full overscroll-none">
      <div className="flex justify-start items-start py-5 pl-10">
        <h1 className="text-2xl text-blue-dark">Add Product Details</h1>
      </div>
      <div>
        <hr className="h-1 w-full bg-white" />
      </div>
      <form>
        <div className=" flex flex-col justify-center items-center w-[55rem] h-full ">
          {/* Row one */}
          <div className="flex flex-row w-full h-16 justify-start items-end">
            <div className="flex flex-row pl-5 justify-evenly items-end ">
              <div className="text-lg pr-4 text-blue-primary  ">Name:</div>
              <div>
                <input
                  type="text"
                  placeholder="Enter the product name"
                  // required={true}
                  className="w-[30rem] h-fit py-1.5 rounded-md placeholder:text-center border-2 border-blue-primary text-center outline-blue-primary  "
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row pl-5 justify-evenly items-end">
              <div className="text-lg pr-4 text-blue-primary  ">Code:</div>
              <div>
                <input
                  type="text"
                  placeholder="Enter the code name"
                  // required={true}
                  className="w-[15rem] h-fit py-1.5 rounded-md placeholder:text-center border-2 border-blue-primary text-center outline-blue-primary  "
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Row one end */}
          {/* Row two start  */}
          <div className="flex flex-row w-[55rem] h-16 justify-between items-end -mr-6 pl-2">
            <div className="flex flex-row  justify-evenly items-end">
              <div className="text-lg  text-blue-primary pr-3  ">
                Tractor Brand:
              </div>
              <input
                type="text"
                placeholder="Enter the Brand"
                // required={true}
                className="w-[12rem] h-fit py-1.5 rounded-md placeholder:text-center border-2 border-blue-primary text-center outline-blue-primary  "
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-evenly items-end">
              <div className="text-lg  text-blue-primary pr-3">Count:</div>
              <input
                type="number"
                placeholder="Enter the count"
                // required={true}
                className="w-[10rem] h-fit py-1.5 rounded-md placeholder:text-center border-2 border-blue-primary text-center outline-blue-primary  "
                onChange={(e) => setCount(e.target.value)}
              />
            </div>
            <div className="flex flex-row  justify-evenly items-end">
              <div className="text-lg  text-blue-primary  pr-2">Category:</div>
              <select onChange={(e)=> setCategory(e.target.value)} className="w-[10rem] h-fit py-1.5 rounded-md placeholder:text-center border-2 border-blue-primary text-center outline-blue-primary  ">
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
          </div>
          {/* Row two end  */}
          {/* Row three start /*/}
          <div className="flex flex-row w-[55rem] h-16 justify-start items-end">
            <div className="flex flex-row pl-5 justify-evenly items-end ">
              <div className="text-lg  text-blue-primary  pr-2">
                Choose image:
              </div>
              <div>
                <input
                  type="file"
                  className="w-[35rem] border-transparent placeholder:text-blue-dark file:w-40 file:text-blue-dark file:ml-3 file: border-2 file:rounded-md file:border-blue-primary file:outline-transparent"
                />
              </div>
            </div>
          </div>
          {/* Row three end /*/}
          {/* Row four start */}
          <div className=" flex w-[54rem] h-10 mt-5 rounded-md ml-7 justify-center items-center border-2 border-blue-primary hover:bg-gradient-to-br hover:from-violet-500 hover:to-fuchsia-500 hover:border-white ">
            <button
              className="text-lg  w-[54rem] h-10  text-blue-primary hover:text-white "
            >
              Update
              
            </button>
          </div>
          {/* Row four end */}
        </div>
      </form>
      
    </div>  )
}
