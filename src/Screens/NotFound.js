import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
function NotFound() {
  return (
    <div className="flex-colo  gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6 ">
      <img
        src="/images/404.png"
        alt="notfound"
        className="w-full h-96 object-contain"
      />
      <h1 className="lg:text-4xl font-bold">Page Not Found</h1>
      <p className="font-medium text-border italic leading-6">
        The page you are looking for does not exits. You may have mistyped the
        URL
      </p>
      <Link
        to="/"
        className="bg-subMain gap-3 transitions flex-rows text-white font-medium py-3 px-4 hover:text-main  rounded-md "
      >
        <AiFillHome /> Back Home
      </Link>
    </div>
  );
}

export default NotFound;
