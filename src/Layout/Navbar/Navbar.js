import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { HiOutlineFilm } from "react-icons/hi2";
import { TbCrown } from "react-icons/tb";
import { HiLogin } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";
import { MdAirplaneTicket } from "react-icons/md";
import { PiShootingStarThin } from "react-icons/pi";
import { useSelector } from "react-redux";
function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
  const hover =
    "hover:text-subMain transitions flex gap-2 justify-end items-center";
  const Hover = ({ isActive }) =>
    isActive ? hover + "text-subMain" : hover + "text-white";
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/movies/${search}`);
      setSearch(search);
    } else {
      navigate("/movies");
    }
  };
  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg: grid gap-10 grid-cols-7 justify-between">
          <div className="col-span 1 lg:block hidden">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="Monterhub."
                className="w-full h-12 object-contain "
              />
            </Link>
          </div>
          <div className="col-span-2">
            <form
              onSubmit={handleSearch}
              className="w-full text-sm bg-dryGray rounded flex-btn gap-4"
            >
              <button
                type="submit"
                className="bg-subMain w-12 h-12 flex-colo text-white rounded"
              >
                <FaSearch />
              </button>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Movie Name From here"
                className="w-full font-medium phaceholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black "
              ></input>
            </form>
          </div>
          <div className="col-span-4 font-medium text-sm hidden xl:gap-8 2xl:gap-8 justify-between lg:flex xl:justify-center items-center">
            <NavLink
              to="/movies"
              className="hover:text-subMain transitions text-white flex gap-2 justify-end items-center"
            >
              <HiOutlineFilm className="w-6 h-6" />
              Movies
            </NavLink>
            <NavLink
              to="/premium"
              className="hover:text-subMain transitions text-white flex gap-2 justify-end items-center"
            >
              <TbCrown className="w-6 h-6 text-yellow-400" />
              Premium Account
            </NavLink>
            <NavLink
              to="/discover"
              className="hover:text-subMain transitions text-white flex gap-2 justify-end items-center"
            >
              <PiShootingStarThin className="w-6 h-6" />
              Discover
            </NavLink>
            <NavLink
              to="/products"
              className="hover:text-subMain transitions text-white flex gap-2 justify-end items-center"
            >
              <MdAirplaneTicket className="w-6 h-6" />
              Products
            </NavLink>
            <NavLink
              to={
                userInfo?.isAdmin
                  ? "/dashboard"
                  : userInfo
                  ? "/profile"
                  : "/login"
              }
              className={Hover}
            >
              {userInfo ? (
                <img
                  src={userInfo?.image ? userInfo?.image : "/images/user.png"}
                  alt={userInfo?.name}
                  className="w-8 h-8 rounded-full border object-cover border-subMain"
                />
              ) : (
                <>
                  <HiLogin className="w-6 h-6" />
                  <p>Login</p>
                </>
              )}
            </NavLink>
            <NavLink to="/favorite" className={`${hover} relative`}>
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1 ">
                {likedMovies?.length}
              </div>
              <FiHeart className="w-6 h-6" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
