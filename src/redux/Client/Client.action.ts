import { ClientActionTypes } from "./Client.type";

/**
 * Fetch All Clients
 *
 * @param payload
 */
export const fetchAllClients = (payload?: any) => ({
  type: ClientActionTypes.FETCH_ALL_CLIENT,
  payload: payload,
});

/**
 * Reset Fetch Clients State
 *
 * @param payload
 */
export const fetchAllClientsReset = (payload?: any) => ({
  type: ClientActionTypes.FETCH_ALL_CLIENT_RESET,
  payload: payload,
});
