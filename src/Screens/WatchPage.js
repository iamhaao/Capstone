import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaHeart, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../Redux/Actions/MoviesAction";
import Loader from "../Components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { IfMovieLiked, LikeMovie } from "../Context/Functionaltes";

function WatchPage() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "w-full gap-6 flex-colo min-h-screen  ";

  const [play, setPlay] = useState(false);
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );
  const { isLoading: likeLoading } = useSelector(
    (state) => state.userLikeMovie
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  //if liked function
  const isLiked = (movie) => {
    return IfMovieLiked(movie);
  };

  useEffect(() => {
    //movie id
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);
  return (
    <Layout>
      <div className="container mx-auto bg-dry p-6 mb-12">
        {!isError && (
          <div className="flex flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
            <Link
              to={`/movie/${movie?._id}`}
              className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray  "
            >
              <BiArrowBack /> {movie?.name}
            </Link>
            <div className="flex-btn sm:w-auto w-full gap-5">
              <button
                onClick={() => LikeMovie(movie, dispatch, userInfo)}
                disabled={isLiked(movie) || likeLoading}
                className={`bg-white flex-rows gap-2 hover:text-subMain
                ${isLiked(movie) ? "text-subMain" : "text-white "}
                transitions rounded bg-opacity-30 font-medium  px-4 py-3 text-sm `}
              >
                <FaHeart />
              </button>
              <button className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded   px-8 font-medium py-3 text-sm ">
                <FaCloudDownloadAlt /> DownLoad
              </button>
            </div>
          </div>
        )}

        {/*Watch Video */}
        {play ? (
          <video controls autoPlay={play} className="w-full h-screen rounded">
            <source
              src={movie?.video ? movie?.video : "/images/movie.mp4"}
              type="video/mp4"
              title={movie?.name}
            ></source>
          </video>
        ) : (
          <div className="w-full h-full rounded-lg overflow-hidden relative">
            {isLoading ? (
              <div className={sameClass}>
                <Loader />
              </div>
            ) : isError ? (
              <div className={sameClass}>
                <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl felx-colo">
                  <RiMovie2Line />
                </div>
                <p className="text-white text-sm">{isError}</p>
              </div>
            ) : (
              <>
                <div className="absolute top-0 bottom-0 right-0 left-0 w-full h-full bg-black bg-opacity-30 flex-colo ">
                  <button
                    onClick={() => setPlay(true)}
                    className="bg-white text-subMain flex-colo border border-submain rounded-full w-20 h-20 font-medium  text-xl"
                  >
                    <FaPlay />
                  </button>
                </div>
                <img
                  src={movie?.image ? movie?.image : ``}
                  alt={movie?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default WatchPage;
