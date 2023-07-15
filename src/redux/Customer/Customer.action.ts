import { CustomerActionTypes } from "./Customer.type";

/**
 * Fetch All Customers
 *
 * @param payload
 */
export const fetchAllCustomers = (payload?: any) => ({
  type: CustomerActionTypes.FETCH_ALL_CUSTOMER,
  payload: payload,
});

/**
 * Reset Fetch Customers State
 *
 * @param payload
 */
export const fetchAllCustomersReset = (payload?: any) => ({
  type: CustomerActionTypes.FETCH_ALL_CUSTOMER_RESET,
  payload: payload,
});
