import React, { useMemo } from "react";
import { RiCoinsFill } from "react-icons/ri";
import { IoWallet } from "react-icons/io5";

function MonterCoint({ total }) {
  const coin = 2;
  const notEnough = useMemo(() => total > coin, [total, coin]);

  return (
    <div className=" border-subMain border-2 p-4 rounded-md">
      <div className="flex justify-center items-center gap-4 mb-8">
        <p className="font-mono font-bold text-2xl">MonterCoin</p>
        <RiCoinsFill className="text-star w-6 h-6" />
      </div>
      <div className="gap-1 flex items-center mb-8">
        <div className="flex gap-2 items-center">
          <IoWallet className="text-subMain w-6 h-6" />
          <p className="font-mono font-semibold">My Wallet: {coin}</p>
        </div>
        <RiCoinsFill className="text-star " />
      </div>
      <div className="flex gap-2 justify-center">
        <input type="checkbox" disabled={notEnough} />
        <p className={`${notEnough ? "text-gray-500" : "text-white"}`}>
          Confirm use of monsterCoin in wallet for payment{" "}
        </p>
      </div>
      {notEnough && (
        <div className="my-4">
          <p className="text-sm text-red-600 mb-4">
            Your montercoin not enought. Please add more monster coins!!!{" "}
          </p>
          <div className="flex justify-center">
            <button className="bg-star rounded-md p-2">Add monsterCoin</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonterCoint;
