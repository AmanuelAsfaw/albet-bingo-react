import { ServiceActionTypes } from "./Service.type";

/**
 * Fetch All Services
 *
 * @param payload
 */
export const fetchAllServices = (payload?: any) => ({
  type: ServiceActionTypes.FETCH_ALL_SERVICE,
  payload: payload,
});

/**
 * Reset Fetch Services State
 *
 * @param payload
 */
export const fetchAllServicesReset = (payload?: any) => ({
  type: ServiceActionTypes.FETCH_ALL_SERVICE_RESET,
  payload: payload,
});
