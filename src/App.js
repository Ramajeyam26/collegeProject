import "./App.css";
import Home from "./components/Home";
import { BrowserRouter  } from "react-router-dom"; 

function App() {
  return (
    <div className=" overflow-y-hidden overflow-x-hidden">
    <BrowserRouter >
      <Home />
      </BrowserRouter>
      </div>
  ) ;
}

export default App;
