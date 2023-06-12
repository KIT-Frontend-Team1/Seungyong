import logo from "./logo.svg";
import "./App.css";
import { Mobile, PAD, PC } from "./components/Responsive";

function App() {
  return (
    <div className="App">
      <Mobile>모바일</Mobile>
      <PAD>패드화면</PAD>
      <PC>PC화면</PC>
    </div>
  );
}

export default App;
