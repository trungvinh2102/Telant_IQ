import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { ThemeProvider } from "./components/theme-provider";
import App from "./App";
import "./index.css";
import "./lib/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider
        defaultTheme="light"
        attribute="class"
        enableSystem
        disableTransitionOnChange
      >
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
