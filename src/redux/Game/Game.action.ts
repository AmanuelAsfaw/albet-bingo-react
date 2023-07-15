import { GameActionTypes } from "./Game.type";

/**
 * Fetch All Games
 *
 * @param payload
 */
export const fetchAllGames = (payload?: any) => ({
	type: GameActionTypes.FETCH_ALL_GAME,
	payload: payload,
});

export const fetchAllListGames = (payload?: any) => ({
	type: GameActionTypes.FETCH_ALL_GAME_LIST,
	payload: payload,
});

/**
 * Fetch One Games
 *
 * @param payload
 */
export const fetchOneGames = (payload?: any) => ({
	type: GameActionTypes.FETCH_ONE_GAME,
	payload: payload,
});
/**
 * Reset Fetch Games State
 *
 * @param payload
 */
export const fetchAllGamesReset = (payload?: any) => ({
	type: GameActionTypes.FETCH_ALL_GAME_RESET,
	payload: payload,
});

/**
 * Reset Fetch Games State
 *
 * @param payload
 */
export const fetchGamesReset = (payload?: any) => ({
	type: GameActionTypes.FETCH_ONE_GAME_RESET,
	payload: payload,
});

/**
 * Fetch All Games
 *
 * @param payload
 */
export const fetchAllPreGames = (payload?: any) => ({
	type: GameActionTypes.FETCH_ALL_PRE_GAME,
	payload: payload,
});

/**
 * Fetch One Games
 *
 * @param payload
 */
export const fetchOnePreGames = (payload?: any) => ({
	type: GameActionTypes.FETCH_ONE_PRE_GAME,
	payload: payload,
});
