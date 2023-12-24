import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Input } from "../Components/UsedInput";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RegisterValidation } from "../Components/Validation/UserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../Components/Notifications/Error";
import { registerAction } from "../../src/Redux/Actions/userActions";
import toast from "react-hot-toast";
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userLogin
  );
  //validate user
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterValidation),
  });
  //on submit
  const onSubmit = (data) => {
    dispatch(registerAction(data));
  };
  //useEffect
  useEffect(() => {
    if (userInfo?.isAdmin) {
      navigate("/dashboard");
    } else if (userInfo) {
      navigate("/");
    }
    if (isSuccess) {
      toast.success(`Welcome ${userInfo.name}`);
      dispatch({ type: "User_REGISTER_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "User_REGISTER_RESET" });
    }
  }, [userInfo, isSuccess, isError, navigate, dispatch]);
  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border"
        >
          <img
            src="/images/logo1.png"
            alt="logo"
            className="w-full h-12 object-contain "
          />
          <div className="w-full">
            <Input
              label="Email"
              placeholder="Monterhub@gmail.com"
              type="email"
              name="email"
              register={register("email")}
              bg={true}
            />
            {errors.email && <InlineError text={errors.email.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Full Name"
              placeholder="Enter your name"
              type="text"
              name="name"
              register={register("name")}
              bg={true}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              name="password"
              register={register("password")}
              bg={true}
            />
            {errors.password && <InlineError text={errors.password.message} />}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            {
              //if loading show loading
              isLoading ? (
                "Loading..."
              ) : (
                <>
                  <FiLogIn />
                  Sign Up
                </>
              )
            }
          </button>
          <p className="text-center text-border">
            Already have an account?
            <Link to="/login" className="text-dryGray font-semibold ml-2">
              Sign In
            </Link>{" "}
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
