import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import MovieInfo from "../Components/Single/MovieInfo";
import MovieCasts from "../Components/Single/MovieCasts";
import MovieRates from "../Components/Single/MovieRates";
import Titles from "../Components/Titles";
import { BiSolidCollection } from "react-icons/bi";
import Movie from "../Components/Movie";
import ShareMovieModal from "../Components/Modals/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../Redux/Actions/MoviesAction";
import Loader from "../Components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { SiderbarContext } from "../Context/DrawerContext";
import { DownloadVideo } from "../Context/Functionaltes";
import { FileSaver } from "file-saver";
function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  // const { progress, setProgress } = useContext(SiderbarContext);
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const sameClass = "w-full gap-6 flex-colo min-h-screen  ";
  //useSelector
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );

  const { movies } = useSelector((state) => state.getAllMovies);
  const RelatedMovies = movies?.filter((m) => m.category === movie?.category);
  //download movie video

  // const DownloadMovieVideo = async (videoUrl, name) => {
  //   await DownloadVideo(videoUrl, setProgress).then((data) => {
  //     setProgress(0);
  //     FileSaver.saveAs(data, name);
  //   });
  // };

  //useEffect
  useEffect(() => {
    //movie id
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);
  console.log(id);
  return (
    <Layout>
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
          <ShareMovieModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={movie}
          />
          <MovieInfo
            movie={movie}
            setModalOpen={setModalOpen}
            // DownloadVideo={DownloadMovieVideo}
            // progress={progress}
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={movie} />
            <MovieRates movie={movie} />
            {/*Raltated */}
            {RelatedMovies?.length > 0 && (
              <div className="my-16">
                <Titles title="Related Movies" Icon={BiSolidCollection} />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6 ">
                  {RelatedMovies?.map((movie) => (
                    <Movie key={movie?._id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleMovie;
