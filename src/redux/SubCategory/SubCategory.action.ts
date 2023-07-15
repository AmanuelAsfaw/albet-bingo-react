import { SubCategoryActionTypes } from "./SubCategory.type";

/**
 * Fetch All SubCategory
 *
 * @param payload
 */
export const fetchAllSubCategory = (payload?: any) => ({
  type: SubCategoryActionTypes.FETCH_ALL_SUB_CATEGORY,
  payload: payload,
});

/**
 * Fetch Paged SubCategory
 *
 * @param payload
 */
export const fetchPagedSubCategory = (payload?: any) => ({
  type: SubCategoryActionTypes.FETCH_PAGED_SUB_CATEGORY,
  payload: payload,
});

/**
 * Fetch All SubCategory
 *
 * @param payload
 */
export const fetchOneSubCategory = (payload?: any) => ({
  type: SubCategoryActionTypes.FETCH_ONE_SUB_CATEGORY,
  payload: payload,
});

/**
 * Reset Fetch SubCategory State
 *
 * @param payload
 */
export const fetchAllSubCategoryReset = (payload?: any) => ({
  type: SubCategoryActionTypes.FETCH_ALL_SUB_CATEGORY_RESET,
  payload: payload,
});
