import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

export default function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userData();
  }, []);

  const userData = async () => {
    const result = await axios.get("http://localhost:5000/user");
    console.log(result.data.data);
    setUsers(result.data.data);
  };

  const deleteHandle = async (id) => {
    alert(id);
    try {
      const result2 = await axios.delete("http://localhost:5000/user/" + id);
      alert(result2.data.data)
      if (result2.data.data === "ok") {
        alert("User detail deleted successfully");
      } else {
        alert("Cannot delete user detail");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="font-trebuchet w-[100%] h-screen">
      <div className="flex justify-start items-start py-5 pl-10 sticky top-0">
        <h1 className="text-2xl text-gray-500">Users </h1>
      </div>
      <div className="sticky top-[70px]">
        <hr className="h-1 w-full bg-purple-500" />
      </div>
      <div className=" w-[100%] h-[70%] bg- pt-20 pl-20 bg- flex justify-center items-center">
        <div className="w-[80%] h-full bg- flex flex-row flex-wrap justify-evenly overflow-hidden overflow-y-scroll ">
          {users.map((data) => {
            return (
              <div
                key={data._id}
                className="w-[40%] h-48 flex flex-row border-2 border-purple-500 rounded-lg justify-evenly items-  mb-10"
              >
                <div className="  flex justify-center items-center">
                  <div>
                    <img src="./logo512.png" width={100} height={100} />
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <div className="w-0.5 h-[80%] bg-purple-500"></div>
                </div>

                <div className=" flex flex-col justify-evenly items-start">
                  <div className=" font-bold text-lg text-pretty">
                    {data.name}
                  </div>
                  <div>{data.email}</div>
                  <div>{data.mobilenumber}</div>
                  <div className=" w-full h-fit ">
                    <button
                      className="  w-full flex justify-center items-center"
                      onClick={() => {
                        deleteHandle(data._id);
                        // alert(data._id);
                      }}
                    >
                      <MdDeleteOutline
                        cursor={"delete"}
                        title="Delete user information"
                        className=" hover:text-red-600 text-purple-500 text-3xl"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
