import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainerConfig } from "./utils/toast";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer {...ToastContainerConfig} />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
