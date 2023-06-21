import "./App.css";
import router from "./routes/routing";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
