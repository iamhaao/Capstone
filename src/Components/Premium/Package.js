import React, { useCallback, useState } from "react";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
export const renderBenefit = (benefit) => {
  return Object.entries(benefit).map(([key, value]) => (
    <div key={key} className="flex gap-2">
      <div>
        {value ? (
          <TiTick className="text-gold" />
        ) : (
          <RxCross2 className="text-red-600" />
        )}
      </div>
      <p>{key}</p>
    </div>
  ));
};
function Package() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handlePackageClick = (index) => {
    setSelectedPackage(index);
  };
  const PremiumPackage = [
    {
      title: "Monthly Premium",
      price: 200,
      discount: 0,
      benefit: {
        "Ad-Free-Viewing": true,
        "Access to Exclusive Content": true,
        "Higher-Quality-Streaming": true,
        "Offline-Viewing": false,
        "Multiple-Device-Access": false,
        "Customized-Recommendations": true,
        "Priority-Customer-Support": false,
        "No-Content-Restrictions": false,
        "Early-Access-to-Releases": true,
      },
      expired: "1 month",
    },
    {
      title: "Quarter Premium",
      price: 600,
      discount: 10,
      benefit: {
        "Ad-Free-Viewing": true,
        "Access to Exclusive Content": true,
        "Higher-Quality-Streaming": true,
        "Offline-Viewing": true,
        "Multiple-Device-Access": false,
        "Customized-Recommendations": true,
        "Priority-Customer-Support": true,
        "No-Content-Restrictions": false,
        "Early-Access-to-Releases": true,
      },
      expired: "3 month",
    },
    {
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
    },
  ];

  const renderPackage = useCallback(
    (premium, index) => {
      const isSelected = selectedPackage === index;
      console.log(isSelected);
      return (
        <div
          className={`w-1/3 py-4 h-fit border border-borde rounded-lg hover:bg-subMain ${
            isSelected ? "bg-subMain" : ""
          } `}
          onClick={() => handlePackageClick(index)}
        >
          <div className=" flex-colo">
            <p className="text-white font-bold text-2xl">{premium.title}</p>
            <div className="flex gap-4 justify-center">
              {premium.discount !== 0 && (
                <p className="text-gray-500 line-through">{premium.price}$</p>
              )}
              <p className="font-semibold">
                {premium.price - (premium.price * premium.discount) / 100}$
              </p>
              <p className="text-sm text-gray-300">
                {" "}
                | Pay once {premium.expired}
              </p>
            </div>
          </div>
          <div className="ml-8 mt-4">{renderBenefit(premium.benefit)}</div>
        </div>
      );
    },
    [selectedPackage]
  );
  return (
    <div className="flex mx-32 gap-6 my-6">
      {PremiumPackage.map((premium, index) => {
        return renderPackage(premium, index);
      })}
    </div>
  );
}

export default Package;
