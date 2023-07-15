import { CheckListActionTypes } from "./CheckList.type";

/**
 * Fetch One CheckList
 *
 * @param payload
 */
export const fetchOneCheckList = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ONE_CHECK_LIST,
  payload: payload,
});

/**
 * Reset Fetch One CheckList State
 *
 * @param payload
 */
export const fetchOneCheckListReset = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ONE_CHECK_LIST_RESET,
  payload: payload,
});

/**
 * Fetch CheckList
 *
 * @param payload
 */
export const fetchAllStructuralCheckList = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST,
  payload: payload,
});

/**
 * Reset Fetch CheckList State
 *
 * @param payload
 */
export const fetchAllStructuralCheckListReset = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST_RESET,
  payload: payload,
});

/**
 * Fetch CheckList
 *
 * @param payload
 */
export const fetchAllArchitectureCheckList = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST,
  payload: payload,
});

/**
 * Reset Fetch CheckList State
 *
 * @param payload
 */
export const fetchAllArchitectureCheckListReset = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST_RESET,
  payload: payload,
});

/**
 * Fetch CheckList
 *
 * @param payload
 */
export const fetchAllPlumbingCheckList = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST,
  payload: payload,
});

/**
 * Reset Fetch CheckList State
 *
 * @param payload
 */
export const fetchAllPlumbingCheckListReset = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST_RESET,
  payload: payload,
});

/**
 * Fetch CheckList
 *
 * @param payload
 */
export const fetchAllMechanicalCheckList = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST,
  payload: payload,
});

/**
 * Reset Fetch CheckList State
 *
 * @param payload
 */
export const fetchAllMechanicalCheckListReset = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST_RESET,
  payload: payload,
});

/**
 * Fetch CheckList
 *
 * @param payload
 */
export const fetchAllElectricalCheckList = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST,
  payload: payload,
});

/**
 * Reset Fetch CheckList State
 *
 * @param payload
 */
export const fetchAllElectricalCheckListReset = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST_RESET,
  payload: payload,
});

/**
 * Fetch CheckList
 *
 * @param payload
 */
export const fetchAllFireFightingCheckList = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST,
  payload: payload,
});

/**
 * Reset Fetch CheckList State
 *
 * @param payload
 */
export const fetchAllFireFightingCheckListReset = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_RESET,
  payload: payload,
});

/**
 * Fetch CheckList
 *
 * @param payload
 */
export const fetchAllSpecialSystemCheckList = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST,
  payload: payload,
});

/**
 * Reset Fetch CheckList State
 *
 * @param payload
 */
export const fetchAllSpecialSystemCheckListReset = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_RESET,
  payload: payload,
});

/**
 * Fetch CheckList
 *
 * @param payload
 */
export const fetchAllSanitaryCheckList = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_SANITARY_CHECK_LIST,
  payload: payload,
});

/**
 * Reset Fetch CheckList State
 *
 * @param payload
 */
export const fetchAllSanitaryCheckListReset = (payload?: any) => ({
  type: CheckListActionTypes.FETCH_ALL_SANITARY_CHECK_LIST_RESET,
  payload: payload,
});
