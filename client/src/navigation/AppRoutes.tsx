import { BrowserRouter, Route, Routes } from "react-router-dom";
import { navigationList } from "./navigation";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {navigationList.map((item) => (
          <Route
            key={item.name}
            path={item.path}
            element={<item.component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
