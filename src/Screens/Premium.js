import React, { useCallback, useState } from "react";
import Layout from "../Layout/Layout";
import Package from "../Components/Premium/Package";
import TermAndConditions from "../Components/Premium/TermAndConditions";
import Payment from "../Components/Premium/Payment";
import Complete from "../Components/Premium/Complete";

function Premium() {
  const [selectedStage, setSelectedStage] = useState(0);
  const onNext = () => {
    setSelectedStage(selectedStage + 1);
  };
  const onBack = () => {
    setSelectedStage(selectedStage - 1);
  };
  const Stages = [
    {
      index: 0,
      component: <Package />,
      title: "Choose Pakage",
    },
    {
      index: 1,
      component: <TermAndConditions />,
      title: "Confirm",
    },
    {
      index: 2,
      component: <Payment />,
      title: "Payment",
    },
    {
      index: 3,
      component: <Complete />,
      title: "Complete",
    },
  ];
  const progessPremiumaccount = useCallback(() => {
    return (
      <div className="flex py-4 px-40 mx-auto">
        {Stages.map((stage, index) => (
          <div key={index} className="w-1/4">
            <div className="flex items-center ml-1">
              <div
                className={`${
                  selectedStage > stage.index
                    ? "bg-gray-500"
                    : selectedStage === stage.index
                    ? "bg-gold"
                    : "bg-white"
                } rounded-3xl text-blac w-7 h-7  flex justify-center items-center`}
              >
                <p
                  className={`${
                    selectedStage > stage.index
                      ? "text-gray-800  "
                      : selectedStage === stage.index
                      ? "text-blue"
                      : "text-gray-600"
                  } text-base font-bold font-sans`}
                >
                  {index + 1}
                </p>
              </div>
              {index !== Stages.length - 1 && (
                <div className="border-gray-500 w-full border-b border-2 justify-center items-center"></div>
              )}
            </div>
            <div className="">
              <h2 className="text-white">{stage.title}</h2>
            </div>
          </div>
        ))}
      </div>
    );
  }, [selectedStage]);

  const renderStage = useCallback(() => {
    const foundStage = Stages.find((stage) => stage.index === selectedStage);

    if (foundStage) {
      return foundStage.component;
    }
    return null;
  }, [selectedStage]);
  return (
    <Layout>
      <div className="">
        {progessPremiumaccount()}
        <div className="flex-colo border-b border-yellow-400 py-5">
          <h1 className="text-white text-3xl font-bold">
            SIGN UP FOR PREMIUM ACCOUNT
          </h1>
        </div>
        {renderStage()}
        <div className="flex justify-between mx-20">
          <button
            onClick={onBack}
            className={`${
              selectedStage === 0 || selectedStage === Stages.length - 1
                ? "bg-gray-400"
                : " bg-subMain"
            } ${
              selectedStage === 0 || selectedStage === Stages.length - 1
                ? "bg-gray-600"
                : " text-white"
            }
           py-2 px-6 rounded-md border-border border-2 font-bold text-ml my-4`}
            disabled={
              selectedStage === 0 || selectedStage === Stages.length - 1
            }
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="bg-subMain py-2 px-6 rounded-md font-bold text-ml my-4"
          >
            {selectedStage !== Stages.length - 1 ? "Next Page" : "Sign Up"}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Premium;
