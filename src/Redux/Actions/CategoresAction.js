import * as CategoriesConstants from "../Constants/CategoriesConstants";
import * as categoriesAPIs from "../APIs/CategoriesService";
import toast from "react-hot-toast";
import { tokenProtection, ErrorsAction } from "../Protection";

//Get all Categories action
export const getAllCategoriesAction = () => async (dispacth) => {
  try {
    dispacth({ type: CategoriesConstants.GET_ALL_CATEGORIES_REQUEST });
    const data = await categoriesAPIs.getCategoriesService();
    dispacth({
      type: CategoriesConstants.GET_ALL_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    ErrorsAction(error, dispacth, CategoriesConstants.GET_ALL_CATEGORIES_FAIL);
  }
};
//Create Category action

export const createCategoryAction = (title) => async (dispacth, getState) => {
  try {
    dispacth({ type: CategoriesConstants.CREATE_CATEGORIES_REQUEST });
    await categoriesAPIs.createCategoryService(
      title,
      tokenProtection(getState)
    );
    dispacth({ type: CategoriesConstants.CREATE_CATEGORIES_SUCCESS });
    toast.success("Category created successfully");
    dispacth(getAllCategoriesAction());
  } catch (error) {
    ErrorsAction(error, dispacth, CategoriesConstants.CREATE_CATEGORIES_FAIL);
  }
};

//Update Catetory action
export const updateCategoryAction =
  (id, title) => async (dispacth, getState) => {
    try {
      dispacth({ type: CategoriesConstants.UPDATE_CATEGORIES_REQUEST });
      await categoriesAPIs.updateCategoryService(
        id,
        title,
        tokenProtection(getState)
      );
      dispacth({ type: CategoriesConstants.UPDATE_CATEGORIES_SUCCESS });
      toast.success("Category updated successfully");
      dispacth(getAllCategoriesAction());
    } catch (error) {
      ErrorsAction(error, dispacth, CategoriesConstants.UPDATE_CATEGORIES_FAIL);
    }
  };

//Delete Category Action

export const deleteCategoryAction = (id) => async (dispacth, getState) => {
  try {
    dispacth({ type: CategoriesConstants.DELETE_CATEGORIES_REQUEST });
    await categoriesAPIs.deleteCategoryService(id, tokenProtection(getState));
    dispacth({ type: CategoriesConstants.DELETE_CATEGORIES_SUCCESS });
    toast.success("Category deleted successfully");
    dispacth(getAllCategoriesAction());
  } catch (error) {
    ErrorsAction(error, dispacth, CategoriesConstants.DELETE_CATEGORIES_FAIL);
  }
};
