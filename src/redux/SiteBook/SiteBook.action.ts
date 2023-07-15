import { SiteBookActionTypes } from "./SiteBook.type";

/**
 * Fetch All SiteBook
 *
 * @param payload
 */
export const fetchAllSiteBook = (payload?: any) => ({
  type: SiteBookActionTypes.FETCH_ALL_SITE_BOOK,
  payload: payload,
});

/**
 * Fetch All SiteBook
 *
 * @param payload
 */
export const fetchOneSiteBook = (payload?: any) => ({
  type: SiteBookActionTypes.FETCH_ONE_SITE_BOOK,
  payload: payload,
});

/**
 * Reset Fetch SiteBook State
 *
 * @param payload
 */
export const fetchAllSiteBookReset = (payload?: any) => ({
  type: SiteBookActionTypes.FETCH_ALL_SITE_BOOK_RESET,
  payload: payload,
});
