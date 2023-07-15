import { EmployerRequirementActionTypes } from "./EmployerRequirement.type";

/**
 * Fetch All EmployerRequirement
 *
 * @param payload
 */
export const fetchAllEmployerRequirements = (payload?: any) => ({
  type: EmployerRequirementActionTypes.FETCH_ALL_EMPLOYER_REQUIREMENT,
  payload: payload,
});

/**
 * Fetch All EmployerRequirement
 *
 * @param payload
 */
export const fetchOneEmployerRequirement = (payload?: any) => ({
  type: EmployerRequirementActionTypes.FETCH_ONE_EMPLOYER_REQUIREMENT,
  payload: payload,
});

/**
 * Reset Fetch EmployerRequirement State
 *
 * @param payload
 */
export const fetchAllEmployerRequirementsReset = (payload?: any) => ({
  type: EmployerRequirementActionTypes.FETCH_ALL_EMPLOYER_REQUIREMENT_RESET,
  payload: payload,
});
