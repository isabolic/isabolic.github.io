import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum AppState {
  UNKNOWN,
  INIT,
  READY,
  ERROR,
}

export interface UiState {
  appState: AppState;
  appError?: string;
}

const initialState: UiState = {
  appState: AppState.INIT,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    startAppInit: (state) => {
      state.appState = AppState.INIT;
    },
    finishAppInit: (state) => {
      // if the startup encountered an error, do nothing
      if (state.appState === AppState.ERROR) return;

      // otherwise we are ready to go
      state.appState = AppState.READY;
    },
    appError: (state, action: PayloadAction<string>) => {
      state.appState = AppState.ERROR;
      state.appError = action.payload;
    },
  },
});

export const { startAppInit, finishAppInit, appError } = appSlice.actions;
