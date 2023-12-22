import React, { useEffect } from "react";
import Aos from "aos";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import AboutUs from "./Screens/AboutUs";
import NotFound from "./Screens/NotFound";
import ContactUs from "./Screens/ContactUs";
import MoviesPage from "./Screens/Movies";
import SingleMovie from "./Screens/SingleMovie";
import WatchPage from "./Screens/WatchPage";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Profile from "./Screens/Dardboard/Profile";
import Password from "./Screens/Dardboard/Password";
import FavoriteMovies from "./Screens/Dardboard/FavoriteMovies";
import MoviesList from "./Screens/Dardboard/Admin/MoviesList";
import DashBoard from "./Screens/Dardboard/Admin/DashBoard";
import Categories from "./Screens/Dardboard/Admin/Catogeries";
import Users from "./Screens/Dardboard/Admin/User";
import AddMovie from "./Screens/Dardboard/Admin/AddMovie";
import Discover from "./Screens/Discover";
import Products from "./Screens/Products";
import Premium from "./Screens/Premium";
import ScrollOnTop from "./ScrollOnTop";
import ToastContainer from "./Components/Notifications/ToastContainer";
import { AdminProtectedRouter, ProtectedRouter } from "./ProtectedRouter";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "./Redux/Actions/CategoresAction";
import { getAllMoviesAction } from "./Redux/Actions/MoviesAction";
import { getFavoriteMoviesAction } from "./Redux/Actions/userActions";
import toast from "react-hot-toast";
import EditMovie from "./Screens/Dardboard/Admin/EditMovie";
function App() {
  Aos.init();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isError, isSuccess } = useSelector((state) => state.userLikeMovie);
  const { isError: catError } = useSelector((state) => state.categoryGetAll);
  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllMoviesAction({}));
    if (userInfo) {
      dispatch(getFavoriteMoviesAction());
    }
    if (isError || catError) {
      toast.error(isError || catError);
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
  }, [dispatch, userInfo, isError, catError, isSuccess]);
  return (
    <>
      <ToastContainer />
      <ScrollOnTop>
        <Routes>
          {/************PUBLIC ROUTERS***********/}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:search" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="*" element={<NotFound />} />
          {/***PRIVATE PUBLIC ROUTERS ****/}
          <Route element={<ProtectedRouter />}>
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/password" element={<Password />} />
            <Route path="/favorites" element={<FavoriteMovies />} />
            {/******ADMIN ROUTERS***** */}
            <Route element={<AdminProtectedRouter />}>
              <Route path="/movieslist" element={<MoviesList />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/users" element={<Users />} />
              <Route path="/addmovie" element={<AddMovie />} />
              <Route path="/edit/:id" element={<EditMovie />} />
            </Route>
          </Route>
        </Routes>
      </ScrollOnTop>
    </>
  );
}
export default App;
