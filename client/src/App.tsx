import { AppRoutes } from "./navigation/AppRoutes";
import { AppReady } from "./AppReady";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faLinkedin,
  faStrava,
} from "@fortawesome/free-brands-svg-icons";
import { faBars, faCircleNotch, faCode, faEnvelope, faPhone, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import "./theme/tailwind.css";
import "./theme/common.css";
import "animate.css";
import { BodyTag } from "./components";

library.add(faBars, faCircleNotch, faCode, faEnvelope, faPhone, faCircleDot, faGithub, faLinkedin, faStrava);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppReady>
          <BodyTag>
            <AppRoutes />
          </BodyTag>
        </AppReady>
      </Provider>
    </div>
  );
}

export default App;
