import { put } from "redux-saga/effects";
import { finishAppInit } from "../store/app";

export const rootSaga = function* () {
  yield new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  yield put(finishAppInit());
};
