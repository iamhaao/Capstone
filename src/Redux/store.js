import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as Category from "./Reducers/CategoriesReducer";
import * as Movies from "./Reducers/MoviesReducer";

const rootReducer = combineReducers({
  //user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userUpdateProfile: User.userUpdateProfileReducer,
  userDeleteProfile: User.userDeleteProfileReducer,
  changePassword: User.userChangePasswordReducer,
  userGetFavoriteMovies: User.userGetFavoriteMoviesReducer,
  userDeleteFavoriteMovies: User.userDeleteFavoriteMoviesReducer,
  adminGetAllUser: User.adminGetAllUsersReducer,
  adminDeleteUser: User.adminDeleteUserReducer,
  userLikeMovie: User.userLikeMovieReducer,

  //categories reducers
  categoryGetAll: Category.getAllCategoriesReducer,
  categoryCreate: Category.createCategoryReducer,
  categoryUpdate: Category.updateCategoryReducer,
  categoryDelete: Category.deleteCategoryReducer,

  //Movies reducers
  getAllMovies: Movies.moviesListReducer,
  getRandomMovies: Movies.moviesRandomReducer,
  getMovieById: Movies.moiveDetailReducer,
  getTopRatedMovie: Movies.movieTopratedReducer,
  createReview: Movies.createReviewReducer,
  deleteMovie: Movies.deleteMovieReducer,
  deleteAllMovies: Movies.deleteALlMoviesReducer,
  createMovie: Movies.createMovieReducer,
  casts: Movies.castReducer,
  updateMovie: Movies.updateMovieReducer,
});
//get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//intialState
const intialState = {
  userLogin: { userLogin: userInfoFromStorage },
};
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: intialState,
});
