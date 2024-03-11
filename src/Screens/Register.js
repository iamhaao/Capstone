import React, { useCallback, useEffect, useState } from "react";
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
import { LuEye, LuEyeOff } from "react-icons/lu";

import toast from "react-hot-toast";
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userLogin
  );
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
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

  const handleShowPass = (field) => {
    if (field === "password") {
      setIsShowPass(!isShowPass);
    }
    if (field === "confirmPassword") {
      setIsShowConfirm(!isShowConfirm);
    }
  };

  console.log(errors.password);
  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full 2xl:w-2/5 gap-6 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border"
        >
          <div>
            <img
              src="/images/logo1.png"
              alt="logo"
              className="w-full h-12 object-contain "
            />
            <div className="text-3xl font-bold">Create your account</div>
          </div>

          <div className="w-full">
            <Input
              label="Email Address"
              type="text"
              name="email"
              register={register("email")}
            />
            {errors.email && <InlineError text={errors.email.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Full Name"
              type="text"
              name="name"
              register={register("name")}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="flex w-full gap-3">
            <div className="w-full">
              <Input
                label="Phone Number"
                type="text"
                name="phone"
                register={register("phone")}
              />
              {errors.phone && <InlineError text={errors.phone.message} />}
            </div>
            <div className="w-full">
              <Input
                label="Birth Day"
                type="date"
                name="dob"
                register={register("dob")}
              />
              {errors.dob && <InlineError text={errors.dob.message} />}
            </div>
          </div>

          <div className="w-full">
            <Input
              label="Password"
              type={isShowPass ? "text" : "password"}
              name="password"
              register={register("password")}
              suffix={
                <span onClick={() => handleShowPass("password")}>
                  {isShowPass ? (
                    <LuEyeOff className="w-4 h-4" />
                  ) : (
                    <LuEye className="w-4 h-4" />
                  )}
                </span>
              }
            />
            {errors.password && <InlineError text={errors.password.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Confirm Password"
              type={isShowConfirm ? "text" : "password"}
              name="confirmPassword"
              register={register("confirmPassword")}
              suffix={
                <span onClick={() => handleShowPass("confirmPassword")}>
                  {isShowConfirm ? (
                    <LuEyeOff className="w-4 h-4" />
                  ) : (
                    <LuEye className="w-4 h-4" />
                  )}
                </span>
              }
            />
            {errors.confirmPassword && (
              <InlineError text={errors.confirmPassword.message} />
            )}
          </div>
          <div className="w-full flex-rows gap-1 items-center ">
            <input name="term" type="checkbox" {...register("term")} />
            <p className={`text-sm ${errors?.term && "text-red-600"}`}>
              By creating an account, I agree to the terms and conditions.
            </p>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-3 rounded-lg w-full"
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
