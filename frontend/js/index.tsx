import "@fontsource/eb-garamond/500.css";
import "@fontsource/open-sans/400.css";
import ReactDOM from "react-dom/client";
import "vite/modulepreload-polyfill";

import App from "@lib/components/App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
