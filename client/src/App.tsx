import { AppRoutes } from "./navigation/AppRoutes";
import { AppReady } from "./AppReady";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./theme/tailwind.css";
import "./theme/common.css";
import "animate.css";

library.add(far, fas);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppReady>
          <AppRoutes />
        </AppReady>
      </Provider>
    </div>
  );
}

export default App;
