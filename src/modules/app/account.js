import { createAction, createReducer } from "@reduxjs/toolkit";
import FetchStatus from "../../consts/FetchStatus";

const initialState = {
  /**@type {string} */
  fetchStatus: FetchStatus.Pending,
  /**@type {string} */
  name: "",
  /**@@type {string} */
  password: "",
  /**@type {*} */
  info: {}
};

export const accountGetter = {
  /**@return {string} */
  fetchStatus: (state) => state.app.account.fetchStatus,
  /**@return {string} */
  name: (state) => state.app.account.name,
  /**@return {string} */
  password: (state) => state.app.account.password,
  /**@return {{courseIds:string[]}} */
  info: (state) => state.app.account.info
};

export const accountAction = {
  setName: createAction("app/account/setName", (name) => ({ payload: name })),
  setPassword: createAction("app/account/setPassword", (password) => ({
    payload: password
  })),
  setFetchStatus: createAction("app/account/setFetchStatus", (fetchStatus) => ({
    payload: fetchStatus
  })),
  setInfo: createAction("app/account/setInfo", (info) => ({ payload: info }))
};

export const accountReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(accountAction.setName, (state, action) => {
      state.name = action.payload;
    })
    .addCase(accountAction.setPassword, (state, action) => {
      state.password = action.payload;
    })
    .addCase(accountAction.setFetchStatus, (state, action) => {
      state.fetchStatus = action.payload;
    })
    .addCase(accountAction.setInfo, (state, action) => {
      state.info = action.payload;
    })
);
