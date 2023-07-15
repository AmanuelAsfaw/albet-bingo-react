export type ApiCallState<T> = {
  error: any;
  payload: T;
  isPending: boolean;
  isSuccessful: boolean;
};

export const resetApiCallState = (payload: any) => ({
  error: null,
  payload: payload,
  isPending: false,
  isSuccessful: false,
});

export type PagedData<T> = {
  page_size: number;
  rows: T;
  count: number;
  current_page: number;
};

export const InitPagedData = {
  count: 0,
  current_page: 0,
  page_size: 0,
  rows: [],
};

export const formatQuery = (action: any) => {
  let query = "";
  if (action.payload) {
    const keys = Object.keys(action.payload);
    query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
  }
  return query;
};
