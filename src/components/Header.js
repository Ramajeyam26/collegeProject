import React from 'react'

export const Header = () => {
  return (
      <header>
          <div className=" row-one w-full h-20 border-b-4 border-purple-500 col-span-4 flex justify-normaly items-center  endpink">
          <div className=" col-one flex justify-center items-center w-1/4 h-full">
            <h1 className="text-2xl text-purple-500 font-nomal">Buy Parts</h1>
          </div>
          <div className="col-two flex justify-start items-center w-3/4 h-full">
            <h1 className="text-2xl pl-20 text-gray-500">Admin</h1>
          </div>
        </div>
    </header>
  )
}
