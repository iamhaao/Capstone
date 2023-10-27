import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import Banner from "../Components/Home/Banner";
import Population from "../Components/Home/Population";
import Promos from "../Components/Home/Promos";
import TopRated from "../Components/Home/TopRated";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMoviesAction,
  getRandomMoviesAction,
  getTopRatedMovieAction,
} from "../Redux/Actions/MoviesAction";
import { toast } from "react-hot-toast";
function HomeScreen() {
  const dispatch = useDispatch();
  const {
    isLoading: radomLoading,
    isError: randomError,
    movies: randomMovies,
  } = useSelector((state) => state.getRandomMovies);
  const {
    isLoading: topLoading,
    isError: topError,
    movies: topMovies,
  } = useSelector((state) => state.getTopRatedMovie);
  const { isLoading, isError, movies } = useSelector(
    (state) => state.getAllMovies
  );
  //useEffect
  useEffect(() => {
    //getRandom movies
    dispatch(getRandomMoviesAction());
    //get all movies
    dispatch(getAllMoviesAction({}));
    dispatch(getTopRatedMovieAction());
    //if error
    if (isError || randomError || topError) {
      toast.error("Some thing went wrongs");
    }
  }, [dispatch, isError, randomError, topError]);
  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner movies={movies} isLoading={isLoading} />
        <Population movies={randomMovies} isLoading={radomLoading} />
        <Promos />
        <TopRated movies={topMovies} isLoading={topLoading} />
      </div>
    </Layout>
  );
}

export default HomeScreen;
