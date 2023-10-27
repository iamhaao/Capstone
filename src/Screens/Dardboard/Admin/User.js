import React, { useEffect } from "react";
import SideBar from "../SideBar";
import Table2 from "../../../Components/Table2";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  deleteUserAction,
  getAllUsersAction,
} from "../../../Redux/Actions/userActions";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";

function Users() {
  const dispatch = useDispatch();
  const { isLoading, isError, users } = useSelector(
    (state) => state.adminGetAllUser
  );
  //Delete
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.adminDeleteUser);
  //delete user handler
  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure want to delete this user?")) {
      dispatch(deleteUserAction(id));
    }
  };
  //useEffect
  useEffect(() => {
    dispatch(getAllUsersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USERS_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Users</h2>

        {isLoading ? (
          <Loader />
        ) : users?.length > 0 ? (
          <Table2
            data={users}
            users={true}
            ondeleteFunction={deleteUserHandler}
          />
        ) : (
          <Empty message="No Users" />
        )}
      </div>
    </SideBar>
  );
}

export default Users;
