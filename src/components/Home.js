import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Routes, Route } from "react-router-dom";
import Dasboard from "./Dasboard";
import AddProduct from "./AddProduct";
import Productlist from "./Productlist";
import Order from "./Order";
import LayoutProduct from "./LayoutProduct";
import DeleteProduct from "./DeleteProduct";
import UpdataProduct from "./UpdataProduct";
import User from "./User";

export default function Home() {
  return (
    <div className="container grid grid-cols-4 h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-fuchsia-300 font-trebuchet overflow-x-hidden overflow-y-hidden" style={ {scrollbarWidth: "none", overflowY:""}} >
      <div className=" col-span-4 bg-white ">
        <Header />
      </div>
      {/* <div className="flex flex-row"> */}
      <div className=" col-span-1 w-full h-full bg-white ">
        <Sidebar />
      </div>
      <div className=" col-span-3 w-full h-full bg-white overflow-y-scroll ">
        <Routes>
          <Route path="/" element={<Dasboard />} />
          <Route path="/product-list" element={<Productlist />} />
          <Route path="/update-detail/:id" element={<UpdataProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/order" element={<Order />} />
          <Route path="/user" element={<User/>} />
        </Routes>
      </div>
      {/* </div> */}
    </div>
  );
}
