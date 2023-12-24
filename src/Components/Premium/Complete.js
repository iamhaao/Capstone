import React from "react";
import { FaCheckCircle } from "react-icons/fa";

function Complete() {
  return (
    <div className="relative">
      <div
        className="mx-96 my-8 bg-cover object-cover bg-center "
        style={{
          backgroundImage: "url('images/logo.png')",
          backgroundSize: "contain", // Hoặc bạn có thể thử các giá trị như "auto", "cover", "50%",...
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="pb-4">
          <p className="text-white text-3xl font-extrabold font-mono">
            PREMIUM ACCOUNT REGISTATION COMPLETED{" "}
          </p>
        </div>
        <div className="my-16">
          <div className="flex justify-center mb-3">
            <FaCheckCircle className="text-white w-24 h-24" />
          </div>
          <div className="flex justify-center">
            <p>You have successfully registered for a premium account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complete;
