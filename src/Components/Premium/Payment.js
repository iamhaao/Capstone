import React, { useCallback, useEffect, useState } from "react";
import { IoTime } from "react-icons/io5";
import { renderBenefit } from "./Package";
import { TiTick } from "react-icons/ti";
import MonterCoint from "../Payment/MonterCoint";
import Visa from "../Payment/Visa";
import PayPal from "../Payment/Paypal";
import MainModal from "../Modals/MainModal";
const packaged = {
  title: "Year Premium",
  price: 2400,
  discount: 25,
  benefit: {
    "Ad-Free-Viewing": true,
    "Access to Exclusive Content": true,
    "Higher-Quality-Streaming": true,
    "Offline-Viewing": true,
    "Multiple-Device-Access": true,
    "Customized-Recommendations": true,
    "Priority-Customer-Support": true,
    "No-Content-Restrictions": true,
    "Early-Access-to-Releases": true,
  },
  expired: "1 year",
};
const options = [
  {
    value: 1,
    label: "MonterCoin",
    image: "images/coin.jpg",
    component: (
      <MonterCoint
        total={packaged.price - (packaged.price * packaged.discount) / 100}
      />
    ),
  },
  {
    value: 0,
    label: "Visa / MasterCard",
    image: "images/visa.png",
    component: <Visa />,
  },
  {
    value: 2,
    label: " PayPal",
    image: "images/paypal.png",
    component: <PayPal />,
  },
];
function Payment() {
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [time, setTime] = useState(5);

  const handleSelectChange = (method) => {
    setSelectedMethod(method.value);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Format thành chuỗi 'mm:ss'
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
    return formattedTime;
  };
  const renderAllMethod = useCallback(() => {
    return options.map((method) => (
      <div key={method.value} onClick={() => handleSelectChange(method)}>
        <img
          className="w-52 h-32 border-border border-2 object-cover"
          src={method.image}
          alt={method.label}
        />
        <div className=" flex justify-center gap-3">
          {selectedMethod === method.value && (
            <TiTick className="text-subMain h-5 w-5" />
          )}
          <p className="text-sm font-mono font-semibold">{method.label}</p>
        </div>
      </div>
    ));
  }, [selectedMethod]);

  const renderMethod = useCallback(() => {
    const selectedComponent = options.find(
      (method) => method.value === selectedMethod
    );

    if (selectedComponent) {
      return selectedComponent.component;
    }
    return null;
  }, [selectedMethod]);
  return (
    <>
      <div>
        <div>
          <div className="flex gap-4 justify-end items-center mr-40 py-4">
            <IoTime className="text-subMain w-6 h-6" />
            <p>{formatTime(time)}</p>
          </div>
          <div className="flex mx-40 gap-5">
            <div className=" w-1/4 py-4 h-fit border border-borde rounded-lg bg-subMain">
              <div className=" flex-colo">
                <p className="text-white font-bold text-2xl">
                  {packaged.title}
                </p>
                <div className="flex gap-4 justify-center">
                  {packaged.discount !== 0 && (
                    <p className="text-gray-500 line-through">
                      {packaged.price}$
                    </p>
                  )}
                  <p className="font-semibold">
                    {packaged.price -
                      (packaged.price * packaged.discount) / 100}
                    $
                  </p>
                  <p className="text-sm text-gray-300">
                    {" "}
                    | Pay once {packaged.expired}
                  </p>
                </div>
              </div>
              <div className="ml-8 mt-4">{renderBenefit(packaged.benefit)}</div>
              <div className="flex-colo my-4">
                <p className="border-border border-2 w-fit p-2 text-blue bg-gold rounded-md font-mono font-semibold">
                  total:{" "}
                  {packaged.price - (packaged.price * packaged.discount) / 100}$
                </p>
              </div>
            </div>
            <div className="w-3/4">
              <div>
                <p className="text-2xl font-bold h-fit">Payment</p>
                <div className=" gap-3 items-center">
                  <p className="font-mono py-4">
                    Choose payment method below :{" "}
                  </p>
                  <div className="flex gap-3">{renderAllMethod()}</div>
                </div>
                <div className="py-4 flex gap-16">
                  <div className="border-subMain border-2 p-4 h-fit rounded-md">
                    <div className="pb-3">
                      <p className="text-xl text-white font-semibold font-mono">
                        Billing Infor
                      </p>
                    </div>
                    <div>
                      <p className="mb-2">Full Name:</p>
                      <input className="text-black bg-stone-300 border-border border-3 rounded hover:border-subMain pl-2 pr-6 py-1" />
                    </div>
                    <div>
                      <p className="mb-2">Email:</p>
                      <input className="text-black bg-stone-300 border-border border-3 rounded hover:border-subMain pl-2 pr-6 py-1" />
                    </div>
                    <div>
                      <p className="mb-2">Phone:</p>
                      <input className="text-black bg-stone-300 border-border border-3 rounded hover:border-subMain pl-2 pr-6 py-1" />
                    </div>
                  </div>
                  {renderMethod()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
