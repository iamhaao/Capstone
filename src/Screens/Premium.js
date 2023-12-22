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
      <div className="flex py-4 px-40">
        {Stages.map((stage, index) => (
          <div key={index} className="w-1/4">
            <div className="flex items-center ml-1">
              <div
                className={`${
                  selectedStage > stage.index
                    ? "bg-gray-500"
                    : selectedStage === stage.index
                    ? "bg-yellow-500"
                    : "bg-white"
                } rounded-3xl text-black border-gray-600 w-7 h-7 border-4 flex justify-center items-center`}
              >
                <p
                  className={`${
                    selectedStage > stage.index
                      ? "text-gray-700"
                      : selectedStage === stage.index
                      ? "text-white"
                      : "text-gray-700"
                  } text-sm font-semibold`}
                >
                  {index + 1}
                </p>
              </div>
              {index !== Stages.length - 1 && (
                <div className="ml-1 border-gray-500 w-full border-b border-2 justify-center items-center"></div>
              )}
            </div>
            <div className="">
              <h2 className="text-gray-500">{stage.title}</h2>
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

    // Return a default component or handle the case when no match is found
    return null;
  }, [selectedStage]);
  return (
    <Layout>
      <div className="">
        {progessPremiumaccount()}
        <div className="flex-colo border-b border-yellow-400 py-5">
          <h1 className="text-subMain text-3xl font-bold">
            SIGN UP FOR PREMIUM ACCOUNT
          </h1>
        </div>
        {renderStage()}
        <button
          onClick={onNext}
          className="bg-yellow-500 py-3 px-6 rounded-md font-bold text-ml my-4"
        >
          {selectedStage !== Stages.length - 1 ? "Next Page" : "Register"}
        </button>
      </div>
    </Layout>
  );
}

export default Premium;
