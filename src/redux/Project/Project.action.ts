import { ProjectActionTypes } from "./Project.type";

/**
 * Fetch All Projects
 *
 * @param payload
 */
export const fetchAllProjects = (payload?: any) => ({
	type: ProjectActionTypes.FETCH_ALL_PROJECT,
	payload: payload,
});

export const fetchAllListProjects = (payload?: any) => ({
	type: ProjectActionTypes.FETCH_ALL_PROJECT_LIST,
	payload: payload,
});

/**
 * Fetch One Projects
 *
 * @param payload
 */
export const fetchOneProjects = (payload?: any) => ({
	type: ProjectActionTypes.FETCH_ONE_PROJECT,
	payload: payload,
});
/**
 * Reset Fetch Projects State
 *
 * @param payload
 */
export const fetchAllProjectsReset = (payload?: any) => ({
	type: ProjectActionTypes.FETCH_ALL_PROJECT_RESET,
	payload: payload,
});

/**
 * Reset Fetch Projects State
 *
 * @param payload
 */
export const fetchProjectsReset = (payload?: any) => ({
	type: ProjectActionTypes.FETCH_ONE_PROJECT_RESET,
	payload: payload,
});

/**
 * Fetch All Projects
 *
 * @param payload
 */
export const fetchAllPreProjects = (payload?: any) => ({
	type: ProjectActionTypes.FETCH_ALL_PRE_PROJECT,
	payload: payload,
});

/**
 * Fetch One Projects
 *
 * @param payload
 */
export const fetchOnePreProjects = (payload?: any) => ({
	type: ProjectActionTypes.FETCH_ONE_PRE_PROJECT,
	payload: payload,
});
