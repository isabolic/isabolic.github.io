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
import { OscillatorComponent } from "./components/Oscillator";
import { BodyTag } from "./components";

library.add(far, fas);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppReady>
          <BodyTag>
            <OscillatorComponent />
            <AppRoutes />
          </BodyTag>
        </AppReady>
      </Provider>
    </div>
  );
}

export default App;
