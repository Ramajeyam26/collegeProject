import React from "react";
import { RiStackFill } from "react-icons/ri";
import { PiShoppingCartBold } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";



export default function Dasboard() {
  const img = "20240122_221955.jpg";
  return (
    <div className="flex flex-col w-full h-full ">
      <div className="flex justify-start items-start py-5 pl-10">
        <h1 className="text-2xl text-gray-500">Deshboard </h1>
      </div>
      <div>
        <hr className="h-1 w-full bg-purple-500" />
      </div>
      <div className="flex flex-row justify-evenly items-center w-full h-[30%] pt-20">
        <div className=" w-72 h-44 flex flex-col justify- items- border-2 border-orange-300 rounded-md  shadow-md shadow-orange-100">
          <div className="flex flex-row  h-[69%]  justify-evenly items-center pt-10">
            <div className="">
              <RiStackFill className="text-[70px] text-orange-500" />
            </div>
            <div className="text-3xl text-orange-500 pt-8"> Stack</div>
          </div>
          <div className="h-[1%] w-[80%] mx-[10%] bg-orange-200" />
          <div className="h-[30%] w-full flex justify-end items-end text-gray-500 text-3xl pb-2 pr-8">
            1000
          </div>
        </div>
       <div className=" w-72 h-44 flex flex-col justify- items- border-2 border-green-300 rounded-md  shadow-md shadow-green-100">
          <div className="flex flex-row  h-[69%]  justify-evenly items-center pt-10">
            <div className="">
              <PiShoppingCartBold className="text-[70px] text-green-500" />
            </div>
            <div className="text-3xl text-green-500 pt-8">Sold</div>
          </div>
          <div className="h-[1%] w-[80%] mx-[10%] bg-green-200" />
          <div className="h-[30%] w-full flex justify-end items-end text-gray-500 text-3xl pb-2 pr-8">
            1000
          </div>
        </div>
        <div className=" w-72 h-44 flex flex-col justify- items- border-2 border-blue-300 rounded-md  shadow-md shadow-blue-100">
          <div className="flex flex-row  h-[69%]  justify-evenly items-center pt-10">
            <div className="">
              <FaRegUser className="text-[70px] text-blue-500" />
            </div>
            <div className="text-3xl text-blue-500 pt-8">Users</div>
          </div>
          <div className="h-[1%] w-[80%] mx-[10%] bg-blue-200" />
          <div className="h-[30%] w-full flex justify-end items-end text-gray-500 text-3xl pb-2 pr-8">
            1000
          </div>
        </div>
      </div>
    </div>
  );
}
