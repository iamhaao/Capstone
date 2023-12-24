import React from "react";

function Visa() {
  return (
    <div className="border-subMain border-2 p-4 rounded-md">
      <div className="pb-3">
        <p className="font-mono font-semibold text-xl text-white">
          Credit Card Infor
        </p>
      </div>
      <div>
        <div className="mb-4">
          <p className="mb-2">Card Name</p>
          <input className="text-black bg-stone-300 border-border border-3 rounded hover:border-subMain pl-2 pr-6 py-1" />
        </div>
        <div className="mb-4">
          <p className="mb-2">Card Number</p>
          <input className="text-black bg-stone-300 border-border border-3 rounded hover:border-subMain pl-2 pr-6 py-1" />
        </div>
        <div className="flex gap-4 mb-4 ">
          <div>
            <p className="mb-2">EXP month</p>
            <input className="text-black bg-stone-300 border-border border-3 rounded hover:border-subMain pl-2 py-1" />
          </div>
          <div>
            <p className="mb-2">Exp Year</p>
            <input className="text-black bg-stone-300 border-border border-3 rounded hover:border-subMain pl-2 py-1" />
          </div>
        </div>
        <div className="mb-4">
          <p className="mb-2">CVC number</p>
          <input className="text-black bg-stone-300 border-border border-3 rounded hover:border-subMain pl-2 pr-6 py-1" />
        </div>
      </div>
    </div>
  );
}

export default Visa;
