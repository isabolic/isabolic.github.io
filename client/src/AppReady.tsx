import { PropsWithChildren, useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";
import { AppState, startAppInit } from "./store/app";
import { LoadingScreen } from "./components/LoadingScreen";

export const AppReady = ({ children }: PropsWithChildren<unknown>) => {
  const dispatch = useAppDispatch();

  const state = useAppSelector((x) => x.app.appState);

  useEffect(() => {
    dispatch(startAppInit());
  }, [dispatch]);

  return <>{state === AppState.READY ? children : <LoadingScreen />}</>;
};
