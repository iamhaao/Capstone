import React, { useCallback, useState } from "react";
import Layout from "../Layout/Layout";
import HomeDiscover from "../Components/Discovery/HomeDiscover";
import MyDiscovery from "../Components/Discovery/MyDiscovery";
import { GiGalaxy } from "react-icons/gi";
import { FaAngrycreative } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

const ListComponent = [
  {
    value: 0,
    component: <HomeDiscover />,
    title: "Discover galaxy",
    icon: <GiGalaxy className="w-8 h-8" />,
  },
  {
    value: 1,
    component: <MyDiscovery />,
    title: "My universe",
    icon: <FaAngrycreative className="w-8 h-8" />,
  },
];
function Discover() {
  const [here, setHere] = useState(0);
  const handleOnclick = (value) => {
    setHere(value);
  };
  const renderSideBar = useCallback(() => {
    return ListComponent.map((component) => (
      <div
        key={component.title}
        className={`flex items-center gap-4 mb-4 mx-6 px-6 py-2 border-2 rounded border-white ${
          here === component.value && "bg-purple-500"
        } hover:bg-purple-200`}
        onClick={() => handleOnclick(component.value)}
      >
        <div>{component.icon}</div>
        <div>
          <p className="text-lg font-mono">{component.title}</p>
        </div>
      </div>
    ));
  }, [here]);
  const renderContent = useCallback(() => {
    const componentSelected = ListComponent.find(
      (component) => component.value === here
    );
    return componentSelected ? componentSelected.component : null;
  }, [here]);
  return (
    <Layout>
      <div className="min-h-screen relative z-100">
        <div
          className="absolute inset-0 w-full h-full opacity-60 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('images/galaxy.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="flex grid-cols-12 relative py-4 px-4">
          <div className="w-1/3 col-span-4 border-white border-[1px] rounded-xl">
            <div className="flex justify-center py-2">
              <p className="text-white font-mono font-bold text-xl">
                Discover the galaxy
              </p>
            </div>
            <div className="py-8">{renderSideBar()}</div>
            <div className="border-white border-b-2 mb-4 mx-16"></div>
            <div>
              <div className="mx-4 mb-6">
                <div className="flex justify-center">
                  <p className="text-white font-mono font-bold text-xl">
                    Create my universe
                  </p>
                </div>
                <p className="text-sm font-mono text-gray-400">
                  You can create yourself a video from 30 seconds to 1 minute.{" "}
                  <br />
                  Try creating your own universe.
                </p>
              </div>
              <div>
                <div className="mx-4">
                  <p className="text-sm font-mono text-gray-400">
                    Enter content your video:
                  </p>
                  <textarea className="w-full my-4 text-white bg-purple-300 bg-opacity-40" />
                </div>
                <div className="flex justify-end mx-8 my-4">
                  <button className="flex gap-2 items-center border-purple-300 border-2 rounded-lg p-2 text-purple-400 hover:bg-purple-200">
                    <IoMdAddCircle className="text-purple-400" />
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="">{renderContent()}</div>
        </div>
      </div>
    </Layout>
  );
}

export default Discover;
