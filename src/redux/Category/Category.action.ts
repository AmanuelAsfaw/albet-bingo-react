import { CategoryActionTypes } from "./Category.type";

/**
 * Fetch All Category
 *
 * @param payload
 */
export const fetchAllCategory = (payload?: any) => ({
  type: CategoryActionTypes.FETCH_ALL_CATEGORY,
  payload: payload,
});

/**
 * Fetch Paged Category
 *
 * @param payload
 */
export const fetchPagedCategory = (payload?: any) => ({
  type: CategoryActionTypes.FETCH_PAGED_CATEGORY,
  payload: payload,
});

/**
 * Fetch All Category
 *
 * @param payload
 */
export const fetchOneCategory = (payload?: any) => ({
  type: CategoryActionTypes.FETCH_ONE_CATEGORY,
  payload: payload,
});

/**
 * Reset Fetch Category State
 *
 * @param payload
 */
export const fetchAllCategoryReset = (payload?: any) => ({
  type: CategoryActionTypes.FETCH_ALL_CATEGORY_RESET,
  payload: payload,
});
