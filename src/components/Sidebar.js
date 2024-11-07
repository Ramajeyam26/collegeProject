import React, { useState } from "react";
import { Link, NavLink, Outlet, useSearchParams } from "react-router-dom";
import { SidebarData } from "./SildebarData";

export const Sidebar = () => {
  const [data, setData] = useState({ name: "ram" });

  return (
    <div className="flex justify-start items-start flex-col pt-10  h-[695px] w-full text-gray-500 text-xl border-r-4 border-purple-500">
      {/* <div className="  w-full  text-xl "> */}
      {SidebarData.map((item) => {
        return (
          <div
            className="flex justify-start items-start w-80 h-fit  py-4 "
            key={item.id}
          >
            <div>
              <span
                className="  flex  relative left-5 top-1 text-purple-500"
              >
                {item.icon}
              </span>
            </div>
            <div className="  pl-7">
              <NavLink
                to={item.route}
                className={({ isActive }) => [
                  "pl-5",
                  isActive
                    ? " text-purple-500 border-l-2 border-purple-500 pl-2 left-2 "
                    : " pl-2",
                ]}
              >
                {item.title}
              </NavLink>
            </div>
            <Outlet />
          </div>
        );
      })}
      {/* </div> */}
    </div>
  );
};
