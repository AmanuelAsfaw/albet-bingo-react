import { CartelaActionTypes } from "./TodayBill.type";

/**
 * Fetch All Cartela
 *
 * @param payload
 */
export const fetchAllCartela = (payload?: any) => ({
  type: CartelaActionTypes.FETCH_ALL_CARTELA,
  payload: payload,
});

/**
 * Fetch All Cartela
 *
 * @param payload
 */
export const fetchOneCartela = (payload?: any) => ({
  type: CartelaActionTypes.FETCH_ONE_CARTELA,
  payload: payload,
});

/**
 * Reset Fetch Cartela State
 *
 * @param payload
 */
export const fetchAllCartelaReset = (payload?: any) => ({
  type: CartelaActionTypes.FETCH_ALL_CARTELA_RESET,
  payload: payload,
});
