import Axios from "./Axios";

//register new user API call
const registerService = async (user) => {
  const { data } = await Axios.post("/user", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};
//Logout user function

const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
};
//Login user API call
const loginService = async (user) => {
  const { data } = await Axios.post("/user/login", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};
//Update profile API call
const updateProfileService = async (user, token) => {
  const { data } = await Axios.put("/user", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};
// Delete profile API call
const deleteProfileService = async (token) => {
  const { data } = await Axios.delete("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.removeItem("userInfo");
  }
  return data;
};
//Change password API call
const changePasswordService = async (passwords, token) => {
  const { data } = await Axios.put("/user/password", passwords, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
//get all favorite movies
const getFavoriteMovies = async (token) => {
  const { data } = await Axios.get("/user/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
//Delete all fovirte movies
const deleteFavoriteMovies = async (token) => {
  const { data } = await Axios.delete("/user/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
//like movie API call
const likeMovieService = async (movieId, token) => {
  const { data } = Axios.post(`/user/favorites`, movieId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//******************ADMIN API********** */
//Admin get all users
const getAllUsersService = async (token) => {
  const { data } = await Axios.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
//admin delte user
const deleteUserService = async (id, token) => {
  const { data } = await Axios.delete(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export {
  loginService,
  logoutService,
  registerService,
  updateProfileService,
  deleteProfileService,
  changePasswordService,
  getFavoriteMovies,
  deleteFavoriteMovies,
  getAllUsersService,
  deleteUserService,
  likeMovieService,
};
